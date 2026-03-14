#!/usr/bin/env node
/**
 * 1. Create R2 bucket, upload large videos, enable public dev URL
 * 2. Get public base URL, write .env.production with VITE_* video URLs
 * 3. Run deploy (build + strip large files + pages deploy)
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const BUCKET = 'dreambox-media-assets';
const VIDEOS = [
  { file: 'drone-loop.mp4', env: 'VITE_DRONE_LOOP_VIDEO_URL' },
  { file: 'commercials-high-end-bg.mov', env: 'VITE_COMMERCIALS_VIDEO_URL' },
  { file: 'videography-bg.mov', env: 'VITE_VIDEOGRAPHY_VIDEO_URL' },
  { file: 'documentary-bg.mov', env: 'VITE_DOCUMENTARY_VIDEO_URL' },
  { file: 'brand-video-bg.mp4', env: 'VITE_BRAND_VIDEO_VIDEO_URL' },
  { file: 'hype-recap-bg.mp4', env: 'VITE_HYPE_RECAP_VIDEO_URL' },
  { file: 'corporate-events-bg.mov', env: 'VITE_CORPORATE_EVENTS_VIDEO_URL' },
  { file: 'cinematography-bg.mov', env: 'VITE_CINEMATOGRAPHY_VIDEO_URL' },
];

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: root, stdio: opts.silent ? 'pipe' : 'inherit', ...opts });
}

function runOut(cmd) {
  return run(cmd, { silent: true }).toString().trim();
}

console.log('Creating R2 bucket...');
try {
  run(`npx wrangler r2 bucket create ${BUCKET}`);
} catch (e) {
  const msg = String(e.stderr || e.stdout || e.message || '');
  if (/enable R2 through the Cloudflare Dashboard|10042/i.test(msg)) {
    console.error('\n❌ R2 is not enabled on your Cloudflare account.');
    console.error('   Enable it here: https://dash.cloudflare.com/?to=/:account/r2/overview');
    console.error('   Then run: npm run setup-r2-and-deploy\n');
    process.exit(1);
  }
  if (!/already exists|AlreadyExists/i.test(msg)) throw e;
  console.log('Bucket already exists, continuing.');
}

const contentType = (f) => (f.endsWith('.mp4') ? 'video/mp4' : f.endsWith('.mov') ? 'video/quicktime' : 'video/mp4');
for (const { file } of VIDEOS) {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} (not in public/)`);
    continue;
  }
  console.log(`Uploading ${file}...`);
  run(`npx wrangler r2 object put ${BUCKET}/${file} --file "${filePath}" --content-type "${contentType(file)}"`);
}

console.log('Setting R2 CORS (allow Pages to load videos)...');
const corsPath = path.join(__dirname, 'r2-cors.json');
run(`npx wrangler r2 bucket cors set ${BUCKET} --file "${corsPath}"`);

console.log('Enabling public r2.dev URL...');
try {
  run(`npx wrangler r2 bucket dev-url enable ${BUCKET} --force`);
} catch (e) {
  if (!/already enabled|already allowed/i.test(String(e.stderr || e.message))) throw e;
}

const urlOut = runOut(`npx wrangler r2 bucket dev-url get ${BUCKET}`);
let baseUrl = urlOut.match(/https:\/\/[^\s"')\]\}\n]+/)?.[0]?.replace(/\/?$/, '').replace(/['"]/g, '');
if (!baseUrl) {
  try {
    const j = JSON.parse(urlOut);
    baseUrl = j.url || j.public_url || j.dev_url;
  } catch (_) {}
  if (!baseUrl) baseUrl = urlOut.split(/\s+/).find(s => s.startsWith('https://'));
}
if (!baseUrl) {
  console.error('Could not get R2 public URL. Output:', urlOut);
  process.exit(1);
}
baseUrl = baseUrl.replace(/\/$/, '');
console.log('R2 public base URL:', baseUrl);

const envLines = VIDEOS.map(({ file, env }) => `${env}=${baseUrl}/${file}`).join('\n');
const envPath = path.join(root, '.env.production');
fs.writeFileSync(envPath, envLines + '\n', 'utf8');
console.log('Wrote .env.production with video URLs.');

console.log('Deploying to Cloudflare Pages...');
run('npm run deploy');

console.log('Done. Your site is live with all video URLs pointing to R2.');
