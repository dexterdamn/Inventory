// ── TagVault Shared Data Layer ──────────────────────────────────────
const DB_KEY  = 'tagvault_entries';
const CAT_KEY = 'tagvault_categories';

const DEFAULT_CATEGORIES = [
  { name: 'CSV',   color: '#a78bfa' },
  { name: 'Excel', color: '#34d399' },
];

const DEFAULT_ENTRIES = [
  { id: 1, title: 'Sample CSV Record',   category: 'CSV',   tags: ['sample', '2024'], createdAt: Date.now() - 86400000 },
  { id: 2, title: 'Sample Excel Report', category: 'Excel', tags: ['report', 'q1'],   createdAt: Date.now() - 3600000  },
];

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(DB_KEY)) || DEFAULT_ENTRIES; }
  catch { return DEFAULT_ENTRIES; }
}

function saveEntries(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function loadCategories() {
  try { return JSON.parse(localStorage.getItem(CAT_KEY)) || DEFAULT_CATEGORIES; }
  catch { return DEFAULT_CATEGORIES; }
}

function saveCategories(data) {
  localStorage.setItem(CAT_KEY, JSON.stringify(data));
}

function catColor(name, cats) {
  return (cats || loadCategories()).find(c => c.name === name)?.color || '#94a3b8';
}

function tagClass(t) {
  const map = { csv: 'csv', excel: 'excel' };
  return map[t.toLowerCase()] || 'other';
}

function nextId(entries) {
  return entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}