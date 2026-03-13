<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/55276bc9-583c-4252-92bc-7bf2f8418e64

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Cloudflare Pages

**Option A – Deploy with Wrangler (CLI)**

1. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
2. Log in to Cloudflare (opens browser):
   ```bash
   npx wrangler login
   ```
3. Create the Pages project (first time only):
   ```bash
   npx wrangler pages project create dreambox-media
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
   Or manually: `npx wrangler pages deploy dist --project-name=dreambox-media`

Your site will be live at `https://dreambox-media.pages.dev` (or a custom domain you add in the Cloudflare dashboard).

**Option B – Deploy with Git (GitHub/GitLab)**

1. Push your code to GitHub or GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your repo and set:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Save and deploy. Cloudflare will build and deploy on every push.

# DreamBoxMedia
