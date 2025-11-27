# New Culture Trends

A modern React website built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- React 18 + Vite
- TypeScript
- TailwindCSS
- Firebase (Auth, Firestore, Storage, Hosting)
- React Router

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Copy `.env.example` to `.env` and fill in Firebase credentials (optional if you use the default project baked into `src/firebase/config.ts`).

## Application Structure

- `/` – marketing site with hero, Firestore-powered voting grid, poll widget, and newsletter form
- `/admin` – protected dashboard (email/password Firebase Auth) featuring:
  - **Library Manager** – upload images to Storage, create/edit/delete `items`
  - **Poll Manager** – configure “What should we release next?” poll
  - **Newsletter Manager** – view & export subscribers

Use the `VITE_ADMIN_EMAILS` env variable to list allowed admin addresses (comma separated).

## GitHub Pages Deployment with Custom Domain

This project is configured to deploy to GitHub Pages with the custom domain `newculturetrends.com`.

### Initial Setup Steps:

1. **Push your code to GitHub:**
   - Create a new repository on GitHub
   - Push this code to the `main` branch

2. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions" (not "Deploy from a branch")
   - The GitHub Actions workflow will automatically deploy on every push to `main`

3. **Configure your custom domain:**
   - In your repository Settings → Pages, under "Custom domain", enter: `newculturetrends.com`
   - Check "Enforce HTTPS" (this will be available after DNS is configured)

4. **Configure DNS:**
   - Go to your domain registrar (where you bought newculturetrends.com)
   - Add the following DNS records:
     - **Type:** A
       - **Name:** @ (or root domain)
       - **Value:** 185.199.108.153
     - **Type:** A
       - **Name:** @ (or root domain)
       - **Value:** 185.199.109.153
     - **Type:** A
       - **Name:** @ (or root domain)
       - **Value:** 185.199.110.153
     - **Type:** A
       - **Name:** @ (or root domain)
       - **Value:** 185.199.111.153
     - **Type:** CNAME
       - **Name:** www
       - **Value:** yourusername.github.io (replace with your GitHub username)

   Note: The A record IPs are GitHub Pages IP addresses. These may change, so check GitHub's documentation for the latest IPs.

5. **Wait for DNS propagation:**
   - DNS changes can take up to 24-48 hours to propagate
   - You can check propagation status using tools like `dig` or online DNS checkers

6. **Verify deployment:**
   - Once DNS propagates, your site should be accessible at `https://newculturetrends.com`
   - The CNAME file in the `public` folder ensures GitHub Pages recognizes your custom domain

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your site when you push to `main`
- Deploy it to GitHub Pages
- Include the CNAME file for your custom domain

### Troubleshooting

- If the site doesn't load, check that DNS has propagated
- Verify the CNAME file is in the `public` folder (it will be copied to `dist` during build)
- Check GitHub Actions logs if deployment fails
- Ensure GitHub Pages is set to use "GitHub Actions" as the source, not a branch

## Firebase Hosting Deployment

1. Install the Firebase CLI and log in:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
2. Initialize hosting (only first time):
   ```bash
   firebase init hosting
   ```
   - Choose your Firebase project (`nctr-34dd5` or your own)
   - Set `dist` as the public directory
   - Configure as a single-page app (`y`)
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

The Firebase Security Rules used in this repo live in `firebase.rules`. Update and deploy them with `firebase deploy --only firestore:rules`.

