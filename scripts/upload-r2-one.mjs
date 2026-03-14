#!/usr/bin/env node
/**
 * Upload a single file to Cloudflare R2 (S3 API).
 * Usage: node scripts/upload-r2-one.mjs <filename>
 * Example: node scripts/upload-r2-one.mjs commercials-bg.mov
 *
 * Required env: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 * Optional: R2_ENDPOINT, R2_BUCKET
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

const CONTENT_TYPES = {
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
};

const file = process.argv[2] || 'commercials-bg.mov';
const filePath = path.join(publicDir, file);

if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  console.error('Set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY');
  process.exit(1);
}

try {
  readFileSync(filePath);
} catch (e) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const ext = path.extname(file).toLowerCase();
const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

const client = new S3Client({
  region: 'auto',
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

async function main() {
  await client.send(new HeadBucketCommand({ Bucket: BUCKET }));
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: file,
      Body: createReadStream(filePath),
      ContentType: contentType,
    })
  );
  console.log(`Uploaded ${file} to R2. It will be available at your bucket's public URL.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
