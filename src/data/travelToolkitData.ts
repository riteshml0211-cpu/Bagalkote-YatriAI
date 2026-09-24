import { Language } from '../types';

export interface TravelPhrase {
  id: string;
  category: 'transport' | 'dining' | 'shopping' | 'monuments' | 'basics';
  categoryLabelEn: string;
  categoryLabelKn: string;
  categoryIcon: string;
  english: string;
  kannada: string;
  transliteration: string; // Phonetic guide for travelers
  contextEn: string;
  contextKn: string;
}

export interface GoldenHourSlot {
  timeRange: string;
  period: 'early_morning' | 'mid_morning' | 'midday_heat' | 'late_afternoon' | 'sunset';
  titleEn: string;
  titleKn: string;
  tempEstimate: string;
  heatLevel: 'cool' | 'moderate' | 'high_heat' | 'pleasant';
  recommendationEn: string;
  recommendationKn: string;
  bestLocationsEn: string[];
  bestLocationsKn: string[];
  photoTipEn: string;
  photoTipKn: string;
  mustAvoidEn: string;
  mustAvoidKn: string;
}

export interface EmergencyContact {
  id: string;
  titleEn: string;
  titleKn: string;
  phone: string;
  descriptionEn: string;
  descriptionKn: string;
  badge: string;
}

export interface BusRouteInfo {
  routeEn: string;
  routeKn: string;
  frequency: string;
  duration: string;
  approxFare: string;
  type: string;
}

export const TRAVEL_PHRASES: TravelPhrase[] = [
  // 1. Auto & Transport
  {
    id: 'tp-1',
    category: 'transport',
    categoryLabelEn: 'Auto & Transport',
    categoryLabelKn: 'ಆಟೋ & ಸಾರಿಗೆ',
    categoryIcon: '🛺',
    english: 'How much to go to Badami Cave Temples?',
    kannada: 'ಬಾದಾಮಿ ಗುಹೆಗಳಿಗೆ ಎಷ್ಟು ರೂಪಾಯಿ?',
    transliteration: 'Badami guhegalige eshtu roopayi?',
    contextEn: 'Use when bargaining with auto rickshaw drivers at Badami railway station or bus stand.',
    contextKn: 'ಬಾದಾಮಿ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲಿ ಆಟೋ ಚಾಲಕರೊಂದಿಗೆ ದರ ಕೇಳುವಾಗ.',
  },
  {
    id: 'tp-2',
    category: 'transport',
    categoryLabelEn: 'Auto & Transport',
    categoryLabelKn: 'ಆಟೋ & ಸಾರಿಗೆ',
    categoryIcon: '🛺',
    english: 'Will you go by meter or fixed rate?',
    kannada: 'ಮೀಟರ್ ಪ್ರಕಾರ ಹೋಗುತ್ತೀರಾ ಅಥವಾ ಫಿಕ್ಸ್ ದರವೇ?',
    transliteration: 'Meter prakara hogutteera athava fixed darave?',
    contextEn: 'Helpful when clarifying local taxi/auto pricing.',
    contextKn: 'ಆಟೋ ಅಥವಾ ಟ್ಯಾಕ್ಸಿ ದರವನ್ನು ಸ್ಪಷ್ಟಪಡಿಸಿಕೊಳ್ಳುವಾಗ.',
  },
  {
    id: 'tp-3',
    category: 'transport',
    categoryLabelEn: 'Auto & Transport',
    categoryLabelKn: 'ಆಟೋ & ಸಾರಿಗೆ',
    categoryIcon: '🛺',
    english: 'Please wait here for 1 hour, I will return.',
    kannada: 'ದಯವಿಟ್ಟು ಇಲ್ಲೇ ೧ ಗಂಟೆ ಕಾಯಿರಿ, ನಾನು ವಾಪಸ್ ಬರುತ್ತೇನೆ.',
    transliteration: 'Dayavittu ille ondu gante kaayiri, naanu vaapas baruttene.',
    contextEn: 'Essential when your driver waits while you explore Bhootanatha or Mahakuta.',
    contextKn: 'ಭೂತನಾಥ ಅಥವಾ ಮಹಾಕೂಟ ವೀಕ್ಷಿಸುವಾಗ ಚಾಲಕರನ್ನು ಕಾಯಿಸಲು ಹೇಳುವಾಗ.',
  },
  {
    id: 'tp-4',
    category: 'transport',
    categoryLabelEn: 'Auto & Transport',
    categoryLabelKn: 'ಆಟೋ & ಸಾರಿಗೆ',
    categoryIcon: '🛺',
    english: 'Where is the bus to Pattadakal and Aihole?',
    kannada: 'ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಗೆ ಹೋಗುವ ಬಸ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'Pattadakallu mattu Aiholege hoguva bus ellide?',
    contextEn: 'Ask at the Badami KSRTC main bus stand.',
    contextKn: 'ಬಾದಾಮಿ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲಿ ವಿಚಾರಿಸುವಾಗ.',
  },

  // 2. Dining & Food
  {
    id: 'tp-5',
    category: 'dining',
    categoryLabelEn: 'Food & Dining',
    categoryLabelKn: 'ಊಟ & ಉಪಹಾರ',
    categoryIcon: '🍲',
    english: 'One plate authentic Jolada Rotti meal please.',
    kannada: 'ಒಂದು ಪ್ಲೇಟ್ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಕೊಡಿ.',
    transliteration: 'Ondu plate Jolada Rotti oota kodi.',
    contextEn: 'Order the famous North Karnataka staple meal with Yennegayi and Shenga Chutney.',
    contextKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಆರ್ಡರ್ ಮಾಡಲು.',
  },
  {
    id: 'tp-6',
    category: 'dining',
    categoryLabelEn: 'Food & Dining',
    categoryLabelKn: 'ಊಟ & ಉಪಹಾರ',
    categoryIcon: '🍲',
    english: 'Make it less spicy please.',
    kannada: 'ಸ್ವಲ್ಪ ಖಾರ ಕಡಿಮೆ ಮಾಡಿ ದಯವಿಟ್ಟು.',
    transliteration: 'Svalpa khaara kadime maadi dayavittu.',
    contextEn: 'North Karnataka curries can be quite fiery with Ranjaka paste.',
    contextKn: 'ರಂಜಕ ಮತ್ತು ಎಣ್ಣೆಗಾಯಿ ಖಾರ ಕಡಿಮೆ ಮಾಡಲು ವಿನಂತಿಸುವಾಗ.',
  },
  {
    id: 'tp-7',
    category: 'dining',
    categoryLabelEn: 'Food & Dining',
    categoryLabelKn: 'ಊಟ & ಉಪಹಾರ',
    categoryIcon: '🍲',
    english: 'Give some extra curd and peanut chutney powder.',
    kannada: 'ಸ್ವಲ್ಪ ಮೊಸರು ಮತ್ತು ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಹೆಚ್ಚಿಗೆ ಕೊಡಿ.',
    transliteration: 'Svalpa mosaru mattu shenga chutney pudi hecchige kodi.',
    contextEn: 'The perfect cooling condiment for hot afternoon lunches.',
    contextKn: 'ರೊಟ್ಟಿಯ ಜೊತೆ ಮೊಸರು ಮತ್ತು ಶೇಂಗಾ ಚಟ್ನಿ ಕೇಳುವಾಗ.',
  },
  {
    id: 'tp-8',
    category: 'dining',
    categoryLabelEn: 'Food & Dining',
    categoryLabelKn: 'ಊಟ & ಉಪಹಾರ',
    categoryIcon: '🍲',
    english: 'Is there clean drinking water?',
    kannada: 'ಕುಡಿಯಲು ಶುದ್ಧ ನೀರು ಇದೆಯೇ?',
    transliteration: 'Kudiyalu shuddha neeru ideye?',
    contextEn: 'Always check water suitability while traveling across Bagalkote.',
    contextKn: 'ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಬಗ್ಗೆ ವಿಚಾರಿಸುವಾಗ.',
  },

  // 3. Saree Shopping & Crafts
  {
    id: 'tp-9',
    category: 'shopping',
    categoryLabelEn: 'Handlooms & Shopping',
    categoryLabelKn: 'ಇಳಕಲ್ ಸೀರೆ & ಖರೀದಿ',
    categoryIcon: '🧵',
    english: 'Is this an authentic Ilkal saree with pure silk Topetenchi pallu?',
    kannada: 'ಇದು ಶುದ್ಧ ರೇಷ್ಮೆಯ ಟೋಪೆತೆಂಚಿ ಸೆರಗಿನ ಅಸಲಿ ಇಳಕಲ್ ಸೀರೆಯೇ?',
    transliteration: 'Idu shuddha reshmeya Topetenchi seragina asali Ilkal seereye?',
    contextEn: 'Look for the GI tag emblem and Kondi interlocking joint between body and pallu.',
    contextKn: 'ಅಸಲಿ ಜಿಐ ಟ್ಯಾಗ್ ಹಾಗೂ ಕೊಂಡಿ ನೇಯ್ಗೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವಾಗ.',
  },
  {
    id: 'tp-10',
    category: 'shopping',
    categoryLabelEn: 'Handlooms & Shopping',
    categoryLabelKn: 'ಇಳಕಲ್ ಸೀರೆ & ಖರೀದಿ',
    categoryIcon: '🧵',
    english: 'Can you show me pure cotton and silk-cotton mixed sarees?',
    kannada: 'ಶುದ್ಧ ಹತ್ತಿ ಮತ್ತು ರೇಷ್ಮೆ-ಹತ್ತಿ ಮಿಶ್ರಿತ ಸೀರೆಗಳನ್ನು ತೋರಿಸಿ.',
    transliteration: 'Shuddha hatti mattu reshme-hatti mishrita seeregalannu thorisi.',
    contextEn: 'Cotton Ilkal sarees are comfortable and breathable for hot weather.',
    contextKn: 'ಬೇಸಿಗೆಗೆ ಸೂಕ್ತವಾದ ಹತ್ತಿ ಇಳಕಲ್ ಸೀರೆಗಳನ್ನು ವೀಕ್ಷಿಸುವಾಗ.',
  },
  {
    id: 'tp-11',
    category: 'shopping',
    categoryLabelEn: 'Handlooms & Shopping',
    categoryLabelKn: 'ಇಳಕಲ್ ಸೀರೆ & ಖರೀದಿ',
    categoryIcon: '🧵',
    english: 'Can I visit the handloom weaving pit in your house or cooperative?',
    kannada: 'ನಿಮ್ಮ ಮಗ್ಗದ ಗುಂಡಿ ಮತ್ತು ನೇಯ್ಗೆಯನ್ನು ನಾನು ನೋಡಬಹುದೇ?',
    transliteration: 'Nimma maggada gundi mattu neygeyannu naanu nodabahude?',
    contextEn: 'Local weavers in Ilkal and Guledgudda warmly welcome respectful visitors.',
    contextKn: 'ನೇಯ್ಗೆಗಾರರ ಕೈಮಗ್ಗದ ನೇರ ಪ್ರಕ್ರಿಯೆ ವೀಕ್ಷಿಸಲು ಅನುಮತಿ ಕೇಳುವಾಗ.',
  },

  // 4. Monuments & Tickets
  {
    id: 'tp-12',
    category: 'monuments',
    categoryLabelEn: 'Monuments & Tickets',
    categoryLabelKn: 'ಸ್ಮಾರಕ & ಟಿಕೆಟ್',
    categoryIcon: '🏛️',
    english: 'Where is the ASI ticket counter and QR code scanner?',
    kannada: 'ಎಎಸ್‌ಐ ಟಿಕೆಟ್ ಕೌಂಟರ್ ಮತ್ತು ಕ್ಯೂಆರ್ ಕೋಡ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'ASI ticket counter mattu QR code ellide?',
    contextEn: 'ASI entry tickets for Badami Caves and Pattadakal can be bought online via QR code.',
    contextKn: 'ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಟಿಕೆಟ್ ಮತ್ತು ಆನ್‌ಲೈನ್ ಸ್ಕ್ಯಾನರ್ ಹುಡುಕುವಾಗ.',
  },
  {
    id: 'tp-13',
    category: 'monuments',
    categoryLabelEn: 'Monuments & Tickets',
    categoryLabelKn: 'ಸ್ಮಾರಕ & ಟಿಕೆಟ್',
    categoryIcon: '🏛️',
    english: 'Is photography with a tripod allowed inside the caves?',
    kannada: 'ಗುಹೆಗಳ ಒಳಗೆ ಟ್ರೈಪಾಡ್ ಇಟ್ಟು ಫೋಟೋ ತೆಗೆಯಲು ಅನುಮತಿ ಇದೆಯೇ?',
    transliteration: 'Guhegala olage tripod ittu photo tegeyalu anumathi ideye?',
    contextEn: 'Handheld cameras are permitted; tripods usually require prior ASI written permission.',
    contextKn: 'ಕ್ಯಾಮೆರಾ ಮತ್ತು ಟ್ರೈಪಾಡ್ ನಿಯಮಗಳನ್ನು ಭದ್ರತಾ ಸಿಬ್ಬಂದಿಗೆ ಕೇಳುವಾಗ.',
  },
  {
    id: 'tp-14',
    category: 'monuments',
    categoryLabelEn: 'Monuments & Tickets',
    categoryLabelKn: 'ಸ್ಮಾರಕ & ಟಿಕೆಟ್',
    categoryIcon: '🏛️',
    english: 'Which path leads up to the North Fort cannon ramparts?',
    kannada: 'ಉತ್ತರ ಕೋಟೆ ಮತ್ತು ತೋಪಿನ ಕಡೆಗೆ ಹೋಗುವ ದಾರಿ ಯಾವುದು?',
    transliteration: 'Uttara kote mattu thopina kadege hoguva daari yaavudu?',
    contextEn: 'The path starts behind the Badami Archaeological Museum near Agastya Lake.',
    contextKn: 'ಮ್ಯೂಸಿಯಂ ಹಿಂಬದಿಯಿಂದ ಕೋಟೆ ಹತ್ತುವ ದಾರಿಯನ್ನು ವಿಚಾರಿಸುವಾಗ.',
  },

  // 5. Basics & Courtesy
  {
    id: 'tp-15',
    category: 'basics',
    categoryLabelEn: 'Courtesy & Basics',
    categoryLabelKn: 'ಮೂಲಭೂತ & ಶಿಷ್ಟಾಚಾರ',
    categoryIcon: '🙏',
    english: 'Namaskara! (Greetings / Hello)',
    kannada: 'ನಮಸ್ಕಾರ!',
    transliteration: 'Namaskara!',
    contextEn: 'Warm traditional greeting used with all locals across Karnataka.',
    contextKn: 'ಯಾವುದೇ ಸಂಭಾಷಣೆ ಆರಂಭಿಸಲು ಗೌರವಯುತ ಶುಭಾಶಯ.',
  },
  {
    id: 'tp-16',
    category: 'basics',
    categoryLabelEn: 'Courtesy & Basics',
    categoryLabelKn: 'ಮೂಲಭೂತ & ಶಿಷ್ಟಾಚಾರ',
    categoryIcon: '🙏',
    english: 'Dhanyavadagalu! (Thank you very much)',
    kannada: 'ಧನ್ಯವಾದಗಳು!',
    transliteration: 'Dhanyavadagalu!',
    contextEn: 'Express heartfelt gratitude to guides, auto drivers, and shopkeepers.',
    contextKn: 'ಸಹಾಯ ಮಾಡಿದವರಿಗೆ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸಲು.',
  },
  {
    id: 'tp-17',
    category: 'basics',
    categoryLabelEn: 'Courtesy & Basics',
    categoryLabelKn: 'ಮೂಲಭೂತ & ಶಿಷ್ಟಾಚಾರ',
    categoryIcon: '🙏',
    english: 'Please help me, I need directions to the hospital / police.',
    kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ, ಆಸ್ಪತ್ರೆ / ಪೋಲಿಸ್ ಠಾಣೆ ದಾರಿ ಬೇಕು.',
    transliteration: 'Dayavittu sahaya maadi, aaspagre / police thaane daari beku.',
    contextEn: 'Emergency phrase for medical or police assistance.',
    contextKn: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಸ್ಥಳೀಯರ ಸಹಾಯ ಯಾಚಿಸಲು.',
  },
];

export const GOLDEN_HOUR_SLOTS: GoldenHourSlot[] = [
  {
    timeRange: '06:00 AM – 08:30 AM',
    period: 'early_morning',
    titleEn: 'Sunrise Glow & Tranquil Reflections',
    titleKn: 'ಮುಂಜಾನೆಯ ಸುವರ್ಣ ಕಾಂತಿ & ಪ್ರತಿಬಿಂಬ',
    tempEstimate: '21°C – 25°C',
    heatLevel: 'cool',
    recommendationEn: 'The ideal window to explore Agastya Lake shore and Badami Cave 1. The early horizontal sunlight pours straight into the rock verandahs, revealing intricate dancing Nataraja mudras without crowds.',
    recommendationKn: 'ಅಗಸ್ತ್ಯ ಸರೋವರ ಮತ್ತು ಬಾದಾಮಿ ಗುಹೆ ೧ ರ ವೀಕ್ಷಣೆಗೆ ಅತ್ಯಂತ ಪ್ರಶಾಂತ ಸಮಯ. ಸೂರ್ಯನ ಮುಂಜಾನೆಯ ಕಿರಣಗಳು ನೇರವಾಗಿ ಗುಹೆಯೊಳಗೆ ಬಿದ್ದು ನಟರಾಜನ ೮೧ ಮುದ್ರೆಗಳನ್ನು ಅದ್ಭುತವಾಗಿ ಬೆಳಗಿಸುತ್ತವೆ.',
    bestLocationsEn: ['Badami Cave 1 (Nataraja)', 'Agastya Tirtha lakefront', 'Bhootanatha Temples eastern face'],
    bestLocationsKn: ['ಬಾದಾಮಿ ಗುಹೆ ೧ (ನಟರಾಜ)', 'ಅಗಸ್ತ್ಯ ತೀರ್ಥದ ತೀರ', 'ಭೂತನಾಥ ದೇವಾಲಯದ ಪೂರ್ವ ಮುಖ'],
    photoTipEn: 'Capture the mirror reflection of the sandstone cliff in the still lake waters from the northern embankment.',
    photoTipKn: 'ಉತ್ತರ ದಂಡೆಯಿಂದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಡ್ಡಗಳು ಸರೋವರದಲ್ಲಿ ಪ್ರತಿಬಿಂಬಿಸುವುದನ್ನು ಛಾಯಾಗ್ರಹಣ ಮಾಡಿ.',
    mustAvoidEn: 'Avoid deep gorges or shaded western cliffs where light hasn’t penetrated yet.',
    mustAvoidKn: 'ಇನ್ನೂ ಬಿಸಿಲು ತಲುಪದ ಪಶ್ಚಿಮ ಕಂದಕದ ಆಳಕ್ಕೆ ಇಳಿಯಬೇಡಿ.',
  },
  {
    timeRange: '08:30 AM – 11:30 AM',
    period: 'mid_morning',
    titleEn: 'High Reliefs & Hilltop Climbing',
    titleKn: 'ಶಿಲ್ಪಕಲೆ & ಉತ್ತರ ಕೋಟೆ ಚಾರಣ',
    tempEstimate: '26°C – 30°C',
    heatLevel: 'pleasant',
    recommendationEn: 'Climb up to Cave 2 (Trivikrama) and Cave 3 (Vishnu & Narasimha) before the stone steps heat up. If you are climbing Badami North Fort, finish your ascent and descent before noon.',
    recommendationKn: 'ಮೆಟ್ಟಿಲುಗಳು ಬಿಸಿಯಾಗುವ ಮೊದಲೇ ಗುಹೆ ೨ (ತ್ರಿವಿಕ್ರಮ) ಮತ್ತು ಗುಹೆ ೩ (ವಿಷ್ಣು/ನರಸಿಂಹ) ವೀಕ್ಷಿಸಿ. ಉತ್ತರ ಕೋಟೆ ಹತ್ತುವವರು ಮಧ್ಯಾಹ್ನದ ಮುನ್ನವೇ ಇಳಿದು ಬರುವುದು ಸೂಕ್ತ.',
    bestLocationsEn: ['Badami Cave 3 (Varaha & Vishnu reliefs)', 'Cave 4 (Jain carvings)', 'Badami North Fort cannon post'],
    bestLocationsKn: ['ಬಾದಾಮಿ ಗುಹೆ ೩ (ವರಾಹ ಮತ್ತು ವಿಷ್ಣು)', 'ಗುಹೆ ೪ (ಜೈನ ಮೂರ್ತಿಗಳು)', 'ಬಾದಾಮಿ ಉತ್ತರ ಕೋಟೆಯ ತೋಪು'],
    photoTipEn: 'Soft daylight reveals deep chisel details inside Cave 3 ceiling medallion brackets without flash.',
    photoTipKn: 'ಫ್ಲ್ಯಾಶ್ ಇಲ್ಲದೆಯೇ ಗುಹೆ ೩ ರ ಮೇಲ್ಛಾವಣಿಯ ಕಮಲದ ಕೆತ್ತನೆಗಳನ್ನು ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಸೆರೆಹಿಡಿಯಿರಿ.',
    mustAvoidEn: 'Do not hike with thin flip-flops; sandstone surfaces can be rough and warm.',
    mustAvoidKn: 'ತೆಳುವಾದ ಚಪ್ಪಲಿಗಳನ್ನು ಧರಿಸಿ ಕೋಟೆ ಹತ್ತಬೇಡಿ; ಹಿಡಿತವಿರುವ ಶೂ ಬಳಸಿ.',
  },
  {
    timeRange: '11:30 AM – 03:00 PM',
    period: 'mid_day_heat' as any,
    titleEn: 'Midday Heat Escape: Museums, Silk Pits & Rotti Oota',
    titleKn: 'ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲಿನಿಂದ ರಕ್ಷಣೆ: ಮ್ಯೂಸಿಯಂ & ಇಳಕಲ್ ಮಗ್ಗ',
    tempEstimate: '32°C – 37°C',
    heatLevel: 'high_heat',
    recommendationEn: 'The Deccan sandstone rocks radiate intense heat at noon. Step indoors: explore the air-cooled Badami Archaeological Museum, relish an authentic North Karnataka Jolada Rotti lunch with cooling curd, or visit covered Ilkal handloom pit looms.',
    recommendationKn: 'ಮಧ್ಯಾಹ್ನ ಮರಳುಗಲ್ಲುಗಳು ಹೆಚ್ಚು ಬಿಸಿಯಾಗುತ್ತವೆ. ಈ ಸಮಯದಲ್ಲಿ ಬಾದಾಮಿ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ, ಸಾಂಪ್ರದಾಯಿಕ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಅಥವಾ ಇಳಕಲ್ ಕೈಮಗ್ಗ ಕೇಂದ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ ತಂಪಾಗಿರಿ.',
    bestLocationsEn: ['Badami Archaeological Museum', 'Authentic Jolada Rotti Khanavalis', 'Ilkal Handloom Saree Cooperatives'],
    bestLocationsKn: ['ಬಾದಾಮಿ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ', 'ಉತ್ತರ ಕರ್ನಾಟಕದ ರೊಟ್ಟಿ ಖಾನಾವಳಿಗಳು', 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ಸಹಕಾರ ಸಂಘಗಳು'],
    photoTipEn: 'Switch to macro photography: photograph intricate Kasuti embroidery patterns and shuttle movements on the wooden looms.',
    photoTipKn: 'ಮರದ ಮಗ್ಗಗಳ ನೇಯ್ಗೆಯ ಚಲನೆ ಮತ್ತು ಕಸೂತಿಯ ಸೂಕ್ಷ್ಮ ನೂಲುಗಳನ್ನು ಮ್ಯಾಕ್ರೋ ಫೋಟೋಗ್ರಫಿ ಮಾಡಿ.',
    mustAvoidEn: 'AVOID barefoot walking in unshaded open temple courtyards at Pattadakal or climbing bare rock bluffs.',
    mustAvoidKn: 'ಪಟ್ಟದಕಲ್ಲಿನ ತೆರೆದ ಅಂಗಳದಲ್ಲಿ ಪಾದರಕ್ಷೆ ಇಲ್ಲದೆ ನಡೆಯಬೇಡಿ ಅಥವಾ ಬೆತ್ತಲೆ ಗುಡ್ಡ ಹತ್ತಬೇಡಿ.',
  },
  {
    timeRange: '03:00 PM – 04:45 PM',
    period: 'late_afternoon',
    titleEn: 'Shady Banyan Groves & Sacred Springs',
    titleKn: 'ಆಲದ ಮರದ ನೆರಳು & ಪವಿತ್ರ ಪುಷ್ಕರಿಣಿ',
    tempEstimate: '29°C – 32°C',
    heatLevel: 'pleasant',
    recommendationEn: 'Head to the emerald forested enclave of Mahakuta. Shaded by ancient banyans and cool natural spring water flowing into Vishnu Pushkarini, this is the coolest spot in the valley during mid-afternoon.',
    recommendationKn: 'ದಟ್ಟ ಆಲದ ಮರಗಳು ಮತ್ತು ತಂಪಾದ ನೈಸರ್ಗಿಕ ನೀರಿನ ಚಿಲುಮೆ ಇರುವ ಮಹಾಕೂಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ. ಮಧ್ಯಾಹ್ನದ ನಂತರ ಈ ತಾಣವು ಕಣಿವೆಯಲ್ಲೇ ಅತ್ಯಂತ ತಂಪಾಗಿರುತ್ತದೆ.',
    bestLocationsEn: ['Mahakuta Temple Complex & Pushkarini', 'Banashankari Temple & Haridra Tirtha', 'Aihole Lad Khan Temple'],
    bestLocationsKn: ['ಮಹಾಕೂಟ ದೇವಾಲಯ & ಪುಷ್ಕರಿಣಿ', 'ಬನಶಂಕರಿ ದೇವಾಲಯ & ಹರಿದ್ರಾ ತೀರ್ಥ', 'ಐಹೊಳೆ ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ'],
    photoTipEn: 'Dappled sunlight filtering through Mahakuta banyan leaves provides cinematic lighting for the Ardhanareshwara sculpture.',
    photoTipKn: 'ಆಲದ ಮರದ ಎಲೆಗಳ ನಡುವೆ ಸೋರಿಬರುವ ಬೆಳಕು ಅರ್ಧನಾರೀಶ್ವರ ಶಿಲ್ಪಕ್ಕೆ ಅದ್ಭುತ ಛಾಯಾಚಿತ್ರ ಒದಗಿಸುತ್ತದೆ.',
    mustAvoidEn: 'Avoid swimming in deep unfamiliar parts of sacred ponds if you are not accustomed to stone steps.',
    mustAvoidKn: 'ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳ ಪಾಚಿಯಿಂದ ಜಾರದಂತೆ ಪುಷ್ಕರಿಣಿಯ ಬಳಿ ಎಚ್ಚರದಿಂದಿರಿ.',
  },
  {
    timeRange: '04:45 PM – 06:15 PM',
    period: 'sunset',
    titleEn: 'The Golden Hour: UNESCO Riverside Splendor',
    titleKn: 'ಸುವರ್ಣ ಸೂರ್ಯಾಸ್ತ: ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು & ಮಲಪ್ರಭಾ',
    tempEstimate: '25°C – 28°C',
    heatLevel: 'cool',
    recommendationEn: 'The crowning glory of your trip. Reach Pattadakal UNESCO complex as the lowering sun bathes the Virupaksha and Mallikarjuna temples in molten gold. Follow it with sunset on the banks of Malaprabha River.',
    recommendationKn: 'ಪ್ರವಾಸದ ಮುಕುಟಪ್ರಾಯ ಅನುಭವ. ಸಂಜೆಯ ಸೂರ್ಯನು ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳನ್ನು ಸುವರ್ಣ ಮಯವಾಗಿಸುತ್ತಾನೆ. ಮಲಪ್ರಭಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿ ಸೂರ್ಯಾಸ್ತವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
    bestLocationsEn: ['Pattadakal Virupaksha & Mallikarjuna Temples', 'Bhootanatha Temple lakeside sunset', 'Aihole Meguti Hilltop sunset'],
    bestLocationsKn: ['ಪಟ್ಟದಕಲ್ಲು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ', 'ಭೂತನಾಥ ದೇವಾಲಯದ ಸೂರ್ಯಾಸ್ತ', 'ಐಹೊಳೆ ಮೇಗುತಿ ಜೈನ ದೇವಾಲಯದ ಗುಡ್ಡ'],
    photoTipEn: 'Use a wide-angle lens with low ISO. Capture the red sandstone glowing fiery orange against the darkening twilight sky.',
    photoTipKn: 'ಸೂರ್ಯಾಸ್ತದ ಕಿತ್ತಳೆ ಬೆಳಕಿನಲ್ಲಿ ಹೊಳೆಯುವ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಶಿಖರವನ್ನು ವೈಡ್-ಆಂಗಲ್ ಲೆನ್ಸ್‌ನಲ್ಲಿ ಸೆರೆಹಿಡಿಯಿರಿ.',
    mustAvoidEn: 'ASI gates close promptly at 6:00 PM; ensure you enter before 5:15 PM to enjoy the full golden hour.',
    mustAvoidKn: 'ಎಎಸ್‌ಐ ಸ್ಮಾರಕಗಳು ಸಂಜೆ ೬:೦೦ ಗಂಟೆಗೆ ಮುಚ್ಚಲ್ಪಡುತ್ತವೆ; ೫:೧೫ ರ ಮುನ್ನವೇ ಪ್ರವೇಶ ಪಡೆಯಿರಿ.',
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    titleEn: 'Karnataka Tourism 24x7 Helpline',
    titleKn: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ೨೪/೭ ಸಹಾಯವಾಣಿ',
    phone: '18004254254',
    descriptionEn: 'Statewide tourist assistance, route guidance, and dispute resolution.',
    descriptionKn: 'ರಾಜ್ಯಾದ್ಯಂತ ಪ್ರವಾಸಿಗರ ಮಾಹಿತಿ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನೆರವು.',
    badge: 'Toll-Free 24x7',
  },
  {
    id: 'em-2',
    titleEn: 'Badami Police Station & Tourist Assistance',
    titleKn: 'ಬಾದಾಮಿ ಪೋಲಿಸ್ ಠಾಣೆ & ಪ್ರವಾಸಿ ರಕ್ಷಣೆ',
    phone: '08357220033',
    descriptionEn: 'Located near Badami bus stand for safety, lost items, and reporting.',
    descriptionKn: 'ಬಾದಾಮಿ ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ ಇದ್ದು ಸುರಕ್ಷತೆ ಮತ್ತು ತುರ್ತು ನೆರವು ನೀಡುತ್ತದೆ.',
    badge: 'Local Police',
  },
  {
    id: 'em-3',
    titleEn: 'Community Health Centre (Hospital), Badami',
    titleKn: 'ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರ (ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ), ಬಾದಾಮಿ',
    phone: '08357220140',
    descriptionEn: 'Emergency medical services, heat exhaustion care, and ambulance.',
    descriptionKn: 'ತುರ್ತು ಚಿಕಿತ್ಸೆ, ನಿರ್ಜಲೀಕರಣ ಆರೈಕೆ ಮತ್ತು ಆಂಬುಲೆನ್ಸ್ ಸೇವೆ.',
    badge: 'Medical',
  },
  {
    id: 'em-4',
    titleEn: 'ASI Heritage Protection Office, Badami',
    titleKn: 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಕಚೇರಿ (ಎಎಸ್‌ಐ), ಬಾದಾಮಿ',
    phone: '08357220157',
    descriptionEn: 'Monuments ticketing, authorized guide verification, and site regulations.',
    descriptionKn: 'ಸ್ಮಾರಕಗಳ ಟಿಕೆಟ್, ಅಧಿಕೃತ ಗೈಡ್ ಪರಿಶೀಲನೆ ಮತ್ತು ನಿಯಮಾವಳಿಗಳು.',
    badge: 'Archaeology (ASI)',
  },
  {
    id: 'em-5',
    titleEn: 'Women Helpline / Childline (Karnataka)',
    titleKn: 'ಮಹಿಳಾ & ಮಕ್ಕಳ ಸಹಾಯವಾಣಿ',
    phone: '1091',
    descriptionEn: '24x7 dedicated emergency line for women travelers and solo explorers.',
    descriptionKn: 'ಮಹಿಳೆಯರು ಮತ್ತು ಒಂಟಿ ಪ್ರವಾಸಿಗರಿಗೆ ಮೀಸಲಾದ ತುರ್ತು ರಕ್ಷಣಾ ವಾಹಿನಿ.',
    badge: 'Safety',
  },
];

export const BUS_ROUTES: BusRouteInfo[] = [
  {
    routeEn: 'Badami to Pattadakal (via Cholachagudd)',
    routeKn: 'ಬಾದಾಮಿ - ಪಟ್ಟದಕಲ್ಲು (ಚೋಳಚಗುಡ್ಡ ಮಾರ್ಗ)',
    frequency: 'Every 30–45 mins',
    duration: '35 mins (22 km)',
    approxFare: '₹25 – ₹30 (KSRTC Ordinary)',
    type: 'Red Bus / Sarige',
  },
  {
    routeEn: 'Pattadakal to Aihole',
    routeKn: 'ಪಟ್ಟದಕಲ್ಲು - ಐಹೊಳೆ',
    frequency: 'Every 45–60 mins',
    duration: '25 mins (14 km)',
    approxFare: '₹18 – ₹22 (KSRTC)',
    type: 'Local Shuttle',
  },
  {
    routeEn: 'Badami to Banashankari Temple',
    routeKn: 'ಬಾದಾಮಿ - ಬನಶಂಕರಿ ಅಮ್ಮನ ದೇವಾಲಯ',
    frequency: 'Every 15–20 mins (or local autos ₹20 shared)',
    duration: '10 mins (5 km)',
    approxFare: '₹12 (Bus) / ₹20 (Share Auto)',
    type: 'Frequent Shuttle',
  },
  {
    routeEn: 'Badami to Ilkal (Weavers Hub)',
    routeKn: 'ಬಾದಾಮಿ - ಇಳಕಲ್ (ಕೈಮಗ್ಗ ನಗರ)',
    frequency: 'Every 30 mins',
    duration: '1 hr 15 mins (55 km)',
    approxFare: '₹65 – ₹80',
    type: 'Express / Semi-Deluxe',
  },
  {
    routeEn: 'Badami to Guledgudda (Hill Fort & Khana Looms)',
    routeKn: 'ಬಾದಾಮಿ - ಗುಳೇದಗುಡ್ಡ (ಬೆಟ್ಟದ ಕೋಟೆ & ಖಣ ನೇಯ್ಗೆ)',
    frequency: 'Every 30–40 mins',
    duration: '38 mins (24 km)',
    approxFare: '₹28 – ₹35',
    type: 'Rural Express',
  },
  {
    routeEn: 'Badami to Bilgi (Arebhavanavi 16th-c Stepwell)',
    routeKn: 'ಬಾದಾಮಿ - ಬಿಳಿಗಿ (ಅರೆಭಾವನಾವಿ ಮೆಟ್ಟಿಲು ಬಾವಿ)',
    frequency: 'Every 30 mins (via Bagalkote)',
    duration: '50 mins (32 km)',
    approxFare: '₹38 – ₹45',
    type: 'State Highway Bus',
  },
];

export interface HeritageStamp {
  clusterId: string;
  clusterNameEn: string;
  clusterNameKn: string;
  symbol: string;
  iconName: string;
  mottoEn: string;
  mottoKn: string;
  unlockMonumentId: string;
  badgeTitleEn: string;
  badgeTitleKn: string;
}

export const HERITAGE_STAMPS: HeritageStamp[] = [
  {
    clusterId: 'Badami',
    clusterNameEn: 'Badami Rock Sanctuaries',
    clusterNameKn: 'ಬಾದಾಮಿ ಶಿಲಾ ಸನ್ನಿಧಿ',
    symbol: '🏛️',
    iconName: 'Landmark',
    mottoEn: 'Cradle of Monolithic Rock Art (578 CE)',
    mottoKn: 'ಶಿಲಾ ವಾಸ್ತುಶಿಲ್ಪದ ಉಗಮ ಸ್ಥಾನ (ಕ್ರಿ.ಶ. ೫೭೮)',
    unlockMonumentId: 'badami-caves',
    badgeTitleEn: 'Master of Vatapi Sandstone',
    badgeTitleKn: 'ವಾತಾಪಿ ಶಿಲಾ ಪ್ರವೀಣ',
  },
  {
    clusterId: 'Pattadakal',
    clusterNameEn: 'Pattadakal UNESCO Royal Crown',
    clusterNameKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ಪಟ್ಟಾಭಿಷೇಕ ಕ್ಷೇತ್ರ',
    symbol: '👑',
    iconName: 'Award',
    mottoEn: 'Rekha-Nagara & Dravida Synthesis (740 CE)',
    mottoKn: 'ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಯ ಅಪೂರ್ವ ಸಂಗಮ',
    unlockMonumentId: 'pattadakal-unesco',
    badgeTitleEn: 'UNESCO World Heritage Connoisseur',
    badgeTitleKn: 'ವಿಶ್ವ ಪರಂಪರೆ ಪರಿಣತ',
  },
  {
    clusterId: 'Aihole',
    clusterNameEn: 'Aihole Cradle of Architecture',
    clusterNameKn: 'ಐಹೊಳೆ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು',
    symbol: '📐',
    iconName: 'Compass',
    mottoEn: 'Laboratory of 120 Ancient Temples (634 CE)',
    mottoKn: '೧೨೦ ಪುರಾತನ ದೇವಾಲಯಗಳ ವಾಸ್ತುಶಿಲ್ಪ ಪ್ರಯೋಗಶಾಲೆ',
    unlockMonumentId: 'aihole-cradle',
    badgeTitleEn: 'Chalukyan Temple Architect',
    badgeTitleKn: 'ಚಾಲುಕ್ಯ ದೇವಾಲಯ ಶಿಲ್ಪಿ',
  },
  {
    clusterId: 'Mahakuta',
    clusterNameEn: 'Mahakuta Sacred Banyan Grove',
    clusterNameKn: 'ಮಹಾಕೂಟ ಪವಿತ್ರ ತೀರ್ಥ ಕ್ಷೇತ್ರ',
    symbol: '🌿',
    iconName: 'Sparkles',
    mottoEn: 'Living Pushkarini & Sacred Ardhanareshwara',
    mottoKn: 'ಸದಾ ಹರಿಯುವ ಜೀವಂತ ಪುಷ್ಕರಿಣಿ & ಅರ್ಧನಾರೀಶ್ವರ',
    unlockMonumentId: 'mahakuta-springs',
    badgeTitleEn: 'Sacred Waters Seeker',
    badgeTitleKn: 'ಪವಿತ್ರ ತೀರ್ಥ ಯಾತ್ರಿಕ',
  },
  {
    clusterId: 'Banashankari',
    clusterNameEn: 'Banashankari Amma Lamp Towers',
    clusterNameKn: 'ಬನಶಂಕರಿ ದೇವಿ & ದೀಪಸ್ತಂಭ',
    symbol: '🪔',
    iconName: 'Flame',
    mottoEn: 'Goddess Shakambhari & Haridra Tirtha',
    mottoKn: 'ಶಾಕಾಂಬರಿ ದೇವಿ ಸನ್ನಿಧಿ & ಹರಿದ್ರಾ ತೀರ್ಥ',
    unlockMonumentId: 'banashankari-temple',
    badgeTitleEn: 'Banashankari Blessed Pilgrim',
    badgeTitleKn: 'ಬನಶಂಕರಿ ಕೃಪಾ ಪಾತ್ರ',
  },
  {
    clusterId: 'Kudalasangama',
    clusterNameEn: 'Kudalasangama Confluence of Light',
    clusterNameKn: 'ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ ಕ್ಷೇತ್ರ',
    symbol: '🌊',
    iconName: 'Waves',
    mottoEn: 'Holy Confluence & Basaveshwara Aikya Mantapa',
    mottoKn: 'ಕೃಷ್ಣ-ಮಲಪ್ರಭಾ ಸಂಗಮ & ಜಗಜ್ಯೋತಿ ಬಸವಣ್ಣನವರ ಸನ್ನಿಧಿ',
    unlockMonumentId: 'kudalasangama-confluence',
    badgeTitleEn: 'Basava Philosophy Scholar',
    badgeTitleKn: 'ಬಸವ ತತ್ವಜ್ಞಾನಿ',
  },
  {
    clusterId: 'Siddhankolla',
    clusterNameEn: 'Siddhankolla Mystical Gorge',
    clusterNameKn: 'ಸಿದ್ಧನಕೊಳ್ಳ ಕಣಿವೆ & ಜಲಪಾತ ಸನ್ನಿಧಿ',
    symbol: '🏞️',
    iconName: 'Sparkles',
    mottoEn: 'Perennial Forest Waterfall & Rock Shrine',
    mottoKn: 'ಅರಣ್ಯದ ಕಣಿವೆಯಲ್ಲಿ ಹರಿಯುವ ಪವಿತ್ರ ಜಲಪಾತ',
    unlockMonumentId: 'siddhankolla-gorge',
    badgeTitleEn: 'Secret Canyon Wanderer',
    badgeTitleKn: 'ಗುಪ್ತ ಕಣಿವೆ ಯಾತ್ರಿಕ',
  },
  {
    clusterId: 'Bilgi',
    clusterNameEn: 'Bilgi Royal Stepwell',
    clusterNameKn: 'ಬಿಳಿಗಿ ಅರೆಭಾವನಾವಿ ರಾಜ ಕಲ್ಯಾಣಿ',
    symbol: '🏛️',
    iconName: 'Compass',
    mottoEn: '1588 CE Subterranean Stepped Baoli',
    mottoKn: '೧೬ನೇ ಶತಮಾನದ ಅದ್ಭುತ ಶಿಲಾ ಮೆಟ್ಟಿಲು ಬಾವಿ',
    unlockMonumentId: 'bilgi-arebhavanavi',
    badgeTitleEn: 'Deccan Stepwell Connoisseur',
    badgeTitleKn: 'ಮೆಟ್ಟಿಲು ಬಾವಿ ರಸಜ್ಞ',
  },
  {
    clusterId: 'Guledgudda',
    clusterNameEn: 'Guledgudda Hill Fort & Khana',
    clusterNameKn: 'ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ & ಖಣ ನೇಯ್ಗೆ',
    symbol: '🏰',
    iconName: 'Landmark',
    mottoEn: 'Hilltop Bastions & GI Khana Handlooms',
    mottoKn: 'ಬೆಟ್ಟದ ಬುರುಜುಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಖಣ',
    unlockMonumentId: 'guledgudda-fort',
    badgeTitleEn: 'Hill Fort & Khana Master',
    badgeTitleKn: 'ಬೆಟ್ಟದ ಕೋಟೆ & ಖಣ ಪ್ರವೀಣ',
  },
  {
    clusterId: 'Bachinagudda',
    clusterNameEn: 'Bachinagudda Megalithic Ridge',
    clusterNameKn: 'ಬಾಚಿನಗುಡ್ಡ ಪ್ರಾಗೈತಿಹಾಸಿಕ ಬೆಟ್ಟ',
    symbol: '⛰️',
    iconName: 'Award',
    mottoEn: '3,000-Year-Old Dolmens & UNESCO Valley View',
    mottoKn: '೩೦೦೦ ವರ್ಷಗಳ ಶಿಲಾಯುಗದ ಕಲ್ಮನೆಗಳು ಮತ್ತು ಕಣಿವೆ ನೋಟ',
    unlockMonumentId: 'bachinagudda-megalithic',
    badgeTitleEn: 'Prehistoric Valley Scout',
    badgeTitleKn: 'ಪ್ರಾಗೈತಿಹಾಸಿಕ ತಾಣ ಶೋಧಕ',
  },
];
