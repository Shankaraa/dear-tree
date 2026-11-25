// ─────────────────────────────────────────────────────────────
// Named Trees — sample data
// ─────────────────────────────────────────────────────────────

// User's own trees (with month progress)
const SAMPLE_USER = {
  name: 'Anika Rao',
  city: 'Chennai',
  joined: 'Mar 2024',
};

// the "main" tree we visit in the prototype — month is tweakable
const MAIN_TREE = {
  id: 'arka-tree',
  mytreeId: 'MYT-TN-CHN-ADY-0248',
  handle: '@anika-rao',
  dedicatedTo: 'Arka',
  dedicationKind: 'kid',   // kid | memorial | gift | self
  dedicationLine: 'For Arka, born 14 March 2024',
  species: 'Indian Pongam · Pongamia pinnata',
  location: 'Adyar Eco Park · River Walk',
  lat: 13.0109, lng: 80.2574,
  planted: '21 April 2024',
  tier: 'standard',
  guardian: 'Anika Rao',
  steward: 'Karthik (SayTrees)',
  monthsTotal: 24,
};

// Other trees in the user's garden
const OTHER_TREES = [
  {
    id: 'ammu-tree',
    mytreeId: 'MYT-TN-MDU-VGP-1182',
    handle: '@anika-rao',
    dedicatedTo: 'Ammu',
    dedicationKind: 'memorial',
    sub: 'In memory of Lakshmi Rao · 1948–2022',
    species: 'Indian Beech',
    location: 'Madurai · Vandiyur Park Edge',
    monthProgress: 18,
    tier: 'hivis',
  },
  {
    id: 'sapling-2',
    mytreeId: 'MYT-TN-TRY-KAV-0427',
    handle: '@anika-rao',
    dedicatedTo: 'Veer',
    dedicationKind: 'kid',
    sub: 'For Veer, born 02 Feb 2026',
    species: 'Neem',
    location: 'Tiruchirappalli · Kaveri Bank',
    monthProgress: 3,
    tier: 'standard',
  },
];

// Available spots for the Plant flow. Tamil Nadu is the launch region; Bengaluru stays as an expansion/demo region.
const SPOTS = [
  { id: 'tn1', region: 'tn', mytreePrefix: 'MYT-TN-CHN-ADY', tier: 'hivis',    label: 'Adyar Eco Park · River Walk',       lat: 13.0109, lng: 80.2574, name: 'Adyar River Walk', available: 18, footfall: 'High', species: ['Pongam', 'Neem', 'Poovarasu'] },
  { id: 'tn2', region: 'tn', mytreePrefix: 'MYT-TN-CHN-MYL', tier: 'civic',    label: 'Mylapore · Temple Tank Streets',   lat: 13.0338, lng: 80.2692, name: 'Mylapore Tank Loop', available: 6, footfall: 'Very High', species: ['Peepal', 'Indian Beech', 'Pongam'] },
  { id: 'tn3', region: 'tn', mytreePrefix: 'MYT-TN-CBE-RSP', tier: 'standard', label: 'Coimbatore · Race Course Road',    lat: 11.0018, lng: 76.9663, name: 'Race Course Road', available: 14, footfall: 'Medium', species: ['Neem', 'Pungam', 'Jamun'] },
  { id: 'tn4', region: 'tn', mytreePrefix: 'MYT-TN-MDU-VGP', tier: 'hivis',    label: 'Madurai · Vandiyur Park Edge',     lat: 9.9252, lng: 78.1495, name: 'Vandiyur Park Edge', available: 10, footfall: 'High', species: ['Pongam', 'Neem', 'Iluppai'] },
  { id: 'tn5', region: 'tn', mytreePrefix: 'MYT-TN-TRY-KAV', tier: 'standard', label: 'Tiruchirappalli · Kaveri Bank',    lat: 10.8624, lng: 78.7052, name: 'Kaveri Bank Walk', available: 22, footfall: 'Medium', species: ['Arjuna', 'Pongam', 'Neem'] },
  { id: 'tn6', region: 'tn', mytreePrefix: 'MYT-TN-TNJ-DEL', tier: 'rural',    label: 'Thanjavur Delta Restoration',      lat: 10.7870, lng: 79.1378, name: 'Delta Block 2', available: 360, footfall: 'Low', species: ['Native riparian mix'] },
  { id: 'tn7', region: 'tn', mytreePrefix: 'MYT-TN-NLG-MGR', tier: 'rural',    label: 'Nilgiris · Shola Edge Buffer',     lat: 11.4064, lng: 76.6932, name: 'Shola Buffer 1', available: 180, footfall: 'Low', species: ['Native shola mix'] },
  { id: 's1', region: 'blr', mytreePrefix: 'MYT-BLR-CPW', tier: 'standard', label: 'Cubbon Park · West Walk',  lat: 12.9763, lng: 77.5929, name: 'Cubbon Park West', available: 4, footfall: 'Medium', species: ['Pongam', 'Neem', 'Champaka'] },
  { id: 's2', region: 'blr', mytreePrefix: 'MYT-BLR-LBG', tier: 'hivis',    label: 'Lalbagh · Glass House',     lat: 12.9507, lng: 77.5848, name: 'Lalbagh Glass House', available: 2, footfall: 'High',  species: ['Mahogany', 'Gulmohar'] },
  { id: 's3', region: 'blr', mytreePrefix: 'MYT-BLR-MJS', tier: 'civic',    label: 'Majestic Bus Station',     lat: 12.9774, lng: 77.5717, name: 'Majestic Frontage',   available: 1, footfall: 'Very High', species: ['Banyan', 'Peepal'] },
  { id: 's4', region: 'blr', mytreePrefix: 'MYT-BLR-IND', tier: 'standard', label: 'Indiranagar · 12th Main',   lat: 12.9719, lng: 77.6412, name: '12th Main Avenue', available: 8, footfall: 'Medium', species: ['Tabebuia', 'Pongam'] },
  { id: 's5', region: 'blr', mytreePrefix: 'MYT-BLR-SJG', tier: 'hivis',    label: 'St. Joseph School Gate',    lat: 12.9612, lng: 77.6063, name: 'St. Joseph Gate', available: 3, footfall: 'High', species: ['Rain Tree', 'Mahogany'] },
  { id: 's6', region: 'blr', mytreePrefix: 'MYT-KA-HSK',  tier: 'rural',    label: 'Hosakote Watershed',        lat: 13.0712, lng: 77.7973, name: 'Hosakote Block 4', available: 240, footfall: 'Low', species: ['Native restoration mix'] },
  { id: 's7', region: 'blr', mytreePrefix: 'MYT-BLR-KRM', tier: 'standard', label: 'Koramangala Block 4 Park',  lat: 12.9352, lng: 77.6245, name: 'Block 4 Park', available: 6, footfall: 'Medium', species: ['Neem', 'Pongam'] },
];

// Growth photo months (1–24)
const GROWTH_PHOTOS = Array.from({ length: 24 }, (_, i) => i + 1);

// Milestones on the timeline
const MILESTONES = [
  { month: 1,  kind: 'plant',   label: 'Planted', detail: '40 cm sapling, healthy roots' },
  { month: 2,  kind: 'photo',   label: 'First leaves', detail: 'Steward Karthik · 14 photos' },
  { month: 4,  kind: 'water',   label: 'Monsoon caught', detail: 'No watering needed for 18 days' },
  { month: 6,  kind: 'animal',  label: 'First visitor', detail: 'Purple sunbird · 06:42 IST' },
  { month: 9,  kind: 'height',  label: '1 metre tall', detail: 'Measured 04 Jan 2025' },
  { month: 12, kind: 'cake',    label: 'First birthday', detail: '1 year alive · 84% of cohort still standing' },
  { month: 14, kind: 'animal',  label: 'Squirrel sighted', detail: 'Indian palm squirrel · 11:08 IST' },
  { month: 18, kind: 'height',  label: '2.1 metres', detail: 'Canopy 0.9 m wide' },
  { month: 22, kind: 'animal',  label: 'Bird nest', detail: 'Common myna · 2 eggs' },
  { month: 24, kind: 'tag',     label: 'Tag ceremony', detail: 'The permanent tag is ready' },
];

// Animal sightings
const SIGHTINGS = [
  { id: 1, animal: 'Purple sunbird',          when: '06:42 · Today',     icon: 'bird',     count: 3, first: false },
  { id: 2, animal: 'Indian palm squirrel',    when: '11:08 · Yesterday', icon: 'squirrel', count: 12, first: false },
  { id: 3, animal: 'Common myna · with nest', when: '17:24 · Sun',       icon: 'bird',     count: 1, first: true },
  { id: 4, animal: 'Asian koel',              when: '06:01 · Sat',       icon: 'bird',     count: 2, first: false },
];

// Public registry — other people's trees
const REGISTRY = [
  { id: 'r1', mytreeId: 'MYT-PUN-BNR-0174', handle: '@mehta-family', name: 'Aarav',    dedicator: 'The Mehta family', city: 'Pune',       species: 'Neem',           month: 19, tier: 'standard', kind: 'kid' },
  { id: 'r2', mytreeId: 'MYT-TN-CHN-ADY-0248', handle: '@anika-rao', name: 'Maya',     dedicator: 'Anonymous',        city: 'Chennai',     species: 'Pongam',         month: 24, tier: 'standard', kind: 'kid', tagged: true },
  { id: 'r3', mytreeId: 'MYT-HYD-CHR-3102', handle: '@class-4b', name: 'Iqbal Saab', dedicator: 'The 4B teachers', city: 'Hyderabad', species: 'Banyan',         month: 24, tier: 'civic',    kind: 'memorial', tagged: true },
  { id: 'r4', mytreeId: 'MYT-MAA-OMR-0880', handle: '@tcs-impact', name: 'Project Greenways', dedicator: 'Tata Consultancy CSR', city: 'Chennai', species: '120-tree corridor', month: 14, tier: 'hivis', kind: 'corporate' },
  { id: 'r5', mytreeId: 'MYT-TN-MDU-VGP-0641', handle: '@ravi-priya', name: 'Saanvi',    dedicator: 'Ravi & Priya',     city: 'Madurai',     species: 'Poovarasu',      month: 11, tier: 'standard', kind: 'kid' },
  { id: 'r6', mytreeId: 'MYT-TN-TNJ-DEL-0004', handle: '@delta-block2', name: 'Thanjavur Delta Block 2',  dedicator: 'Cross-subsidy fund', city: 'Tamil Nadu rural', species: 'Native mix · 360 trees', month: 6, tier: 'rural', kind: 'reforest' },
];

const SCAN_SAMPLE = {
  mytreeId: 'MYT-TN-CHN-ADY-0248',
  name: 'Arka',
  handle: '@anika-rao',
  supporter: 'Anika Rao',
  species: 'Indian Pongam',
  location: 'Adyar Eco Park · River Walk',
  taggedOn: '25 Apr 2026',
  relation: '2 mutual supporters',
};

// Notifications / feed entries
const FEED = [
  { id: 1, when: '2h ago',  kind: 'animal',   tree: 'Arka',  text: 'A purple sunbird visited Arka\'s tree this morning.', icon: 'bird',   tone: 'leaf' },
  { id: 2, when: 'Today',   kind: 'milestone',tree: 'Ammu',  text: 'Ammu\'s tree just reached 3.2 m — taller than your grandmother.', icon: 'ruler', tone: 'mari' },
  { id: 3, when: 'Yesterday', kind: 'water',  tree: 'Veer',  text: 'Karthik watered Veer\'s sapling. 3rd visit this week.', icon: 'drop', tone: 'sky' },
  { id: 4, when: 'Sun',     kind: 'photo',    tree: 'Arka',  text: '14 new growth photos this week from steward Karthik.', icon: 'camera', tone: 'default' },
  { id: 5, when: 'Last week', kind: 'reforest', tree: null, text: 'Your premium ledger funded 12 saplings in the Thanjavur delta this month.', icon: 'tree', tone: 'leaf' },
];

window.NT_DATA = {
  SAMPLE_USER, MAIN_TREE, OTHER_TREES, SPOTS, GROWTH_PHOTOS, MILESTONES, SIGHTINGS, REGISTRY, FEED, SCAN_SAMPLE,
};
