# FII Miami 2026 Attendee Explorer

A password-protected Next.js application for exploring FII Miami 2026 attendees, built for Primer seed round targeting.

## Features

- **Password Protection**: Simple login with password `fiimiami26`
- **Attendee Database**: 1,948 attendees with name, title, company, and LinkedIn links
- **Smart Categorization**: Automatic categorization into Investors, Tech/AI, EdTech, Longevity/Health, Middle East, and Other
- **Top Target Identification**: Flags 502 top targets based on Primer seed round relevance
- **Advanced Filtering**: Search by name/title/company, filter by category, show only top targets
- **Sorting Options**: Sort by name, company, or priority score
- **Mobile Responsive**: Optimized for use on mobile devices at the event
- **Dark Theme**: Professional dark mode design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Icons & Lucide React

## Data Processing

The app includes a data processing script that:
1. Reads raw attendee data from `public/FII_FINAL.json`
2. Applies categorization logic based on company names
3. Identifies top targets based on target companies and titles
4. Calculates priority scores
5. Outputs processed data to `src/data/processed-attendees.json`

### Categorization Logic
- **Investors**: company contains venture, capital, fund, partners, investment, wealth, bank, financial, asset, private equity
- **Tech/AI**: company contains ai, tech, technology, software, digital, data, platform, cloud
- **EdTech**: company contains education, university, school, learning, edtech, academy
- **Longevity/Health**: company contains health, medical, bio, pharma, longevity, therapeutics, wellness, hospital
- **Middle East**: company contains saudi, uae, qatar, kuwait, bahrain, oman, gulf, arab, dubai
- **Other**: everything else

### Top Target Criteria
**Target Companies**: a16z, Public Investment Fund, PIF, SEDCO Capital, Lead Edge Capital, 1984 Ventures, 1789 Capital, Flamingo Capital, Golden Gate Ventures, Stability AI, ServiceNow, Beyond Limits, Vista Equity Partners, Morgan Stanley, Sanabil Investment, Jadwa Investment, Saudi Fransi Capital, Aljazira Capital, Pinnacle Capital

**Target Titles**: Contains venture, capital, fund, partner, investor, cio, investment

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Process Data
```bash
npx tsx scripts/process-data.ts
```

## Deployment

The app is configured for Vercel deployment. Simply connect your GitHub repository to Vercel.

## Usage

1. Access the app and enter password: `fiimiami26`
2. Use the search bar to find specific attendees
3. Filter by category using the sidebar
4. Toggle "Top Targets Only" to focus on Primer-relevant contacts
5. Sort by priority, name, or company
6. Click LinkedIn icons to view profiles
7. Top targets are marked with gold stars and priority scores

## Statistics

- **Total Attendees**: 1,948
- **Top Targets**: 502 (25.8% of total)
- **Category Breakdown**:
  - Investors: 560
  - Tech/AI: 154
  - EdTech: 7
  - Longevity/Health: 31
  - Middle East: 91
  - Other: 1,105

## License

Built for internal use at FII Miami 2026.