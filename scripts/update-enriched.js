#!/usr/bin/env node
/**
 * Modular script to update FII Explorer app with enriched bios
 * Usage: node update-enriched.js /path/to/new-enriched.json
 */

const fs = require('fs');
const path = require('path');

const APP_DATA_PATH = path.join(__dirname, '../public/data/processed-attendees.json');
const BACKUP_DIR = path.join(__dirname, '../public/data/backups');

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function backupCurrentData() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `processed-attendees-${timestamp}.json`);
  
  if (fs.existsSync(APP_DATA_PATH)) {
    fs.copyFileSync(APP_DATA_PATH, backupPath);
    console.log(`✅ Backup created: ${backupPath}`);
    return backupPath;
  }
  return null;
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error.message);
    process.exit(1);
  }
}

function mergeData(appData, enrichedData) {
  // Create lookup by attendee number
  const enrichedMap = new Map();
  enrichedData.forEach(item => {
    enrichedMap.set(item.number, item.enriched || {});
  });
  
  // Merge enriched data into app data
  const merged = appData.map(attendee => {
    const enriched = enrichedMap.get(attendee.number);
    if (enriched) {
      return {
        ...attendee,
        enriched,
        tags: [...(attendee.tags || []), ...(enriched.additional_tags || [])]
      };
    }
    return attendee;
  });
  
  return merged;
}

function updateAppData(mergedData) {
  fs.writeFileSync(
    APP_DATA_PATH,
    JSON.stringify(mergedData, null, 2),
    'utf8'
  );
  console.log(`✅ Updated app data: ${APP_DATA_PATH}`);
}

function generateReport(appData, enrichedData, mergedData) {
  const totalAttendees = appData.length;
  const newlyEnriched = enrichedData.length;
  const totalEnriched = mergedData.filter(a => a.enriched).length;
  
  console.log('\n📊 Update Report:');
  console.log(`   Total attendees: ${totalAttendees}`);
  console.log(`   Newly enriched: ${newlyEnriched}`);
  console.log(`   Total enriched: ${totalEnriched}`);
  console.log(`   Enrichment coverage: ${((totalEnriched / totalAttendees) * 100).toFixed(1)}%`);
  
  // Sample of newly enriched
  const sample = mergedData
    .filter(a => a.enriched)
    .slice(0, 3)
    .map(a => `   ${a.number}. ${a.name} (${a.company})`);
  
  if (sample.length > 0) {
    console.log('\n   Sample newly enriched:');
    sample.forEach(s => console.log(s));
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node update-enriched.js /path/to/new-enriched.json');
    console.log('Example: node update-enriched.js ../../fii-enriched-100.json');
    process.exit(1);
  }
  
  const enrichedFilePath = path.resolve(args[0]);
  
  console.log('🚀 Starting FII Explorer enrichment update...');
  console.log(`   Source: ${enrichedFilePath}`);
  console.log(`   Target: ${APP_DATA_PATH}`);
  
  // Step 1: Backup current data
  ensureBackupDir();
  backupCurrentData();
  
  // Step 2: Load data
  console.log('\n📂 Loading data...');
  const appData = loadJSON(APP_DATA_PATH);
  const enrichedData = loadJSON(enrichedFilePath);
  
  console.log(`   App data: ${appData.length} attendees`);
  console.log(`   Enriched data: ${enrichedData.length} attendees`);
  
  // Step 3: Merge
  console.log('\n🔄 Merging data...');
  const mergedData = mergeData(appData, enrichedData);
  
  // Step 4: Update app
  updateAppData(mergedData);
  
  // Step 5: Generate report
  generateReport(appData, enrichedData, mergedData);
  
  console.log('\n✅ Update complete!');
  console.log('   Next steps:');
  console.log('   1. git add public/data/processed-attendees.json');
  console.log('   2. git commit -m "Update: add enriched bios"');
  console.log('   3. git push origin main');
  console.log('   4. Vercel will auto-deploy');
}

if (require.main === module) {
  main();
}

module.exports = {
  mergeData,
  backupCurrentData,
  updateAppData
};