#!/usr/bin/env node
/**
 * Writes public/config.json with video URLs from env (VITE_* or .env.production).
 * Run before vite build so the deployed site has config.json for runtime video URLs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Load .env.production so local builds get URLs from that file
try {
  const envPath = path.join(root, '.env.production');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^VITE_(.+?)=(.+)$/);
      if (m) {
        let v = m[2].trim().replace(/^["']|["']$/g, '').replace(/['"]/g, '');
        if (v.includes('./')) v = v.replace("'./", '/').replace('"./', '/');
        process.env[`VITE_${m[1]}`] = v;
      }
    }
  }
} catch (_) {}

const sanitize = (u) => (u || '').replace(/['"]/g, '').replace(/\.\//g, '/').trim() || null;
const videoUrls = {
  droneLoop: sanitize(process.env.VITE_DRONE_LOOP_VIDEO_URL) || '/drone-loop.mp4',
  commercials: sanitize(process.env.VITE_COMMERCIALS_VIDEO_URL) || '/commercials-bg.mov',
  videography: sanitize(process.env.VITE_VIDEOGRAPHY_VIDEO_URL) || '/videography-bg.mov',
  strategicVideoMarketing: sanitize(process.env.VITE_STRATEGIC_VIDEO_MARKETING_VIDEO_URL) || '/strategic-video-marketing-bg.mov',
  documentary: sanitize(process.env.VITE_DOCUMENTARY_VIDEO_URL) || '/documentary-bg.mov',
  brandVideo: sanitize(process.env.VITE_BRAND_VIDEO_VIDEO_URL) || '/brand-video-bg.mp4',
  hypeRecap: sanitize(process.env.VITE_HYPE_RECAP_VIDEO_URL) || '/hype-recap-bg.mp4',
  corporateEvents: sanitize(process.env.VITE_CORPORATE_EVENTS_VIDEO_URL) || '/corporate-events-bg.mov',
  cinematography: sanitize(process.env.VITE_CINEMATOGRAPHY_VIDEO_URL) || '/cinematography-bg.mov',
};

const publicDir = path.join(root, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'config.json'), JSON.stringify({ videoUrls }, null, 2), 'utf8');
console.log('Wrote public/config.json with video URLs from env.');
