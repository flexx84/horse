/**
 * Database Initialization Script
 * Creates tables and inserts seed data from actual captured slot pages
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'impact.db');
const db = new Database(dbPath);

console.log('='.repeat(60));
console.log('Initializing Impact Slot Database...');
console.log('='.repeat(60));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
console.log('\n[1/4] Creating tables...');

db.exec(`
  -- Slots table
  CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT,
    agency TEXT,
    slot_type TEXT DEFAULT 'GA',
    keyword TEXT,
    rankkeyword TEXT,
    ranking INTEGER DEFAULT 999,
    ranking_status TEXT DEFAULT 'X',
    start_date TEXT,
    end_date TEXT,
    memo TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Hourly rankings table
  CREATE TABLE IF NOT EXISTS hourly_rankings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_id INTEGER NOT NULL,
    time_txt TEXT NOT NULL,
    ranking INTEGER,
    ranking_txt TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (slot_id) REFERENCES slots(id) ON DELETE CASCADE
  );

  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes for performance
  CREATE INDEX IF NOT EXISTS idx_slots_user_id ON slots(user_id);
  CREATE INDEX IF NOT EXISTS idx_slots_slot_type ON slots(slot_type);
  CREATE INDEX IF NOT EXISTS idx_hourly_rankings_slot_id ON hourly_rankings(slot_id);
  CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
`);

console.log('  ✓ Tables created successfully');

// Insert seed users
console.log('\n[2/4] Inserting seed users...');

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (user_id, user_name) VALUES (?, ?)
`);

const users = [
  ['pcsmkt7', '장부장'],
  ['test1', '테스트1'],
  ['test2', '테스트2']
];

for (const [userId, userName] of users) {
  insertUser.run(userId, userName);
}

console.log(`  ✓ ${users.length} users inserted`);

// Insert actual slot data from captured page
console.log('\n[3/4] Inserting real slot data from captured pages...');

const insertSlot = db.prepare(`
  INSERT OR REPLACE INTO slots (
    id, user_id, user_name, agency, slot_type, keyword, rankkeyword,
    ranking, ranking_status, start_date, end_date, memo
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Real data from https://impact.me.kr/slot/GA (captured 2025-10-27)
const slots = [
  {
    id: 739758,
    user_id: 'pcsmkt7',
    user_name: '장부장',
    agency: 'runknight',
    slot_type: 'GA',
    keyword: '소액결제현금화 애app1e플티켓',
    rankkeyword: '소액결제현금화',
    ranking: 999,
    ranking_status: 'X',
    start_date: '2025.10.25',
    end_date: '2025.11.23',
    memo: '테스트 메모입니다'
  },
  {
    id: 739757,
    user_id: 'pcsmkt7',
    user_name: '장부장',
    agency: 'runknight',
    slot_type: 'GA',
    keyword: '카드깡 애app1e플티켓',
    rankkeyword: '카드깡',
    ranking: 1,
    ranking_status: 'O',
    start_date: '2025.10.25',
    end_date: '2025.11.23',
    memo: ''
  },
  {
    id: 739756,
    user_id: 'pcsmkt7',
    user_name: '장부장',
    agency: 'runknight',
    slot_type: 'GA',
    keyword: '카드깡 애app1e플티켓',
    rankkeyword: '카드깡',
    ranking: 1,
    ranking_status: 'O',
    start_date: '2025.10.25',
    end_date: '2025.11.23',
    memo: ''
  },
  {
    id: 739755,
    user_id: 'pcsmkt7',
    user_name: '장부장',
    agency: 'runknight',
    slot_type: 'GA',
    keyword: '카드깡 애app1e플티켓',
    rankkeyword: '카드깡',
    ranking: 999,
    ranking_status: 'X',
    start_date: '2025.10.25',
    end_date: '2025.11.23',
    memo: ''
  },
  {
    id: 739754,
    user_id: 'pcsmkt7',
    user_name: '장부장',
    agency: 'runknight',
    slot_type: 'GA',
    keyword: '카드깡 애app1e플티켓',
    rankkeyword: '카드깡',
    ranking: 999,
    ranking_status: 'X',
    start_date: '2025.10.25',
    end_date: '2025.11.23',
    memo: ''
  }
];

for (const slot of slots) {
  insertSlot.run(
    slot.id, slot.user_id, slot.user_name, slot.agency, slot.slot_type,
    slot.keyword, slot.rankkeyword, slot.ranking, slot.ranking_status,
    slot.start_date, slot.end_date, slot.memo
  );
}

console.log(`  ✓ ${slots.length} slots inserted`);

// Insert sample hourly ranking data
console.log('\n[4/4] Inserting sample hourly ranking data...');

const insertHourly = db.prepare(`
  INSERT INTO hourly_rankings (slot_id, time_txt, ranking, ranking_txt)
  VALUES (?, ?, ?, ?)
`);

// Sample data for slot 739757 (카드깡)
const hourlyData = [
  { time: '09:00', rank: 1 },
  { time: '08:00', rank: 1 },
  { time: '07:00', rank: 2 },
  { time: '06:00', rank: 1 },
  { time: '05:00', rank: 3 }
];

for (const data of hourlyData) {
  insertHourly.run(739757, data.time, data.rank, `${data.rank}위`);
}

console.log(`  ✓ ${hourlyData.length} hourly rankings inserted`);

// Verify data
console.log('\n' + '='.repeat(60));
console.log('Database verification:');
console.log('='.repeat(60));

const slotCount = db.prepare('SELECT COUNT(*) as count FROM slots').get();
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
const hourlyCount = db.prepare('SELECT COUNT(*) as count FROM hourly_rankings').get();

console.log(`  Slots: ${slotCount.count}`);
console.log(`  Users: ${userCount.count}`);
console.log(`  Hourly rankings: ${hourlyCount.count}`);

console.log('\n✅ Database initialized successfully!');
console.log(`📁 Database file: ${dbPath}\n`);

db.close();
