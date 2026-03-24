import fs from 'fs';
import path from 'path';

interface Attendee {
  number: number;
  name: string;
  title: string;
  company: string;
  linkedin_url: string;
  category?: string;
  isTopTarget?: boolean;
  priorityScore?: number;
}

function categorizeAttendee(attendee: Attendee): string {
  const companyLower = attendee.company.toLowerCase();
  const titleLower = attendee.title.toLowerCase();

  // Check categories in order of priority
  if (companyLower.includes('saudi') || companyLower.includes('uae') || 
      companyLower.includes('qatar') || companyLower.includes('kuwait') ||
      companyLower.includes('bahrain') || companyLower.includes('oman') ||
      companyLower.includes('gulf') || companyLower.includes('arab') ||
      companyLower.includes('dubai')) {
    return 'Middle East';
  }

  if (companyLower.includes('venture') || companyLower.includes('capital') || 
      companyLower.includes('fund') || companyLower.includes('partners') ||
      companyLower.includes('investment') || companyLower.includes('wealth') ||
      companyLower.includes('bank') || companyLower.includes('financial') ||
      companyLower.includes('asset') || companyLower.includes('private equity')) {
    return 'Investors';
  }

  if (companyLower.includes('ai') || companyLower.includes('tech') || 
      companyLower.includes('technology') || companyLower.includes('software') ||
      companyLower.includes('digital') || companyLower.includes('data') ||
      companyLower.includes('platform') || companyLower.includes('cloud')) {
    return 'Tech/AI';
  }

  if (companyLower.includes('education') || companyLower.includes('university') || 
      companyLower.includes('school') || companyLower.includes('learning') ||
      companyLower.includes('edtech') || companyLower.includes('academy')) {
    return 'EdTech';
  }

  if (companyLower.includes('health') || companyLower.includes('medical') || 
      companyLower.includes('bio') || companyLower.includes('pharma') ||
      companyLower.includes('longevity') || companyLower.includes('therapeutics') ||
      companyLower.includes('wellness') || companyLower.includes('hospital')) {
    return 'Longevity/Health';
  }

  return 'Other';
}

function isTopTarget(attendee: Attendee): boolean {
  const companyLower = attendee.company.toLowerCase();
  const titleLower = attendee.title.toLowerCase();

  // Target companies
  const targetCompanies = [
    'a16z', 'public investment fund', 'pif', 'sedco capital', 
    'lead edge capital', '1984 ventures', '1789 capital', 
    'flamingo capital', 'golden gate ventures', 'stability ai',
    'servicenow', 'beyond limits', 'vista equity partners',
    'morgan stanley', 'sanabil investment', 'jadwa investment',
    'saudi fransi capital', 'aljazira capital', 'pinnacle capital'
  ];

  // Target title keywords
  const targetTitleKeywords = [
    'venture', 'capital', 'fund', 'partner', 'investor', 'cio', 'investment'
  ];

  // Check company match
  for (const targetCompany of targetCompanies) {
    if (companyLower.includes(targetCompany.toLowerCase())) {
      return true;
    }
  }

  // Check title match
  for (const keyword of targetTitleKeywords) {
    if (titleLower.includes(keyword)) {
      return true;
    }
  }

  return false;
}

function calculatePriorityScore(attendee: Attendee): number {
  let score = 0;
  const companyLower = attendee.company.toLowerCase();
  const titleLower = attendee.title.toLowerCase();

  // High priority companies get +3
  const highPriorityCompanies = ['a16z', 'public investment fund', 'pif'];
  for (const company of highPriorityCompanies) {
    if (companyLower.includes(company.toLowerCase())) {
      score += 3;
    }
  }

  // Other target companies get +2
  const otherTargetCompanies = [
    'sedco capital', 'lead edge capital', '1984 ventures', '1789 capital',
    'flamingo capital', 'golden gate ventures', 'stability ai',
    'servicenow', 'beyond limits', 'vista equity partners',
    'morgan stanley', 'sanabil investment', 'jadwa investment',
    'saudi fransi capital', 'aljazira capital', 'pinnacle capital'
  ];
  for (const company of otherTargetCompanies) {
    if (companyLower.includes(company.toLowerCase())) {
      score += 2;
    }
  }

  // Title keywords get +1
  const titleKeywords = ['venture', 'capital', 'fund', 'partner', 'investor', 'cio', 'investment'];
  for (const keyword of titleKeywords) {
    if (titleLower.includes(keyword)) {
      score += 1;
    }
  }

  return score;
}

async function processData() {
  console.log('Processing FII attendee data...');
  
  // Read the original data
  const dataPath = path.join(__dirname, '../public/FII_FINAL.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const attendees: Attendee[] = JSON.parse(rawData);

  console.log(`Processing ${attendees.length} attendees...`);

  // Process each attendee
  const processedAttendees = attendees.map(attendee => {
    const category = categorizeAttendee(attendee);
    const isTopTargetFlag = isTopTarget(attendee);
    const priorityScore = calculatePriorityScore(attendee);

    return {
      ...attendee,
      category,
      isTopTarget: isTopTargetFlag,
      priorityScore
    };
  });

  // Count categories
  const categoryCounts: Record<string, number> = {};
  let topTargetCount = 0;
  
  processedAttendees.forEach(attendee => {
    categoryCounts[attendee.category] = (categoryCounts[attendee.category] || 0) + 1;
    if (attendee.isTopTarget) topTargetCount++;
  });

  console.log('Category counts:', categoryCounts);
  console.log(`Top targets: ${topTargetCount}`);

  // Write processed data
  const outputPath = path.join(__dirname, '../src/data/processed-attendees.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(processedAttendees, null, 2));

  console.log(`Processed data written to ${outputPath}`);
  console.log('Done!');
}

processData().catch(console.error);