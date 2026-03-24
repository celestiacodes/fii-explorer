# Deployment Guide

## Vercel Deployment

### Automatic Deployment (Recommended)
1. Go to [Vercel](https://vercel.com/new)
2. Sign in with GitHub
3. Import repository: `celestiacodes/fii-explorer`
4. Vercel will automatically detect Next.js configuration
5. Click "Deploy"

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Environment Variables
No environment variables required for this application.

## Build Configuration
Vercel will automatically:
- Detect Next.js framework
- Run `npm run build`
- Deploy static assets

## Custom Domain (Optional)
1. In Vercel dashboard, go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Post-Deployment
1. Access your deployed app at: `https://fii-explorer.vercel.app` (or your custom domain)
2. Login with password: `fiimiami26`
3. The app is now ready for FII Miami 2026

## Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Updates
If attendee data needs to be updated:
1. Replace `public/FII_FINAL.json`
2. Run data processing script:
   ```bash
   npx tsx scripts/process-data.ts
   ```
3. Commit and push changes
4. Vercel will automatically redeploy