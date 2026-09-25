import { ItineraryPlan, ItineraryActivity, ItineraryDay } from '../types';

export interface ExpeditionArchetype {
  id: string;
  name: string;
  nameKn: string;
  tagline: string;
  taglineKn: string;
  icon: string;
  color: string;
  badge: string;
  badgeKn: string;
  recommendedDuration: '1-day' | '2-day' | '3-day';
  recommendedPace: 'relaxed' | 'moderate' | 'active';
  interests: string[];
}

export const EXPEDITION_ARCHETYPES: ExpeditionArchetype[] = [
  {
    id: 'archaeologist',
    name: 'Chalukya Royal Historian',
    nameKn: 'ಚಾಲುಕ್ಯ ರಾಜಮನೆತನದ ಇತಿಹಾಸಕಾರ',
    tagline: 'Deep dive into 6th-century rock architecture, royal epigraphs & temple evolution',
    taglineKn: '೬ನೇ ಶತಮಾನದ ಬಂಡೆ ವಾಸ್ತುಶಿಲ್ಪ, ಶಾಸನಗಳು ಮತ್ತು ದೇವಾಲಯಗಳ ಕಲಾ ಇತಿಹಾಸ',
    icon: '🏛️',
    color: 'from-amber-600 to-amber-800',
    badge: 'Epigraphy & Stonecraft',
    badgeKn: 'ಶಿಲಾಶಾಸನ ಮತ್ತು ಶಿಲ್ಪಕಲೆ',
    recommendedDuration: '2-day',
    recommendedPace: 'moderate',
    interests: ['Architecture', 'History'],
  },
  {
    id: 'photographer',
    name: 'Golden Hour & Canyon Shutterbug',
    nameKn: 'ಸುವರ್ಣ ಸಮಯ ಮತ್ತು ಕಣಿವೆ ಛಾಯಾಗ್ರಾಹಕ',
    tagline: 'Chasing morning light on red sandstone bluffs, lake reflections & crimson sunsets',
    taglineKn: 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯೋದಯ-ಸೂರ್ಯಾಸ್ತದ ಛಾಯಾಗ್ರಹಣ',
    icon: '📸',
    color: 'from-orange-500 to-rose-600',
    badge: 'Azimuths & Reflections',
    badgeKn: 'ಸೂರ್ಯಾಸ್ತ ಮತ್ತು ಬೆಳಕಿನ ಕೋನ',
    recommendedDuration: '2-day',
    recommendedPace: 'relaxed',
    interests: ['Architecture', 'Nature'],
  },
  {
    id: 'textile',
    name: 'GI Silk & Master Weaver Connoisseur',
    nameKn: 'ಇಳಕಲ್ ರೇಷ್ಮೆ ಮತ್ತು ಕೈಮಗ್ಗ ಪ್ರೇಮಿ',
    tagline: 'Pit-loom workshops, Topetenwe warp-interlocking secret & direct weaver collectives',
    taglineKn: 'ಕೈಮಗ್ಗದ ಕೊಂಡಿ ತಂತ್ರಜ್ಞಾನ, ಗುಳೇದಗುಡ್ಡ ಖಣ ಮತ್ತು ನೇಕಾರರಿಂದ ನೇರ ಖರೀದಿ',
    icon: '🧵',
    color: 'from-rose-600 to-purple-700',
    badge: 'Artisan Guilds',
    badgeKn: 'ಕುಶಲ ನೇಕಾರರ ಸಂಘ',
    recommendedDuration: '2-day',
    recommendedPace: 'moderate',
    interests: ['Handlooms', 'History'],
  },
  {
    id: 'epicure',
    name: 'Uttara Karnataka Epicure & Foodie',
    nameKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ರುಚಿ ಯಾತ್ರಿಕ',
    tagline: 'Khanavali Jolada Rotti, Ennegayi brinjals, Shenga Holige & rustic village snacks',
    taglineKn: 'ಖಾನಾವಳಿಗಳ ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಮತ್ತು ಶೇಂಗಾ ಹೋಳಿಗೆ ಯಾತ್ರೆ',
    icon: '🍲',
    color: 'from-amber-500 to-emerald-600',
    badge: 'Culinary Trail',
    badgeKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರ',
    recommendedDuration: '2-day',
    recommendedPace: 'relaxed',
    interests: ['History', 'Nature'],
  },
  {
    id: 'pilgrim',
    name: 'Mystic Sangama & Sacred Springs Pilgrim',
    nameKn: 'ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಯಾತ್ರಿಕ',
    tagline: 'Holy dips in Vishnu Pushkarini, Kudalasangama Aikya Mantapa & Banashankari blessings',
    taglineKn: 'ಮಹಾಕೂಟದ ಪುಷ್ಕರಣಿ, ಕೂಡಲಸಂಗಮದ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ಬನಶಂಕರಿ ದೇವಿಯ ಆಶೀರ್ವಾದ',
    icon: '🪷',
    color: 'from-emerald-600 to-teal-700',
    badge: 'Divine Sanctuary',
    badgeKn: 'ಪವಿತ್ರ ತೀರ್ಥಕ್ಷೇತ್ರ',
    recommendedDuration: '3-day',
    recommendedPace: 'relaxed',
    interests: ['Spiritual', 'Nature'],
  },
  {
    id: 'backpacker',
    name: 'Sandstone Scrambler & Canyon Trekker',
    nameKn: 'ಮರಳುಗಲ್ಲಿನ ಕಣಿವೆ ಸಾಹಸಿ ಮತ್ತು ಟ್ರೆಕ್ಕರ್',
    tagline: 'North fort boulder scrambles, ancient cannon bluffs, Agastya trail & bus hopping',
    taglineKn: 'ಉತ್ತರ ಕೋಟೆಯ ಬಂಡೆಗಳ ಹೈಕಿಂಗ್, ಕ್ಯಾನನ್ ಏರಿಕೆ ಮತ್ತು ಸ್ಥಳೀಯ ಸಾರಿಗೆ ಅನುಭವ',
    icon: '🎒',
    color: 'from-blue-600 to-indigo-800',
    badge: 'Active Adventure',
    badgeKn: 'ಸಾಹಸ ಮತ್ತು ಚಾರಣ',
    recommendedDuration: '1-day',
    recommendedPace: 'active',
    interests: ['Architecture', 'Nature'],
  },
  {
    id: 'offbeat-scout',
    name: 'Offbeat & Hidden Valley Scout',
    nameKn: 'ಗುಪ್ತ ತಾಣ ಮತ್ತು ಕಣಿವೆ ಶೋಧಕ',
    tagline: 'Siddhankolla canyon waterfall, Bilgi stepwell, Guledgudda hill fort, Bachinagudda megaliths & rural shrines',
    taglineKn: 'ಸಿದ್ಧನಕೊಳ್ಳ ಜಲಪಾತ ಕಣಿವೆ, ಬಿಳಿಗಿ ಕಲ್ಯಾಣಿ, ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ, ಬಾಚಿನಗುಡ್ಡ ಶಿಲಾಯುಗ ತಾಣ ಮತ್ತು ನಾಗರಾಳ ಸನ್ನಿಧಿ',
    icon: '✨',
    color: 'from-emerald-600 to-teal-800',
    badge: 'Hidden Gems & Trails',
    badgeKn: 'ಗುಪ್ತ ತಾಣ ಮತ್ತು ಕಣಿವೆ ಹೈಕಿಂಗ್',
    recommendedDuration: '2-day',
    recommendedPace: 'moderate',
    interests: ['Nature', 'History', 'Architecture'],
  },
];

export interface CircuitStop {
  id: string;
  name: string;
  nameKn: string;
  distanceFromBadami: string;
  transitTime: string;
  roadCondition: string;
  roadConditionKn: string;
  transitTip: string;
  transitTipKn: string;
  monumentId?: string;
  highlights: string[];
}

export const CIRCUIT_STOPS: CircuitStop[] = [
  {
    id: 'badami',
    name: 'Badami Rock-cut Valley',
    nameKn: 'ಬಾದಾಮಿ ಕಲ್ಲಿನ ಕಣಿವೆ',
    distanceFromBadami: 'Base Center (0 km)',
    transitTime: '0 mins',
    roadCondition: 'Smooth Asphalt & Town Streets',
    roadConditionKn: 'ಉತ್ತಮ ಡಾಂಬರು ರಸ್ತೆಗಳು',
    transitTip: 'Auto rickshaws (₹50-100) or walking between cave complex and Agastya lake.',
    transitTipKn: 'ಆಟೋ ಅಥವಾ ಕಾಲ್ನಡಿಗೆಯಲ್ಲಿ ಗುಹೆಗಳಿಂದ ಅಗಸ್ತ್ಯ ಸರೋವರಕ್ಕೆ ಸುಲಭ ಪ್ರವೇಶ.',
    monumentId: 'badami-caves',
    highlights: ['Cave Temples 1-4', 'Agastya Lake', 'Bhootanatha', 'North Fort'],
  },
  {
    id: 'mahakuta',
    name: 'Mahakuta Sacred Glen',
    nameKn: 'ಮಹಾಕೂಟ ಪವಿತ್ರ ವನ',
    distanceFromBadami: '14 km East',
    transitTime: '20 mins',
    roadCondition: 'Picturesque rural tree-lined road',
    roadConditionKn: 'ಸುಂದರ ಹಳ್ಳಿ ರಸ್ತೆ',
    transitTip: 'Auto return fare ~₹400-500 including waiting time; or hire cab.',
    transitTipKn: 'ಬಾದಾಮಿಯಿಂದ ಆಟೋ ಅಥವಾ ಕಾರು ಮೂಲಕ ಸುಲಭವಾಗಿ ತಲುಪಬಹುದು.',
    monumentId: 'mahakuta-springs',
    highlights: ['Vishnu Pushkarini Pool', 'Submerged Linga', 'Banyan Grove'],
  },
  {
    id: 'pattadakal',
    name: 'Pattadakal UNESCO Complex',
    nameKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ',
    distanceFromBadami: '22 km Northeast',
    transitTime: '30 mins',
    roadCondition: 'State Highway (SH-14), well maintained',
    roadConditionKn: 'ರಾಜ್ಯ ಹೆದ್ದಾರಿ, ಉತ್ತಮ ಸ್ಥಿತಿ',
    transitTip: 'KSRTC buses leave Badami bus stand every 45 mins (₹25); cabs ~₹800.',
    transitTipKn: 'ಬಾದಾಮಿಯಿಂದ ಪ್ರತಿ ೪೫ ನಿಮಿಷಕ್ಕೊಮ್ಮೆ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ಲಭ್ಯ.',
    monumentId: 'pattadakal-unesco',
    highlights: ['Virupaksha Temple', 'Nagara-Dravida Synthesis', 'Malaprabha Sunset'],
  },
  {
    id: 'aihole',
    name: 'Aihole Architecture Cradle',
    nameKn: 'ಐಹೊಳೆ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು',
    distanceFromBadami: '34 km (14 km from Pattadakal)',
    transitTime: '45 mins from Badami',
    roadCondition: 'Scenic rural highway through sunflower & maize fields',
    roadConditionKn: 'ಗ್ರಾಮೀಣ ಹೆದ್ದಾರಿ',
    transitTip: 'Combine with Pattadakal on same route; KSRTC bus connects Aihole to Badami.',
    transitTipKn: 'ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ಕೇವಲ ೧೪ ಕಿ.ಮೀ, ಒಂದೇ ಮಾರ್ಗದಲ್ಲಿ ವೀಕ್ಷಿಸಬಹುದು.',
    monumentId: 'aihole-cradle',
    highlights: ['Durga Apsidal Temple', 'Ravana Phadi Cave', 'Meguti Inscription'],
  },
  {
    id: 'ilkal',
    name: 'Ilkal & Guledgudda Handlooms',
    nameKn: 'ಇಳಕಲ್ ಮತ್ತು ಗುಳೇದಗುಡ್ಡ ನೇಕಾರರ ಪಟ್ಟಣ',
    distanceFromBadami: '38 km East of Aihole (55 km from Badami)',
    transitTime: '55 mins',
    roadCondition: 'National Highway NH-50 spur',
    roadConditionKn: 'ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ ಸಂಪರ್ಕ',
    transitTip: 'Direct KSRTC buses from Badami / Bagalkote; weaver cooperatives welcome visitors until 6 PM.',
    transitTipKn: 'ನೇಕಾರರ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ಸಂಜೆ ೬ರವರೆಗೆ ಭೇಟಿ ನೀಡಬಹುದು.',
    highlights: ['Pit-loom Weaving', 'Topetenwe Pallu', 'Kasuti Guilds'],
  },
  {
    id: 'kudalasangama',
    name: 'Kudalasangama Holy Confluence',
    nameKn: 'ಕೂಡಲಸಂಗಮ ಪವಿತ್ರ ಸಂಗಮ',
    distanceFromBadami: '72 km Northeast',
    transitTime: '1 hr 25 mins',
    roadCondition: 'Wide, smooth expressway corridor',
    roadConditionKn: 'ಅಗಲವಾದ ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ ಕಾರಿಡಾರ್',
    transitTip: 'Best planned on Day 3 morning; full dining hall & boat ride available on site.',
    transitTipKn: '೩ನೇ ದಿನದ ಬೆಳಿಗ್ಗೆ ಪ್ರವಾಸಕ್ಕೆ ಅತ್ಯುತ್ತಮ; ದಾಸೋಹ ಭವನ ಮತ್ತು ಬೋಟಿಂಗ್ ಲಭ್ಯ.',
    monumentId: 'kudalasangama-aikya',
    highlights: ['Basavanna Aikya Mantapa', 'Krishna-Malaprabha River Sangama', 'Cylindrical Well'],
  },
  {
    id: 'siddhankolla',
    name: 'Siddhankolla Waterfall Canyon',
    nameKn: 'ಸಿದ್ಧನಕೊಳ್ಳ ಕಣಿವೆ & ಜಲಪಾತ',
    distanceFromBadami: '18 km East',
    transitTime: '30 mins',
    roadCondition: 'Shaded rural trail & sandstone ravine',
    roadConditionKn: 'ಹಳ್ಳಿ ರಸ್ತೆ ಮತ್ತು ಕಣಿವೆಯ ಕಾಲುದಾರಿ',
    transitTip: 'Hire auto from Badami; wear shoes with good grip on wet rocks.',
    transitTipKn: 'ಬಾದಾಮಿಯಿಂದ ಆಟೋ ಮೂಲಕ ಪ್ರಯಾಣ; ಜಾರದಂತಹ ಶೂ ಧರಿಸಿ.',
    monumentId: 'siddhankolla-gorge',
    highlights: ['Perennial Waterfall', 'Sacred Rock Pool', 'Ancient Cave Shrine'],
  },
  {
    id: 'bilgi',
    name: 'Bilgi 16th-Century Stepwell (Arebhavanavi)',
    nameKn: 'ಬಿಳಿಗಿ ಅರೆಭಾವನಾವಿ ಮೆಟ್ಟಿಲು ಬಾವಿ',
    distanceFromBadami: '32 km North',
    transitTime: '45 mins',
    roadCondition: 'Smooth Bagalkote State Highway',
    roadConditionKn: 'ಸುಗಮ ರಾಜ್ಯ ಹೆದ್ದಾರಿ',
    transitTip: 'Combine on your return trip towards Bijapur or Almatti.',
    transitTipKn: 'ವಿಜಯಪುರ ಅಥವಾ ಆಲಮಟ್ಟಿಗೆ ಹೋಗುವ ಮಾರ್ಗದಲ್ಲಿ ಭೇಟಿ ನೀಡಿ.',
    monumentId: 'bilgi-arebhavanavi',
    highlights: ['Bilingual Kannada-Persian Inscription', 'Arched Pavilions', 'Natural Cooling Baoli'],
  },
  {
    id: 'guledgudda-fort',
    name: 'Guledgudda Hill Fort & Khana Pit-Looms',
    nameKn: 'ಗುಳೇದಗುಡ್ಡ ಬೆಟ್ಟದ ಕೋಟೆ & ಖಣ ನೇಕಾರಿಕೆ',
    distanceFromBadami: '24 km East',
    transitTime: '38 mins',
    roadCondition: 'Scenic road across sandstone ridge',
    roadConditionKn: 'ಕಣಿವೆಯ ಸುಂದರ ರಸ್ತೆ',
    transitTip: 'Visit fort bastions in late afternoon for 360-degree sunset, then tour weavers in town.',
    transitTipKn: 'ಸಂಜೆ ಸೂರ್ಯಾಸ್ತಕ್ಕೆ ಕೋಟೆ ಹತ್ತಿ, ನಂತರ ಪಟ್ಟಣದ ನೇಕಾರರ ಮನೆಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ.',
    monumentId: 'guledgudda-fort',
    highlights: ['360° Valley Panorama', 'Stone Bastions', 'GI Khana Pit Looms'],
  },
  {
    id: 'bachinagudda',
    name: 'Bachinagudda Megalithic Ridge',
    nameKn: 'ಬಾಚಿನಗುಡ್ಡ ಪ್ರಾಗೈತಿಹಾಸಿಕ ಬೆಟ್ಟ',
    distanceFromBadami: '24 km (3 km from Pattadakal)',
    transitTime: '5 mins from Pattadakal',
    roadCondition: 'Village unpaved footpath',
    roadConditionKn: 'ಗ್ರಾಮೀಣ ಮಣ್ಣಿನ ಕಾಲುದಾರಿ',
    transitTip: 'Walk up for sunrise directly overlooking the Pattadakal temple towers.',
    transitTipKn: 'ಪಟ್ಟದಕಲ್ಲಿನ ದೇವಾಲಯಗಳನ್ನು ಮೇಲಿನಿಂದ ನೋಡಲು ಮುಂಜಾನೆ ಭೇಟಿ ನೀಡಿ.',
    monumentId: 'bachinagudda-megalithic',
    highlights: ['3,000-Year-Old Dolmens', 'Surya Shrine', 'Aerial Pattadakal View'],
  },
];

export interface PackingItem {
  id: string;
  name: string;
  nameKn: string;
  reason: string;
  reasonKn: string;
  category: 'Footwear' | 'Clothing' | 'Gear' | 'Cash & Health';
}

export const EXPEDITION_PACKING_ITEMS: PackingItem[] = [
  {
    id: 'slip-on-shoes',
    name: 'Slip-on Shoes / Sandals with Grip',
    nameKn: 'ಜಾರದಿರುವ ಸ್ಲಿಪ್-ಆನ್ ಪಾದರಕ್ಷೆಗಳು',
    reason: 'Frequent shoe removal at sanctums plus rock stair climbing in Badami.',
    reasonKn: 'ದೇವಾಲಯಗಳ ಗರ್ಭಗುಡಿಗಳಲ್ಲಿ ಪಾದರಕ್ಷೆ ಬಿಡಲು ಮತ್ತು ಮೆಟ್ಟಿಲು ಏರಲು ಸುಲಭ.',
    category: 'Footwear',
  },
  {
    id: 'sun-hat',
    name: 'Wide-Brim Sun Hat & UV Sunglasses',
    nameKn: 'ಬಿಸಿಲಿನ ಟೋಪಿ ಮತ್ತು ಕೂಲಿಂಗ್ ಗ್ಲಾಸ್',
    reason: 'High solar radiation and glare reflecting from red sandstone plateau.',
    reasonKn: 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಿಸಿಲು ಮತ್ತು ಹೊಳಪಿನಿಂದ ರಕ್ಷಣೆಗಾಗಿ.',
    category: 'Gear',
  },
  {
    id: 'water-bottle',
    name: 'Stainless Steel Water Flask (1.5L+)',
    nameKn: 'ಮರುಬಳಕೆಯ ನೀರಿನ ಬಾಟಲ್',
    reason: 'Stay hydrated during 200+ step climbs; free RO purified water stations at ASI gates.',
    reasonKn: 'ಮೆಟ್ಟಿಲು ಏರುವಾಗ ದೇಹಕ್ಕೆ ನೀರಿನ ಅಗತ್ಯ ಹೆಚ್ಚು; ಎಎಸ್‌ಐ ಪ್ರವೇಶದಲ್ಲಿ ನೀರು ಲಭ್ಯ.',
    category: 'Gear',
  },
  {
    id: 'cash-notes',
    name: 'Small Cash Currency (₹500 in ₹20/₹50/₹100)',
    nameKn: 'ಚಿಲ್ಲರೆ ನಗದು ಹಣ',
    reason: 'Rural Khanavalis, roadside tender coconuts & auto drivers often have UPI network blindspots.',
    reasonKn: 'ಗ್ರಾಮೀಣ ಖಾನಾವಳಿಗಳು, ಎಳನೀರು ಮತ್ತು ಆಟೋಗಳಿಗೆ ಯುಪಿಐ ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆ ಇರಬಹುದು.',
    category: 'Cash & Health',
  },
  {
    id: 'cotton-wear',
    name: 'Breathable Modest Cotton Clothing',
    nameKn: 'ಹತ್ತಿ ಬಟ್ಟೆಗಳು',
    reason: 'Temple decorum requires covered shoulders & knees; cotton stays cool in dry heat.',
    reasonKn: 'ದೇವಾಲಯಗಳ ಸಂಪ್ರದಾಯಕ್ಕೆ ಸೂಕ್ತವಾದ ಸೌಮ್ಯ ಹತ್ತಿ ಉಡುಪುಗಳು.',
    category: 'Clothing',
  },
  {
    id: 'camera-optics',
    name: 'Camera with Telephoto or Zoom Lens',
    nameKn: 'ಕ್ಯಾಮೆರಾ / ಜೂಮ್ ಲೆನ್ಸ್',
    reason: 'Capturing ceiling brackets (Surasundaris), flying Gandharvas & distant canyon ramparts.',
    reasonKn: 'ಗುಹೆಗಳ ಮೇಲ್ಛಾವಣಿಯ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳು ಮತ್ತು ಹಾರುವ ಗಂಧರ್ವರ ಶಿಲ್ಪಗಳನ್ನು ಸೆರೆಹಿಡಿಯಲು.',
    category: 'Gear',
  },
];

export function getDefaultItinerary(
  daysCount: number = 2,
  interests: string[] = ['Architecture', 'History'],
  pace: 'relaxed' | 'moderate' | 'active' = 'moderate',
  archetypeId: string = 'archaeologist',
  language: 'en' | 'kn' = 'en'
): ItineraryPlan {
  const isOneDay = daysCount === 1;
  const isThreeDay = daysCount === 3;
  const hasHandloom = interests.includes('Handlooms');
  const hasSpiritual = interests.includes('Spiritual');
  const hasNature = interests.includes('Nature');

  // Day 1 Activities
  const day1Activities: ItineraryActivity[] = [
    {
      id: 'd1-caves',
      time: '07:30 AM',
      title: 'Morning Ascent: Badami Cave Temples 1 to 4',
      titleKn: 'ಬೆಳಗಿನ ವೀಕ್ಷಣೆ: ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು ೧ ರಿಂದ ೪',
      location: 'Badami Southern Hills',
      description:
        'Witness the 18-armed dancing Shiva Nataraja in Cave 1 lit by soft morning rays, followed by the colossal Trivikrama in Cave 2, Varaha in Cave 3, and Jain Tirthankaras in Cave 4.',
      descriptionKn:
        'ಗುಹೆ ೧ ರಲ್ಲಿ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ವೀಕ್ಷಣೆ, ನಂತರ ಗುಹೆ ೨, ೩ ಹಾಗೂ ೪ ರ ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಯ ದರ್ಶನ.',
      insiderTip: 'Start early to avoid the afternoon sun and monkey mischief on steps.',
      photoSpotTip: 'Sunrise light directly illuminates Cave 1 Nataraja and Cave 3 Varaha until 9:15 AM.',
      crowdLevel: 'Low & Serene',
      difficulty: 'Moderate Steps',
      durationMins: 110,
      monumentId: 'badami-caves',
      alternativeOptions: [
        {
          id: 'alt-badami-canyon',
          title: 'Badami Sandstone Canyon & Rock Climbers Boulder Path',
          titleKn: 'ಬಾದಾಮಿ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಣಿವೆ ಹಾದಿ',
          location: 'South Cliff Ravine',
          description: 'A quiet boulder path winding behind the cave cliffs where world rock-climbers test Deccan sandstone cracks.',
          descriptionKn: 'ಬಂಡೆ ಹತ್ತುವ ಸಾಹಸಿಗರ ನೆಚ್ಚಿನ ಕಣಿವೆ ಮಾರ್ಗ ಮತ್ತು ಪ್ರಾಚೀನ ಮರಳುಗಲ್ಲಿನ ನೈಸರ್ಗಿಕ ಹಾದಿ.',
          insiderTip: 'Incredible acoustics and shade even at mid-morning.',
          monumentId: 'badami-caves',
        },
      ],
    },
    {
      id: 'd1-museum',
      time: '11:00 AM',
      title: hasNature
        ? 'Badami North Sandstone Bluffs & Canyon Trail'
        : 'Badami Archaeological Museum & North Fort Trail',
      titleKn: hasNature
        ? 'ಬಾದಾಮಿ ಉತ್ತರ ಕೆಂಪು ಬಂಡೆಗಳ ಕಣಿವೆ ಮಾರ್ಗ'
        : 'ಬಾದಾಮಿ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ & ಉತ್ತರ ಕೋಟೆ',
      location: 'Near Bhootanatha Complex',
      description: hasNature
        ? 'Hike along scenic sandstone canyons with dramatic geological formations, prehistoric rock shelters, and panoramic views of Agastya lake.'
        : 'Explore 7th-century Lajja Gauri sculptures, architectural fragments, and ancient cannons atop the sandstone crag.',
      descriptionKn: hasNature
        ? 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸುಂದರ ನೋಟ ಮತ್ತು ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ನೈಸರ್ಗಿಕ ಬಂಡೆಗಳ ನಡುವೆ ಹೈಕಿಂಗ್.'
        : 'ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಅಪರೂಪದ ಶಿಲ್ಪಗಳು ಮತ್ತು ಉತ್ತರ ಕೋಟೆಯ ಐತಿಹಾಸಿಕ ತಾಣ.',
      insiderTip: 'Carry a refillable water bottle; wear comfortable trail walking shoes.',
      photoSpotTip: 'Vantage point from the North Fort gate looks over the turquoise waters of Agastya lake.',
      crowdLevel: 'Moderate',
      difficulty: hasNature ? 'Uphill Scramble' : 'Easy Stroll',
      durationMins: 75,
      monumentId: 'bhootanatha-badami',
      alternativeOptions: [
        {
          id: 'alt-upper-shivalaya',
          title: 'Upper Shivalaya Cliff Ascent & Chalukyan Watchtower',
          titleKn: 'ಮೇಲಿನ ಶಿವಾಲಯ ಮತ್ತು ಚಾಲುಕ್ಯರ ಕಾವಲು ಗೋಪುರ',
          location: 'North Fort Pinnacle',
          description: 'Climb ancient steps carved through a rock crevice to reach the 7th-century Upper Shivalaya overlooking the entire valley.',
          descriptionKn: 'ಬಂಡೆಗಳ ನಡುವೆ ಕೆತ್ತಲಾದ ಪ್ರಾಚೀನ ಮೆಟ್ಟಿಲುಗಳನ್ನು ಏರಿ ಬಾದಾಮಿ ಕಣಿವೆಯ ೩೬೦ ಡಿಗ್ರಿ ನೋಟ ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
          insiderTip: 'Breathtaking 360-degree panorama; windy at the peak.',
        },
      ],
    },
    {
      id: 'd1-lunch',
      time: '01:00 PM',
      title: 'Authentic Uttara Karnataka Jolada Rotti Lunch',
      titleKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ',
      location: 'Badami Heritage Circle',
      description:
        'Relish hot, wafer-thin Jolada Rotti served with Ennegayi (spiced baby brinjals), Shenga Chutney powder with fresh curd, and Ranjaka chilli paste.',
      descriptionKn: 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಹಾಗೂ ಮೊಸರು.',
      insiderTip: 'Wash down with freshly churned spiced buttermilk (Majjige).',
      photoSpotTip: 'The colorful brass thali spread with roasted stuffed brinjals makes a mouthwatering food capture.',
      crowdLevel: 'Moderate',
      difficulty: 'Easy Stroll',
      durationMins: 60,
      alternativeOptions: [
        {
          id: 'alt-farmer-khanavali',
          title: 'Gramin Farmer Homestyle Lunch & Sajje Rotti',
          titleKn: 'ಗ್ರಾಮೀಣ ರೈತರ ಸಜ್ಜೆ ರೊಟ್ಟಿ ಮತ್ತು ಜುಣಕದ ವಡಿ',
          location: 'Station Road Khanavali',
          description: 'Authentic pearl millet flatbread (Sajje Rotti) with Junka, raw spring onions, and churned white butter.',
          descriptionKn: 'ಸಜ್ಜೆ ರೊಟ್ಟಿ, ಜುಣಕ, ಹಸಿ ಈರುಳ್ಳಿ ಹಾಗೂ ಬೆಣ್ಣೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಹಳ್ಳಿ ಊಟ.',
          insiderTip: 'Ask for fresh jaggery (Bella) after the fiery Ranjaka chutney.',
        },
      ],
    },
    {
      id: 'd1-sunset',
      time: '04:30 PM',
      title: 'Bhootanatha Temples & Agastya Lake Golden Hour',
      titleKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಸೂರ್ಯಾಸ್ತ',
      location: 'Eastern Edge of Agastya Lake',
      description:
        'Capture reflections of 7th-century sandstone shrines projecting into the tranquil waters of Agastya Tirtha as the sun dips behind the cliffs.',
      descriptionKn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಭೂತನಾಥ ದೇವಾಲಯದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ಪ್ರತಿಬಿಂಬ.',
      insiderTip: 'The steps leading down to the lake offer the best panoramic photograph angle in all of Karnataka.',
      photoSpotTip: 'Best mirror reflection angle is from 5:00 PM to 5:45 PM on the south stone ghat.',
      crowdLevel: 'Golden Hour Peak',
      difficulty: 'Easy Stroll',
      durationMins: 90,
      monumentId: 'bhootanatha-badami',
      alternativeOptions: [
        {
          id: 'alt-bhootanatha-boulder',
          title: 'Agastya East Boulder Rock Relinquish & Sunset Silhouette',
          titleKn: 'ಅಗಸ್ತ್ಯ ಪೂರ್ವ ಬಂಡೆಗಳ ಮೇಲಿನ ಸೂರ್ಯಾಸ್ತ',
          location: 'Behind Bhootanatha Sanctum',
          description: 'Sit atop the monolithic flat boulders behind the shrine to watch the entire red sandstone amphitheater turn deep crimson.',
          descriptionKn: 'ದೇವಾಲಯದ ಹಿಂಭಾಗದ ನೈಸರ್ಗಿಕ ಬಂಡೆಗಳ ಮೇಲೆ ಕುಳಿತು ಸೂರ್ಯಾಸ್ತದ ಸುವರ್ಣ ಕಾಂತಿಯನ್ನು ವೀಕ್ಷಿಸಿ.',
          insiderTip: 'Quiet spot away from the crowd on the ghat steps.',
        },
      ],
    },
  ];

  if (pace === 'active') {
    day1Activities.push({
      id: 'd1-night-bazaar',
      time: '06:30 PM',
      title: 'Evening Sandstone Stroll & Local Spiced Tea',
      titleKn: 'ಸಂಜೆಯ ಬಾದಾಮಿ ಬೀದಿಗಳಲ್ಲಿ ನಡಿಗೆ & ಮಸಾಲೆ ಚಹಾ',
      location: 'Badami Old Bazaar',
      description: 'Stroll through the old bazaar lined with sandstone houses, stone carvings, and taste authentic Badami masala chai.',
      descriptionKn: 'ಪ್ರಾಚೀನ ಬಾದಾಮಿಯ ಗಲ್ಲಿಗಳಲ್ಲಿ ನಡಿಗೆ ಮತ್ತು ಬಿಸಿ ಮಸಾಲೆ ಚಹಾದ ರುಚಿ.',
      insiderTip: 'Pick up locally grown roasted groundnuts from street vendors.',
      photoSpotTip: 'Atmospheric twilight street lanterns reflecting on ancient stone shop fronts.',
      crowdLevel: 'Moderate',
      difficulty: 'Easy Stroll',
      durationMins: 45,
    });
  }

  const day1 = {
    dayNumber: 1,
    theme: hasSpiritual
      ? 'Sacred Sandstone Sanctuaries & Agastya Tirtha'
      : 'Monolithic Cave Wonders & Agastya Lake Sunset',
    themeKn: hasSpiritual
      ? 'ಪವಿತ್ರ ಮರಳುಗಲ್ಲಿನ ಸನ್ನಿಧಿಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ತೀರ್ಥ'
      : 'ಕಲ್ಲಿನ ಗುಹೆಗಳ ಅದ್ಭುತ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತ',
    activities: day1Activities,
    recommendedMeal: {
      place: 'Shri Banashankari Lingayat Khanavali, Station Road',
      dish: 'Unlimited Jolada Rotti Meal with Yennegayi & Shenga Holige',
      dishKn: 'ಅನ್‌ಲಿಮಿಟೆಡ್ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಮತ್ತು ಶೇಂಗಾ ಹೋಳಿಗೆ',
    },
  };

  // Day 2 Activities
  const day2Activities: ItineraryActivity[] = [
    {
      id: 'd2-pattadakal',
      time: '08:30 AM',
      title: 'Pattadakal UNESCO World Heritage Complex',
      titleKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ಸಂಕೀರ್ಣ',
      location: 'Pattadakal (22 km from Badami)',
      description:
        'Tour the monumental Virupaksha Temple, Mallikarjuna, and Sangameshwara temples along the Malaprabha River. Marvel at the synthesis of Nagara and Dravidian architectural towers.',
      descriptionKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳ ಶಿಲ್ಪ ವೈಭವ.',
      insiderTip: 'Check the ceiling of Virupaksha Temple for Surya riding his seven-horse chariot.',
      photoSpotTip: 'Frame the Nagara tower of Kadasiddheshwara beside the Dravida tower of Virupaksha from the south lawn.',
      crowdLevel: 'Low & Serene',
      difficulty: 'Easy Stroll',
      durationMins: 120,
      monumentId: 'pattadakal-unesco',
      alternativeOptions: [
        {
          id: 'alt-pattadakal-river-bank',
          title: 'Malaprabha River Sand Ghats & Papanatha Temple Walk',
          titleKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರ ಮತ್ತು ಪಾಪನಾಥ ದೇಗುಲದ ಹಾದಿ',
          location: 'South river bank, Pattadakal',
          description: 'Walk along the river bank to the standalone Papanatha temple decorated with scenes from Ramayana.',
          descriptionKn: 'ಮಲಪ್ರಭಾ ನದಿಯ ತಟದಲ್ಲಿ ರಾಮಾಯಣದ ಕೆತ್ತನೆಗಳುಳ್ಳ ಪಾಪನಾಥ ದೇವಾಲಯದ ವೀಕ್ಷಣೆ.',
          insiderTip: 'Peaceful river breeze and fewer visitors than the main lawn.',
        },
      ],
    },
    {
      id: 'd2-aihole-or-handloom',
      time: '12:00 PM',
      title: hasHandloom
        ? 'Ilkal Weavers Cooperative Colony & Kasuti Guild'
        : 'Aihole: Durga Temple & Ravana Phadi Cave',
      titleKn: hasHandloom
        ? 'ಇಳಕಲ್ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ & ಕಸೂತಿ ಕರಕುಶಲ ಕೇಂದ್ರ'
        : 'ಐಹೊಳೆ: ಅಪರೂಪದ ಗಜಪೃಷ್ಠ ದುರ್ಗಾ ದೇವಾಲಯ ಮತ್ತು ರಾವಣ ಫಡಿ ಗುಹೆ',
      location: hasHandloom ? 'Ilkal Town' : 'Aihole (14 km from Pattadakal)',
      description: hasHandloom
        ? 'Witness master artisans weave the GI-tagged Topetenwe silk pallu using the ancient Kondi interlocking technique on traditional wooden pit looms.'
        : 'Investigate the famous apsidal (horseshoe-shaped) Durga temple, the Lad Khan temple, and the exquisite rock-cut Ravana Phadi shrine.',
      descriptionKn: hasHandloom
        ? 'ಕೊಂಡಿ ಗಂಟು ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ಶುದ್ಧ ರೇಷ್ಮೆ ಸೀರೆ ನೇಯುವ ಪ್ರಾಚೀನ ಕಲೆಯ ವೀಕ್ಷಣೆ ಮತ್ತು ನೇರ ಖರೀದಿ.'
        : 'ಗಜಪೃಷ್ಠ ಆಕಾರದ ದುರ್ಗಾ ದೇವಾಲಯ, ಲಾಡ್ ಖಾನ್ ದೇಗುಲ ಹಾಗೂ ರಾವಣಫಡಿ ಗುಹೆಗಳ ವೀಕ್ಷಣೆ.',
      insiderTip: hasHandloom
        ? 'Always look for the official Handloom Mark and Silk Mark labels when purchasing.'
        : 'Aihole has over 120 temples dating back to 450 CE spread across village fields.',
      photoSpotTip: hasHandloom
        ? 'Loom rhythm capture with crimson silk warp threads catching side window light.'
        : 'The curved open colonnade of Durga Temple offers stunning light-and-shadow architectural frames.',
      crowdLevel: 'Moderate',
      difficulty: 'Easy Stroll',
      durationMins: 90,
      monumentId: hasHandloom ? undefined : 'aihole-cradle',
      alternativeOptions: [
        {
          id: 'alt-ravana-phadi',
          title: 'Ravana Phadi 6th-Century Rock Cave & Meguti Hilltop',
          titleKn: 'ರಾವಣ ಫಡಿ ಗುಹೆ ಮತ್ತು ಮೇಗುತಿ ಬೆಟ್ಟದ ಶಾಸನ',
          location: 'Aihole North Fields',
          description: 'Marvel at 10-armed Nataraja in this rock-cut sanctum, then ascend to Meguti Jain Temple for Ravikirti’s 634 CE Pulakeshin II tablet.',
          descriptionKn: 'ರಾವಣಫಡಿ ಗುಹೆಯ ೧೦ ತೋಳುಗಳ ನಟರಾಜ ಮತ್ತು ಮೇಗುತಿ ಬೆಟ್ಟದ ಮೇಲಿರುವ ಪುಲಕೇಶಿ ರಾಜನ ಶಾಸನ.',
          insiderTip: 'The view from Meguti hill shows the entire Aihole valley studded with dozens of temple spires.',
        },
      ],
    },
    {
      id: 'd2-mahakuta',
      time: '03:30 PM',
      title: 'Sacred Forest Springs of Mahakuta',
      titleKn: 'ಮಹಾಕೂಟದ ಪವಿತ್ರ ನೀರಿನ ಬುಗ್ಗೆ ಮತ್ತು ಪುಷ್ಕರಣಿ',
      location: 'Mahakuta Glen (near Badami)',
      description:
        'Walk through lush banyan groves surrounding the pristine Vishnu Pushkarini natural spring pool, where a submerged four-faced Shiva Linga presides.',
      descriptionKn: 'ಹಸಿರು ಮರಗಳ ನೆರಳಿನಲ್ಲಿರುವ ಮಹಾಕೂಟದ ವಿಷ್ಣು ಪುಷ್ಕರಣಿ ಮತ್ತು ಪಂಚಮುಖ ಲಿಂಗ ದರ್ಶನ.',
      insiderTip: 'A serene place to meditate away from tourist crowds.',
      photoSpotTip: 'Sunlight filtering through centuries-old banyan aerial roots directly onto the temple pushkarini.',
      crowdLevel: 'Low & Serene',
      difficulty: 'Easy Stroll',
      durationMins: 60,
      monumentId: 'mahakuta-springs',
      alternativeOptions: [
        {
          id: 'alt-banashankari-stop',
          title: 'Banashankari Amma Temple & Haridra Tirtha',
          titleKn: 'ಬನಶಂಕರಿ ದೇವಾಲಯ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ',
          location: 'Cholachagudd (5 km from Badami)',
          description: 'Visit the historic temple of Goddess Shakambhari surrounded by tiered sandstone deepa-stambhas.',
          descriptionKn: 'ಚಾಲುಕ್ಯರ ಕುಲದೇವಿ ಬನಶಂಕರಿ ಸನ್ನಿಧಿ ಮತ್ತು ಪ್ರಾಚೀನ ದೀಪಸ್ತಂಭಗಳ ವೀಕ್ಷಣೆ.',
          insiderTip: 'Taste hot local mirchi bajji and puffed rice (Girmit) right outside the temple gates.',
          monumentId: 'banashankari-temple',
        },
      ],
    },
  ];

  const day2 = {
    dayNumber: 2,
    theme: hasHandloom
      ? 'UNESCO World Heritage & Living Ilkal Handloom Guilds'
      : 'Cradle of Architecture & UNESCO World Heritage',
    themeKn: hasHandloom
      ? 'ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ಪರಂಪರೆ'
      : 'ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಕಲಾಶಾಲೆ',
    activities: day2Activities,
    recommendedMeal: {
      place: 'Pattadakal Heritage Canteen / Badami Courtyard',
      dish: 'Girmit, Mirchi Bajji, and Fresh Sugarcane Juice',
      dishKn: 'ಗರಂ ಗಿರ್ಮಿಟ್, ಬಿಸಿ ಮಿರ್ಚಿ ಬಜ್ಜಿ ಹಾಗೂ ಕಬ್ಬಿನ ಹಾಲು',
    },
  };

  // Day 3 Activities
  const day3Activities: ItineraryActivity[] = [
    {
      id: 'd3-banashankari',
      time: '08:00 AM',
      title: 'Banashankari Amma Temple & Haridra Tirtha',
      titleKn: 'ಬನಶಂಕರಿ ದೇವಿ ಸನ್ನಿಧಿ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ ಕಲ್ಯಾಣಿ',
      location: 'Cholachagudd (5 km from Badami)',
      description:
        'Seek blessings from the guardian deity of the Chalukyas and admire the ancient three-tiered lamp towers encircling the Haridra Tirtha lake.',
      descriptionKn: 'ಚಾಲುಕ್ಯರ ಕುಲದೇವತೆ ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದರ್ಶನ ಮತ್ತು ಪುರಾತನ ದೀಪಸ್ತಂಭಗಳ ವೀಕ್ಷಣೆ.',
      insiderTip: 'Taste the special sweet offerings (Prasada) prepared fresh daily.',
      photoSpotTip: 'The reflection of the multi-tiered lamp tower in Haridra Tirtha waters in crisp morning air.',
      crowdLevel: 'Moderate',
      difficulty: 'Easy Stroll',
      durationMins: 60,
      monumentId: 'banashankari-temple',
      alternativeOptions: [
        {
          id: 'alt-shivayogi-mandir',
          title: 'Shivayogi Mandir Spiritual Hermitage',
          titleKn: 'ಶಿವಯೋಗಿ ಮಂದಿರ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರ',
          location: 'Near Badami Riverbank',
          description: 'A tranquil riverbank ashram established in 1909 for Vedic scholarship and Lingayat meditation.',
          descriptionKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ಶಾಂತಿಯುತ ಆಶ್ರಮ ಮತ್ತು ವೇದ ಅಧ್ಯಯನ ಕೇಂದ್ರ.',
          insiderTip: 'Peaceful garden walks and free spiritual library.',
        },
      ],
    },
    {
      id: 'd3-kudalasangama',
      time: '11:00 AM',
      title: 'Kudalasangama: Sangameshwara & Aikya Mantapa',
      titleKn: 'ಕೂಡಲಸಂಗಮ: ಸಂಗಮನಾಥ ಮತ್ತು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ',
      location: 'Krishna-Malaprabha River Sangama',
      description:
        'Visit the sacred confluence where Saint Basaveshwara attained Mahasamadhi. Explore the cylindrical river-well protection structure and the modern Basava International Centre.',
      descriptionKn: 'ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ಸಂಗಮ ಹಾಗೂ ಜಗದ್ಗುರು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪದ ದರ್ಶನ.',
      insiderTip: 'A boat ride along the sangama offers soothing breeze and panoramic river views.',
      photoSpotTip: 'The river confluence view from the cylindrical glass walkway overlooking the submerged shrine.',
      crowdLevel: 'Moderate',
      difficulty: 'Easy Stroll',
      durationMins: 120,
      monumentId: 'kudalasangama-aikya',
      alternativeOptions: [
        {
          id: 'alt-almatti-dam',
          title: 'Almatti Dam Garden & Musical Fountains',
          titleKn: 'ಆಲಮಟ್ಟಿ ಜಲಾಶಯ ಮತ್ತು ಮೊಘಲ್ ಉದ್ಯಾನ',
          location: 'Almatti (35 km from Kudalasangama)',
          description: 'Sprawling Mughal gardens with rock gardens, boating, and panoramic views of the massive Krishna reservoir.',
          descriptionKn: 'ಕೃಷ್ಣಾ ನದಿಯ ಬೃಹತ್ ಜಲಾಶಯ, ಸುಂದರ ಉದ್ಯಾನ ಮತ್ತು ಬೋಟಿಂಗ್.',
          insiderTip: 'Musical dancing fountain starts around 6:30 PM.',
        },
      ],
    },
    {
      id: 'd3-ilkal',
      time: '03:00 PM',
      title: 'Ilkal Handloom Colony & Kasuti Embroidery Collective',
      titleKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ಕಾಲೋನಿ ಮತ್ತು ಕಸೂತಿ ಕರಕುಶಲ ಕೇಂದ್ರ',
      location: 'Ilkal Town (30 km from Kudalasangama)',
      description:
        'Visit traditional pit-loom workshops to watch artisans weave the patented Topetenwe silk pallu. Shop directly from cooperative weavers without mediator markups.',
      descriptionKn: 'ಪ್ರಾಚೀನ ಕೈಮಗ್ಗಗಳಲ್ಲಿ ತೊಪೆತೆನೆ ರೇಷ್ಮೆ ಸೀರೆ ನೇಯುವ ಕೌಶಲ್ಯ ವೀಕ್ಷಣೆ ಮತ್ತು ನೇರ ಖರೀದಿ.',
      insiderTip: 'Look for official Silk Mark and Handloom Mark tags on authentic Ilkal sarees.',
      photoSpotTip: 'Artisan hands skillfully guiding shuttle bobbin across colorful silk warp yarns.',
      crowdLevel: 'Low & Serene',
      difficulty: 'Easy Stroll',
      durationMins: 90,
      alternativeOptions: [
        {
          id: 'alt-guledgudda-khana',
          title: 'Guledgudda Khana Heritage Blouse Weaving Guild',
          titleKn: 'ಗುಳೇದಗುಡ್ಡ ಖಣ ನೇಕಾರರ ಪಾರಂಪರಿಕ ಸಂಘ',
          location: 'Guledgudda (between Badami & Ilkal)',
          description: 'The sole dedicated traditional hub for hand-woven pure cotton Khana fabric with geometric folk motifs.',
          descriptionKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಖಣದ ಬಟ್ಟೆ ನೇಯುವ ಭಾರತದ ಏಕೈಕ ಪಾರಂಪರಿಕ ಪಟ್ಟಣ.',
          insiderTip: 'Khana fabric pieces make unique, featherlight cultural gifts.',
        },
      ],
    },
  ];

  const day3 = {
    dayNumber: 3,
    theme: hasSpiritual
      ? 'Spiritual Confluence of Basaveshwara & Sacred Confluences'
      : 'Living Handloom Traditions & Confluence of Rivers',
    themeKn: hasSpiritual
      ? 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ'
      : 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ಪರಂಪರೆ',
    activities: day3Activities,
    recommendedMeal: {
      place: 'Basava Bhavana Dining Hall, Kudalasangama',
      dish: 'Prasada Oota: Jolada Rotti, Bele Saaru, Holige, and Payasa',
      dishKn: 'ದಾಸೋಹ ಪ್ರಸಾದ ಊಟ: ರೊಟ್ಟಿ, ಬೇಳೆ ಸಾರು, ಹೋಳಿಗೆ ಹಾಗೂ ಪಾಯಸ',
    },
  };

  const dynamicDays: ItineraryDay[] = [];
  for (let i = 1; i <= Math.min(daysCount, 7); i++) {
    if (i === 1) dynamicDays.push(day1);
    else if (i === 2) dynamicDays.push(day2);
    else if (i === 3) dynamicDays.push(day3);
    else if (i === 4) {
      dynamicDays.push({
        dayNumber: 4,
        theme: language === 'kn' ? 'ಗುಳೇದಗುಡ್ಡ ಖಾನಾ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲ ಗ್ರಾಮ' : 'Guledagudda Khana Weaving & Pottery Craft Village',
        themeKn: language === 'kn' ? 'ಗುಳೇದಗುಡ್ಡ ಖಾನಾ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲ ಗ್ರಾಮ' : 'Guledagudda Khana Weaving & Pottery Craft Village',
        activities: [
          {
            id: 'd4-guledagudda',
            time: '09:00 AM',
            title: language === 'kn' ? 'ಗುಳೇದಗುಡ್ಡ ಖಾನಾ ಬ್ಲೌಸ್ ಬಟ್ಟೆ ನೇಯುವ ಬೀದಿಗಳು' : 'Guledagudda Traditional Khana Weaving Alleys',
            titleKn: 'ಗುಳೇದಗುಡ್ಡ ಖಾನಾ ಬ್ಲೌಸ್ ಬಟ್ಟೆ ನೇಯುವ ಬೀದಿಗಳು',
            location: 'Guledagudda Town (20 km from Badami)',
            description: language === 'kn' ? 'ಸಾಂಪ್ರದಾಯಿಕ ಖಣದ ಬಟ್ಟೆಗಳನ್ನು ಕೈಯಿಂದ ನೇಯುವ ನೇಕಾರರ ಮನೆಗಳಿಗೆ ಭೇಟಿ ಮತ್ತು ನೇರ ಖರೀದಿ.' : 'Explore heritage handloom alleys where artisans weave geometric folk-motif Khana blouse fabrics.',
            descriptionKn: language === 'kn' ? 'ಸಾಂಪ್ರದಾಯಿಕ ಖಣದ ಬಟ್ಟೆಗಳನ್ನು ಕೈಯಿಂದ ನೇಯುವ ನೇಕಾರರ ಮನೆಗಳಿಗೆ ಭೇಟಿ ಮತ್ತು ನೇರ ಖರೀದಿ.' : 'Explore heritage handloom alleys where artisans weave geometric folk-motif Khana blouse fabrics.',
            insiderTip: 'Direct artisan purchase ensures 100% genuine GI-tagged weave.',
            crowdLevel: 'Low & Serene',
            difficulty: 'Easy Stroll',
            durationMins: 120,
          },
          {
            id: 'd4-pottery',
            time: '02:00 PM',
            title: language === 'kn' ? 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ಮಡಿಕೆ ಕುಶಲಕರ್ಮಿಗಳು' : 'Malaprabha Riverbank Terracotta Pottery Craft',
            titleKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ಮಡಿಕೆ ಕುಶಲಕರ್ಮಿಗಳು',
            location: 'Near Bagalkote Rural Belt',
            description: language === 'kn' ? 'ಪ್ರಾಚೀನ ಚಕ್ರದ ಮೇಲೆ ಮಡಿಕೆಗಳನ್ನು ತಯಾರಿಸುವ ಕರಕುಶಲಕರ್ಮಿಗಳೊಂದಿಗೆ ಸಂವಾದ.' : 'Experience ancient terracotta pottery wheel techniques along the Malaprabha river plains.',
            descriptionKn: language === 'kn' ? 'ಪ್ರಾಚೀನ ಚಕ್ರದ ಮೇಲೆ ಮಡಿಕೆಗಳನ್ನು ತಯಾರಿಸುವ ಕರಕುಶಲಕರ್ಮಿಗಳೊಂದಿಗೆ ಸಂವಾದ.' : 'Experience ancient terracotta pottery wheel techniques along the Malaprabha river plains.',
            insiderTip: 'Great opportunity for hands-on clay pottery trial.',
            crowdLevel: 'Low & Serene',
            difficulty: 'Easy Stroll',
            durationMins: 90,
          },
        ],
        recommendedMeal: {
          place: 'Guledagudda Heritage Bhojanalaya',
          dish: language === 'kn' ? 'ಜೋಳದ ರೊಟ್ಟಿ ಜತೆ ಎಣ್ಗಾಯಿ ಮತ್ತು ಗಿರಮಿಟ್' : 'Jowar Rotti with Stuffed Brinjal & Spicy Girmit',
          dishKn: 'ಜೋಳದ ರೊಟ್ಟಿ ಜತೆ ಎಣ್ಗಾಯಿ ಮತ್ತು ಗಿರಮಿಟ್',
        },
      });
    } else if (i === 5) {
      dynamicDays.push({
        dayNumber: 5,
        theme: language === 'kn' ? 'ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು ಮತ್ತು ಕೃಷ್ಣಾ ನದಿ ಉದ್ಯಾನ' : 'Almatti Dam, Gardens & Krishna River Eco-Park',
        themeKn: language === 'kn' ? 'ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು ಮತ್ತು ಕೃಷ್ಣಾ ನದಿ ಉದ್ಯಾನ' : 'Almatti Dam, Gardens & Krishna River Eco-Park',
        activities: [
          {
            id: 'd5-almatti',
            time: '10:00 AM',
            title: language === 'kn' ? 'ಆಲಮಟ್ಟಿ ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಜಲಾಶಯ' : 'Almatti Lal Bahadur Shastri Dam & Mughal Gardens',
            titleKn: 'ಆಲಮಟ್ಟಿ ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಜಲಾಶಯ & ಮುಘಲ್ ಉದ್ಯಾನ',
            location: 'Almatti Reservoir (35 km from Bagalkote)',
            description: language === 'kn' ? 'ಬೃಹತ್ ಕೃಷ್ಣಾ ಜಲಾಶಯ, ಸುಂದರ ಮುಘಲ್ ಉದ್ಯಾನವನಗಳು ಮತ್ತು ಹಸಿರು ಪರಿಸರದ ವೀಕ್ಷಣೆ.' : 'Marvel at the massive Krishna river hydroelectric dam, terraced Mughal gardens, and rock cascades.',
            descriptionKn: language === 'kn' ? 'ಬೃಹತ್ ಕೃಷ್ಣಾ ಜಲಾಶಯ, ಸುಂದರ ಮುಘಲ್ ಉದ್ಯಾನವನಗಳು ಮತ್ತು ಹಸಿರು ಪರಿಸರದ ವೀಕ್ಷಣೆ.' : 'Marvel at the massive Krishna river hydroelectric dam, terraced Mughal gardens, and rock cascades.',
            insiderTip: 'Musical fountain show begins at 6:30 PM.',
            crowdLevel: 'Moderate',
            difficulty: 'Easy Stroll',
            durationMins: 180,
          },
        ],
        recommendedMeal: {
          place: 'Almatti Lakeside Restaurant',
          dish: language === 'kn' ? 'ಉತ್ತರ ಕರ್ನಾಟಕ ವಿಶೇಷ ಮೀನು ಸಾರು ಮತ್ತು ಅನ್ನ' : 'North Karnataka Style River Fish Curry & Rice',
          dishKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ ವಿಶೇಷ ಮೀನು ಸಾರು ಮತ್ತು ಅನ್ನ',
        },
      });
    } else if (i === 6) {
      dynamicDays.push({
        dayNumber: 6,
        theme: language === 'kn' ? 'ಮಹಾಕೂಟ ಮತ್ತು ಬನಶಂಕರಿ ಆಧ್ಯಾತ್ಮಿಕ ಯಾತ್ರೆ' : 'Mahakuta & Banashankari Deep Spiritual Trail',
        themeKn: language === 'kn' ? 'ಮಹಾಕೂಟ ಮತ್ತು ಬನಶಂಕರಿ ಆಧ್ಯಾತ್ಮಿಕ ಯಾತ್ರೆ' : 'Mahakuta & Banashankari Deep Spiritual Trail',
        activities: [
          {
            id: 'd6-mahakuta',
            time: '09:00 AM',
            title: language === 'kn' ? 'ಮಹಾಕೂಟ ದೇವಸ್ಥಾನಗಳ ಸಂಕೀರ್ಣ ಮತ್ತು ಪವಿತ್ರ ಬುಗ್ಗೆಗಳು' : 'Mahakuta Temple Complex & Sacred Springs',
            titleKn: 'ಮಹಾಕೂಟ ದೇವಸ್ಥಾನಗಳ ಸಂಕೀರ್ಣ ಮತ್ತು ಪವಿತ್ರ ಬುಗ್ಗೆಗಳು',
            location: 'Mahakuta Glen',
            description: language === 'kn' ? 'ಪಂಚಮುಖಿ ಶಿವಲಿಂಗ ಮತ್ತು ವಿಷ್ಣು ಪುಷ್ಕರಣಿಯ ಪವಿತ್ರ ನೀರಿನಲ್ಲಿ ಶಾಂತಿ ಅನುಭವಿಸಿ.' : 'Explore the ancient glen of temples and submerged four-faced Shivalinga pool.',
            descriptionKn: language === 'kn' ? 'ಪಂಚಮುಖಿ ಶಿವಲಿಂಗ ಮತ್ತು ವಿಷ್ಣು ಪುಷ್ಕರಣಿಯ ಪವಿತ್ರ ನೀರಿನಲ್ಲಿ ಶಾಂತಿ ಅನುಭವಿಸಿ.' : 'Explore the ancient glen of temples and submerged four-faced Shivalinga pool.',
            insiderTip: 'Morning hours are extremely peaceful for meditation.',
            crowdLevel: 'Low & Serene',
            difficulty: 'Easy Stroll',
            durationMins: 120,
          },
        ],
        recommendedMeal: {
          place: 'Banashankari Temple Courtyard',
          dish: language === 'kn' ? 'ಬಿಸಿ ಮಿರ್ಚಿ ಬಜ್ಜಿ ಮತ್ತು ಮಸಾಲೆ ಚಹಾ' : 'Hot Mirchi Bajji & Spiced Chai',
          dishKn: 'ಬಿಸಿ ಮಿರ್ಚಿ ಬಜ್ಜಿ ಮತ್ತು ಮಸಾಲೆ ಚಹಾ',
        },
      });
    } else {
      dynamicDays.push({
        dayNumber: 7,
        theme: language === 'kn' ? 'ಬಾಗಲಕೋಟೆ ಸರ್ಕ್ಯೂಟ್ ವಿರಾಮ ಮತ್ತು ಸ್ಮರಣಿಕೆ ಖರೀದಿ' : 'Grand Finale: Heritage Souvenirs & Sunset Reflection',
        themeKn: language === 'kn' ? 'ಬಾಗಲಕೋಟೆ ಸರ್ಕ್ಯೂಟ್ ವಿರಾಮ ಮತ್ತು ಸ್ಮರಣಿಕೆ ಖರೀದಿ' : 'Grand Finale: Heritage Souvenirs & Sunset Reflection',
        activities: [
          {
            id: 'd7-finale',
            time: '10:00 AM',
            title: language === 'kn' ? 'ಬಾದಾಮಿ ಸ್ಮರಣಿಕೆಗಳು ಮತ್ತು ಕರಕುಶಲ ವಸ್ತುಗಳ ಖರೀದಿ' : 'Badami Handicrafts & Artisan Souvenir Fair',
            titleKn: 'ಬಾದಾಮಿ ಸ್ಮರಣಿಕೆಗಳು ಮತ್ತು ಕರಕುಶಲ ವಸ್ತುಗಳ ಖರೀದಿ',
            location: 'Badami Heritage Market',
            description: language === 'kn' ? 'ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳು, ಕೈಮಗ್ಗ ಸೀರೆಗಳು ಮತ್ತು ಸ್ಮರಣಿಕೆಗಳ ಖರೀದಿ.' : 'Collect authentic handloom fabrics, stone miniature carvings, and local handicrafts before departure.',
            descriptionKn: language === 'kn' ? 'ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳು, ಕೈಮಗ್ಗ ಸೀರೆಗಳು ಮತ್ತು ಸ್ಮರಣಿಕೆಗಳ ಖರೀದಿ.' : 'Collect authentic handloom fabrics, stone miniature carvings, and local handicrafts before departure.',
            insiderTip: 'Support direct artisan cooperatives.',
            crowdLevel: 'Moderate',
            difficulty: 'Easy Stroll',
            durationMins: 120,
          },
        ],
        recommendedMeal: {
          place: 'Badami Town Grand Khanavali',
          dish: language === 'kn' ? 'ಸಂಪೂರ್ಣ ಉತ್ತರ ಕರ್ನಾಟಕ ವಿಶೇಷ ಭೋಜನ' : 'Royal North Karnataka Thali Feast',
          dishKn: 'ಸಂಪೂರ್ಣ ಉತ್ತರ ಕರ್ನಾಟಕ ವಿಶೇಷ ಭೋಜನ',
        },
      });
    }
  }

  const archetype = EXPEDITION_ARCHETYPES.find((a) => a.id === archetypeId) || EXPEDITION_ARCHETYPES[0];

  return {
    title: isOneDay
      ? `${archetype.icon} Badami Express: Cave Sanctuaries & Heritage Sunset`
      : daysCount >= 3
      ? `${archetype.icon} Grand ${daysCount}-Day Bagalkote Heritage, Rivers & Silk Circuit`
      : hasHandloom
      ? `${archetype.icon} Chalukya Heritage & Living Ilkal Silk Trail`
      : `${archetype.icon} Classic Chalukya Circuit: Badami, Pattadakal & Aihole`,
    titleKn: isOneDay
      ? `${archetype.icon} ಬಾದಾಮಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್: ಗುಹಾ ದೇವಾಲಯಗಳು ಮತ್ತು ಸೂರ್ಯಾಸ್ತ`
      : daysCount >= 3
      ? `${archetype.icon} ಬಾಗಲಕೋಟೆಯ ಭವ್ಯ ${daysCount} ದಿನಗಳ ಚಾಲುಕ್ಯ, ನದಿ ಸಂಗಮ ಮತ್ತು ರೇಷ್ಮೆ ಯಾತ್ರೆ`
      : hasHandloom
      ? `${archetype.icon} ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಮತ್ತು ಇಳಕಲ್ ರೇಷ್ಮೆ ಯಾತ್ರೆ`
      : `${archetype.icon} ಕ್ಲಾಸಿಕ್ ಚಾಲುಕ್ಯ ಸರ್ಕ್ಯೂಟ್: ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ`,
    summary: isOneDay
      ? `A curated 1-day expedition tailored for the ${archetype.name} exploring Badami's 6th-century rock-cut cave temples, North Fort, archaeological museum, and sunset over Agastya Lake at a ${pace} pace.`
      : `A comprehensive ${daysCount}-day expedition designed for the ${archetype.name} covering rock-cut caves, UNESCO World Heritage monuments, Aihole architecture cradle, sacred Kudalasangama confluence, and GI-tagged Ilkal handloom weavers.`,
    summaryKn: isOneDay
      ? `${archetype.nameKn}ರಿಗೆ ಅನುಗುಣವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಬಾದಾಮಿಯ ೬ನೇ ಶತಮಾನದ ಗುಹಾ ದೇವಾಲಯಗಳು, ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತದ ೧ ದಿನದ ಪ್ರವಾಸ.`
      : `${archetype.nameKn}ರಿಗೆ ಅನುಗುಣವಾಗಿ ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಕೂಡಲಸಂಗಮ ಸಂಗಮ ಕ್ಷೇತ್ರ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಕಾರರ ಸಂಘಗಳನ್ನು ಒಳಗೊಂಡ ಸಂಪೂರ್ಣ ${daysCount} ದಿನಗಳ ಯಾತ್ರೆ.`,
    totalDistanceKm: daysCount * 55,
    recommendedTransport: isOneDay
      ? 'Tourist Auto Rickshaw or Walking Trail'
      : 'Private Cab or Tourist Auto / KSRTC Heritage Shuttle',
    days: dynamicDays,
    proTips: [
      'Slip-on shoes are ideal: You will remove footwear at multiple sanctums and temple platforms.',
      'Carry cash (₹500-1000 in small ₹20/50 notes) for local auto rickshaws, fresh coconut water & rural khanavalis.',
      'Peak photography window: 07:00 AM to 09:30 AM for cave facades, and 04:45 PM to 06:15 PM for Agastya lake golden reflections.',
      'ASI QR ticketing: Book entrance online or scan gate QR codes to bypass ticket counter queues.',
    ],
    archetypeId,
  };
}
