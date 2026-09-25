// Shared Data Model — exact structure as specified
const mockData = {
  mandis: [
    {
      id: 'm1',
      name: 'Azadpur Mandi',
      location: 'Delhi',
      crop: 'Wheat',
      price: 2450,
      priceHistory: [2380, 2400, 2410, 2420, 2435, 2440, 2450],
      lastUpdated: '2026-09-25T08:00:00Z'
    },
    {
      id: 'm2',
      name: 'Khanna Mandi',
      location: 'Punjab',
      crop: 'Wheat',
      price: 2520,
      priceHistory: [2480, 2490, 2500, 2505, 2510, 2515, 2520],
      lastUpdated: '2026-09-25T07:30:00Z'
    },
    {
      id: 'm3',
      name: 'Indore Mandi',
      location: 'Madhya Pradesh',
      crop: 'Wheat',
      price: 2380,
      priceHistory: [2350, 2360, 2365, 2370, 2375, 2378, 2380],
      lastUpdated: '2026-09-25T09:00:00Z'
    },
    {
      id: 'm4',
      name: 'Nashik Mandi',
      location: 'Maharashtra',
      crop: 'Onion',
      price: 1850,
      priceHistory: [1900, 1880, 1870, 1860, 1855, 1850, 1850],
      lastUpdated: '2026-09-25T08:15:00Z'
    },
    {
      id: 'm5',
      name: 'Lasalgaon Mandi',
      location: 'Maharashtra',
      crop: 'Onion',
      price: 1920,
      priceHistory: [1950, 1940, 1935, 1930, 1925, 1920, 1920],
      lastUpdated: '2026-09-25T08:45:00Z'
    },
    {
      id: 'm6',
      name: 'Pimpalgaon Mandi',
      location: 'Maharashtra',
      crop: 'Onion',
      price: 1780,
      priceHistory: [1820, 1810, 1800, 1790, 1785, 1780, 1780],
      lastUpdated: '2026-09-25T07:50:00Z'
    },
    {
      id: 'm7',
      name: 'Karnal Mandi',
      location: 'Haryana',
      crop: 'Rice',
      price: 3200,
      priceHistory: [3150, 3160, 3170, 3180, 3190, 3195, 3200],
      lastUpdated: '2026-09-25T08:20:00Z'
    },
    {
      id: 'm8',
      name: 'Amritsar Mandi',
      location: 'Punjab',
      crop: 'Rice',
      price: 3350,
      priceHistory: [3300, 3310, 3320, 3330, 3340, 3345, 3350],
      lastUpdated: '2026-09-25T08:10:00Z'
    },
    {
      id: 'm9',
      name: 'Bareilly Mandi',
      location: 'Uttar Pradesh',
      crop: 'Rice',
      price: 3100,
      priceHistory: [3050, 3065, 3075, 3085, 3090, 3095, 3100],
      lastUpdated: '2026-09-25T09:05:00Z'
    },
    {
      id: 'm10',
      name: 'Rajkot Mandi',
      location: 'Gujarat',
      crop: 'Cotton',
      price: 6850,
      priceHistory: [6700, 6750, 6780, 6800, 6820, 6840, 6850],
      lastUpdated: '2026-09-25T07:40:00Z'
    },
    {
      id: 'm11',
      name: 'Adoni Mandi',
      location: 'Andhra Pradesh',
      crop: 'Cotton',
      price: 7020,
      priceHistory: [6900, 6930, 6960, 6980, 7000, 7010, 7020],
      lastUpdated: '2026-09-25T08:30:00Z'
    },
    {
      id: 'm12',
      name: 'Yavatmal Mandi',
      location: 'Maharashtra',
      crop: 'Cotton',
      price: 6650,
      priceHistory: [6550, 6580, 6600, 6620, 6635, 6645, 6650],
      lastUpdated: '2026-09-25T08:00:00Z'
    }
  ],
  farmers: [
    { id: 'f1', name: 'Ramesh Patel', village: 'Mehsana', phone: '9876543210' },
    { id: 'f2', name: 'Suresh Yadav', village: 'Karnal', phone: '9876543211' },
    { id: 'f3', name: 'Lakshmi Devi', village: 'Nashik', phone: '9876543212' }
  ],
  lots: [
    { id: 'l1', farmerId: 'f1', crop: 'Wheat', quantity: 50, grade: 'A', status: 'listed' },
    { id: 'l2', farmerId: 'f2', crop: 'Rice', quantity: 30, grade: 'B', status: 'matched' }
  ],
  buyers: [
    { id: 'b1', name: 'AgroTrade Pvt Ltd', type: 'Trader', verified: true, rating: 4.6, demand: { crop: 'Wheat', quantity: 200 } },
    { id: 'b2', name: 'GreenHarvest Co-op', type: 'Cooperative', verified: true, rating: 4.8, demand: { crop: 'Onion', quantity: 150 } },
    { id: 'b3', name: 'Punjab Rice Mills', type: 'Processor', verified: true, rating: 4.5, demand: { crop: 'Rice', quantity: 100 } },
    { id: 'b4', name: 'Cotton Link India', type: 'Exporter', verified: true, rating: 4.7, demand: { crop: 'Cotton', quantity: 80 } }
  ],
  offers: [
    { id: 'o1', lotId: 'l1', buyerId: 'b1', price: 2500, status: 'pending' }
  ],
  transactions: [],
  grievances: [],
  priceAlerts: [
    { id: 'pa1', crop: 'Wheat', mandiId: 'm2', changePercent: 3.2, direction: 'up', timestamp: '2026-09-25T06:00:00Z' },
    { id: 'pa2', crop: 'Onion', mandiId: 'm4', changePercent: 2.6, direction: 'down', timestamp: '2026-09-25T05:30:00Z' },
    { id: 'pa3', crop: 'Rice', mandiId: 'm8', changePercent: 4.1, direction: 'up', timestamp: '2026-09-25T07:00:00Z' }
  ]
};

// Available crops for menu
const CROPS = ['Wheat', 'Onion', 'Rice', 'Cotton'];

// Helper: get mandis for a crop
function getMandisForCrop(crop) {
  return mockData.mandis.filter(m => m.crop === crop);
}

// Helper: best buyer offer for crop
function getBestBuyerOffer(crop) {
  const matching = mockData.buyers.filter(b => b.demand.crop === crop);
  if (matching.length === 0) return null;
  // Simulate a slightly higher offer than top mandi
  const topMandi = getMandisForCrop(crop).sort((a, b) => b.price - a.price)[0];
  const bestBuyer = matching.sort((a, b) => b.rating - a.rating)[0];
  return {
    buyer: bestBuyer,
    offerPrice: topMandi ? Math.round(topMandi.price * 1.03) : 0
  };
}

// Helper: active price alert for crop
function getActiveAlert(crop) {
  return mockData.priceAlerts.find(a => a.crop === crop) || null;
}

// Generate unique lot id
function generateLotId() {
  return 'l' + (mockData.lots.length + 1 + Math.floor(Math.random() * 1000));
}

// Generate reference number
function generateRefNumber() {
  return 'KM' + Date.now().toString().slice(-8);
}
