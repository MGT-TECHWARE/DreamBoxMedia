#!/usr/bin/env node
/**
 * Upload video assets to Cloudflare R2 using the S3-compatible API.
 *
 * Required env vars:
 *   R2_ACCESS_KEY_ID     - from Cloudflare R2 → Manage R2 API Tokens
 *   R2_SECRET_ACCESS_KEY - from the same token
 *
 * Optional:
 *   R2_ENDPOINT         - default: https://ad78d21bbc65eac9f459d397ff3cfba2.r2.cloudflarestorage.com
 *   R2_BUCKET           - default: dreambox-media-assets
 */
import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { createReadStream, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const BUCKET = process.env.R2_BUCKET || 'dreambox-media-assets';
const ENDPOINT = process.env.R2_ENDPOINT || 'https://ad78d21bbc65eac9f459d397ff3cfba2.r2.cloudflarestorage.com';

const VIDEOS = [
  { file: 'drone-loop.mp4', contentType: 'video/mp4' },
  { file: 'commercials-bg.mov', contentType: 'video/quicktime' },
  { file: 'videography-bg.mov', contentType: 'video/quicktime' },
  { file: 'documentary-bg.mov', contentType: 'video/quicktime' },
  { file: 'brand-video-bg.mp4', contentType: 'video/mp4' },
  { file: 'hype-recap-bg.mp4', contentType: 'video/mp4' },
  { file: 'corporate-events-bg.mov', contentType: 'video/quicktime' },
  { file: 'cinematography-bg.mov', contentType: 'video/quicktime' },
];

const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  console.error('Missing credentials. Set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.');
  console.error('Create a token at: Cloudflare Dashboard → R2 → Manage R2 API Tokens');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: ENDPOINT,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

async function uploadOne({ file, contentType }) {
  const filePath = path.join(publicDir, file);
  try {
    readFileSync(filePath);
  } catch (e) {
    console.log(`Skip ${file} (not found in public/)`);
    return;
  }
  const body = createReadStream(filePath);
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: file,
      Body: body,
      ContentType: contentType,
    })
  );
  console.log(`Uploaded ${file}`);
}

async function main() {
  try {
    await client.send(new HeadBucketCommand({ Bucket: BUCKET }));
  } catch (e) {
    if (e.name === 'NotFound' || e.$metadata?.httpStatusCode === 404) {
      console.error(`Bucket "${BUCKET}" not found. Create it in Cloudflare Dashboard → R2 first.`);
      process.exit(1);
    }
    throw e;
  }
  for (const v of VIDEOS) {
    await uploadOne(v);
  }
  console.log('Done. Enable public access (r2.dev) for the bucket if you haven’t, then run: npm run r2-cors');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
