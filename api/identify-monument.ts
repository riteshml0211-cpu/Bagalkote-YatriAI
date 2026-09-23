import { GoogleGenAI } from '@google/genai';

const MONUMENT_REGISTRY: Record<string, any> = {
  badami_cave_1: {
    monumentName: 'Badami Cave Temple 1 (Shiva Nataraja Sanctuary)',
    monumentNameKn: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯ ೧ (ಶಿವ ನಟರಾಜ ಸನ್ನಿಧಿ)',
    location: 'Badami, Bagalkote District, Karnataka',
    century: 'Late 6th Century CE (c. 578 CE)',
    dynasty: 'Badami Chalukyas (King Kirtivarman I / Mangalesha)',
    architecturalStyle: 'Rock-cut Sandstone Cave Architecture',
    confidence: 99.2,
    sourceImage: '/assets/monuments/badami_nataraja.jpg',
    keyHighlights: [
      'World-famous 18-armed dancing Shiva (Nataraja) exhibiting 81 distinct Bharatanatyam mudras',
      'Ardhanarishwara relief depicting harmonious union of Shiva and Parvati with Nandi and skeleton Bhringi',
      'Elaborate ceiling carvings of Nagaraja with coiled serpentine body',
    ],
    historicalSignificance:
      'Cave 1 is the oldest of the four rock-cut caves in Badami, carved into monolithic red-sandstone cliffs overlooking the historic Agastya Lake. It marks the revolutionary transition in Deccan art from wooden to stone excavation.',
    historicalSignificanceKn:
      'ಗುಹೆ ೧ ಬಾದಾಮಿಯ ಅತಿ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಗುಹೆಯಾಗಿದ್ದು, ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬೆಟ್ಟದಲ್ಲಿ ಕೊರೆಯಲಾಗಿದೆ. ಇಲ್ಲಿನ 18 ತೋಳುಗಳ ನಟರಾಜನ ಶಿಲ್ಪವು ಭರತನಾಟ್ಯದ 81 ಮುದ್ರೆಗಳನ್ನು ಜೀವಂತವಾಗಿ ಪ್ರದರ್ಶಿಸುವ ವಿಶ್ವವಿಖ್ಯಾತ ಕಲಾಕೃತಿಯಾಗಿದೆ.',
    visitorTip:
      'Visit between 7:00 AM and 9:30 AM when the morning golden sunlight penetrates the pillared veranda and directly illuminates the Nataraja relief.',
    audioSnippetEn:
      'Welcome to Badami Cave 1. Carved in the late 6th century by the early Chalukyas, marvel at the 18-armed Nataraja on your right. Notice how the sculptor depicted dynamic rhythm in hard sandstone, creating an eternal monument to cosmic dance.',
    audioSnippetKn:
      'ಬಾದಾಮಿ ಮೊದಲನೇ ಗುಹಾ ದೇವಾಲಯಕ್ಕೆ ಸ್ವಾಗತ. ಕ್ರಿ.ಶ. ೬ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ಗುಹೆಯ ಬಲಭಾಗದಲ್ಲಿರುವ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ಶಿಲ್ಪವು ಚಾಲುಕ್ಯರ ಅಪೂರ್ವ ಶಿಲ್ಪಕಲೆಗೆ ಸಾಕ್ಷಿಯಾಗಿದೆ.',
  },
  bhootanatha_temple: {
    monumentName: 'Bhootanatha Temples & Agastya Lake',
    monumentNameKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ',
    location: 'Agastya Tirtha, Badami, Bagalkote District',
    century: 'Late 7th to 11th Century CE',
    dynasty: 'Badami Chalukyas & Kalyana Chalukyas',
    architecturalStyle: 'Waterfront Sandstone Dravida Sanctuary',
    confidence: 99.4,
    sourceImage: '/assets/monuments/bhootanatha_temple.jpg',
    keyHighlights: [
      'Scenic waterfront sanctum projecting directly into the waters of sacred Agastya Lake',
      'Open pillared hall (Mantapa) extending over the sandstone lakebed',
      'Vivid crimson reflections against the sheer sandstone cliffs during golden hour and sunset',
    ],
    historicalSignificance:
      'Dedicated to Lord Shiva as Bhootanatha (Lord of Spirits), this sandstone cluster appears to float atop Agastya Lake when waters are high.',
    historicalSignificanceKn:
      'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಪೂರ್ವ ತೀರದಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯವು ಚಾಲುಕ್ಯರ ನಯನಮನೋಹರ ಜಲಮಂದಿರವಾಗಿದೆ.',
    visitorTip:
      'Arrive by 4:45 PM to watch the changing colors on the lake surface and sandstone bluffs during sunset.',
    audioSnippetEn:
      'You stand at the edge of Agastya Lake facing the Bhootanatha Temples. As the sun sets behind Badami cliffs, the amber sandstone sanctum is bathed in golden light.',
    audioSnippetKn:
      'ಅಗಸ್ತ್ಯ ಸರೋವರದ ದಂಡೆಯಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯದ ಎದುರು ನೀವಿದ್ದೀರಿ.',
  },
  pattadakal_virupaksha: {
    monumentName: 'Virupaksha Temple, Pattadakal (UNESCO Site)',
    monumentNameKn: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಪಟ್ಟದಕಲ್ಲು (ಯುನೆಸ್ಕೋ ತಾಣ)',
    location: 'Pattadakal, Malaprabha River Basin, Bagalkote',
    century: '740 CE',
    dynasty: 'Badami Chalukyas (Commissioned by Queen Lokamahadevi)',
    architecturalStyle: 'Dravida Temple Architecture with Rekha-Nagara accents',
    confidence: 98.7,
    sourceImage: '/assets/monuments/pattadakal_virupaksha.jpg',
    keyHighlights: [
      "Built by Queen Lokamahadevi to commemorate King Vikramaditya II's victory over Pallavas of Kanchipuram",
      'Architect Gundana Anivaritachari honored with highest royal titles inscribed on stone',
      'Served as architectural blueprint for the Kailasa rock-cut temple in Ellora',
    ],
    historicalSignificance:
      'The crowning jewel of the UNESCO World Heritage complex at Pattadakal.',
    historicalSignificanceKn:
      'ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವು ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪದ ಶಿಖರ ಪ್ರಾಯವಾಗಿದೆ.',
    visitorTip:
      'Hire an authorized ASI guide or use this audio guide to decipher the Ramayana narrative panels.',
    audioSnippetEn:
      'You stand before the majestic Virupaksha Temple at Pattadakal.',
    audioSnippetKn:
      'ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಎದುರು ನೀವಿದ್ದೀರಿ.',
  },
  aihole_durga: {
    monumentName: 'Durga Temple Complex, Aihole',
    monumentNameKn: 'ದುರ್ಗಾ ದೇವಾಲಯ ಸಂಕೀರ್ಣ, ಐಹೊಳೆ',
    location: 'Aihole, Hungund Taluk, Bagalkote District',
    century: 'Late 7th - Early 8th Century CE',
    dynasty: 'Badami Chalukyas',
    architecturalStyle: 'Gajaprishtha (Apsidal) Style with Rekha-Nagara Shikhara',
    confidence: 99.1,
    sourceImage: '/assets/monuments/aihole_durga.jpg',
    keyHighlights: [
      'Rare apsidal (horseshoe-shaped) ground plan resembling early Buddhist Chaitya halls',
      'Monumental pillared ambulatory corridor with ornate dancing musicians and apsaras',
    ],
    historicalSignificance:
      'Known as the "Cradle of Indian Temple Architecture", Aihole served as the experimental laboratory where ancient guilds mastered stone construction.',
    historicalSignificanceKn:
      'ಐಹೊಳೆಯ ದುರ್ಗಾ ದೇವಾಲಯವು ಗಜಪೃಷ್ಠ (ಆನೆ ಬೆನ್ನಿನ ಆಕಾರದ) ವಿಶಿಷ್ಟ ಶೈಲಿಯನ್ನು ಹೊಂದಿದೆ.',
    visitorTip:
      'Look closely at the celestial couples on the verandah pillars.',
    audioSnippetEn:
      'Welcome to the iconic Durga Temple of Aihole.',
    audioSnippetKn:
      'ಐಹೊಳೆಯ ಸುಪ್ರಸಿದ್ಧ ದುರ್ಗಾ ದೇವಾಲಯಕ್ಕೆ ಸ್ವಾಗತ.',
  },
  mahakuta_pool: {
    monumentName: 'Mahakuta Shiva Sanctuary & Vishnu Pushkarini',
    monumentNameKn: 'ಮಹಾಕೂಟ ಶಿವ ದೇವಾಲಯ ಮತ್ತು ವಿಷ್ಣು ಪುಷ್ಕರಣಿ',
    location: 'Mahakuta Valley, 14 km from Badami',
    century: 'Late 6th - 7th Century CE',
    dynasty: 'Badami Chalukyas',
    architecturalStyle: 'Archaic Dravida with Terraced Natural Spring Tank',
    confidence: 97.9,
    sourceImage: '/assets/monuments/mahakuta_temple.jpg',
    keyHighlights: [
      'Sacred freshwater spring tank (Vishnu Pushkarini) with submerged four-faced Shiva Linga',
      'Dense grove of ancient banyan trees and serene woodland atmosphere',
    ],
    historicalSignificance:
      'A revered Dakshina Kashi pilgrimage center with perennial clear springs.',
    historicalSignificanceKn:
      'ದಕ್ಷಿಣ ಕಾಶಿ ಎಂದೇ ಪೂಜಿಸಲ್ಪಡುವ ಮಹಾಕೂಟವು ಪವಿತ್ರ ಪುಷ್ಕರಣಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.',
    visitorTip: 'Carry spare clothing if you wish to take a holy dip in the natural spring waters.',
    audioSnippetEn: 'You have arrived at peaceful Mahakuta.',
    audioSnippetKn: 'ಶಾಂತ ಮತ್ತು ಹಸಿರು ಪರಿಸರದಲ್ಲಿರುವ ಮಹಾಕೂಟಕ್ಕೆ ಸ್ವಾಗತ.',
  },
  banashankari_temple: {
    monumentName: 'Banashankari Amma Temple & Haridra Tirtha',
    monumentNameKn: 'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ',
    location: 'Cholachagudd, 5 km from Badami',
    century: '7th Century (Chalukya) / Rebuilt 1750 CE',
    dynasty: 'Badami Chalukyas & Maratha Peshwas',
    architecturalStyle: 'Dravidian Sanctum with Stepped Turmeric Tank',
    confidence: 98.4,
    sourceImage: '/assets/monuments/banashankari_temple.jpg',
    keyHighlights: [
      'Goddess Shakambhari depicted seated on a roaring lion',
      'Haridra Tirtha lake enclosed by grand lamp towers',
    ],
    historicalSignificance: 'The guardian deity of the Chalukya dynasty.',
    historicalSignificanceKn: 'ಚಾಲುಕ್ಯರ ಕುಲದೇವತೆಯಾದ ಬನಶಂಕರಿ ದೇವಿಯ ಪುಣ್ಯಕ್ಷೇತ್ರವಿದು.',
    visitorTip: 'Visit on Tuesday or Friday to witness special Kumkumarchana.',
    audioSnippetEn: 'Welcome to Banashankari Amma Temple.',
    audioSnippetKn: 'ಶ್ರೀ ಬನಶಂಕರಿ ದೇವಿಯ ಸನ್ನಿಧಾನಕ್ಕೆ ಸ್ವಾಗತ.',
  },
  kudalasangama: {
    monumentName: 'Sangameshwara Temple, Kudalasangama',
    monumentNameKn: 'ಸಂಗಮನಾಥ ದೇವಾಲಯ ಮತ್ತು ಐಕ್ಯ ಮಂಟಪ, ಕೂಡಲಸಂಗಮ',
    location: 'Hungund Taluk, Krishna-Malaprabha River Confluence',
    century: '12th Century CE',
    dynasty: 'Kalyana Chalukyas',
    architecturalStyle: 'Chalukya-Lakulisha Temple Architecture with Cylindrical Submerged Aikya Mantapa',
    confidence: 99.0,
    sourceImage: '/assets/monuments/kudalasangama.jpg',
    keyHighlights: [
      'Sacred confluence of Krishna and Malaprabha rivers',
      'The holy Aikya Mantapa of Jagadguru Basaveshwara',
    ],
    historicalSignificance: 'The spiritual epicentre of Sharana philosophy and Lingayat faith.',
    historicalSignificanceKn: 'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ ಕ್ಷೇತ್ರ.',
    visitorTip: 'Take a motorboat ride to the Aikya Mantapa.',
    audioSnippetEn: 'You are at Kudalasangama where the rivers meet.',
    audioSnippetKn: 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಕ್ಷೇತ್ರಕ್ಕೆ ಸ್ವಾಗತ.',
  },
  ilkal_handloom: {
    monumentName: 'Ilkal Handloom Weavers & Kasuti Heritage Guild',
    monumentNameKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ಸೀರೆ ಮತ್ತು ಕಸೂತಿ ಕರಕುಶಲ ಪರಂಪರೆ',
    location: 'Ilkal & Guledgudda, Bagalkote District',
    century: '8th Century CE Origin',
    dynasty: 'Badami Chalukyas, Vijayanagara & Peshwa Era',
    architecturalStyle: 'Traditional Pit-Loom Weaving Workshops',
    confidence: 99.3,
    sourceImage: '/assets/monuments/ilkal_saree.jpg',
    keyHighlights: [
      'Patented GI certified Topetenwe pallu',
      'Unique Kondatike technique joining silk to cotton',
    ],
    historicalSignificance: 'Preserving over 1,200 years of handwoven textile mastery.',
    historicalSignificanceKn: '೮ನೇ ಶತಮಾನದಿಂದ ಬೆಳೆದುಬಂದ ವಿಶ್ವವಿಖ್ಯಾತ ಇಳಕಲ್ ಸೀರೆ ಕೈಮಗ್ಗ ಪರಂಪರೆ.',
    visitorTip: 'Buy directly from artisan weavers cooperative society.',
    audioSnippetEn: 'Listen to the rhythmic clicking of the wooden shuttles in Ilkal.',
    audioSnippetKn: 'ಇಳಕಲ್‌ನ ಗಲ್ಲಿಗಲ್ಲಿಗಳಲ್ಲಿ ಕೇಳಿಬರುವ ಮಗ್ಗದ ಸದ್ದು ಶತಮಾನಗಳ ಕಲಾ ಪರಂಪರೆಯನ್ನು ನೆನಪಿಸುತ್ತದೆ.',
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, landmarkHint, language = 'en' } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && imageBase64) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      let cleanBase64 = imageBase64;
      let detectedMime = 'image/jpeg';
      if (imageBase64.includes(',')) {
        const [header, dataPart] = imageBase64.split(',');
        cleanBase64 = dataPart.trim();
        const m = header.match(/data:([^;]+);/);
        if (m) detectedMime = m[1];
      }

      const promptText = `Examine this photo from Bagalkote District heritage sites (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, Kudalasangama, or Ilkal handlooms).
Identify the landmark or monument accurately. Output in strict JSON format:
{
  "monumentName": "English name",
  "monumentNameKn": "ಕನ್ನಡ ಹೆಸರು",
  "location": "Location within Bagalkote",
  "century": "Estimated century / construction date",
  "dynasty": "Ruling dynasty",
  "architecturalStyle": "Architectural classification",
  "confidence": 98.5,
  "keyHighlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "historicalSignificance": "Comprehensive historical significance in English",
  "historicalSignificanceKn": "ಕನ್ನಡದಲ್ಲಿ ಐತಿಹಾಸಿಕ ಮಹತ್ವ",
  "visitorTip": "Practical visitor advice",
  "audioSnippetEn": "2-sentence audio narration script in English",
  "audioSnippetKn": "ಕನ್ನಡದಲ್ಲಿ ೨-ವಾಕ್ಯಗಳ ವಿವರಣೆ"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            { inlineData: { mimeType: detectedMime, data: cleanBase64 } },
            { text: promptText },
          ],
        },
      });

      const cleaned = (response.text || '').replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && (parsed.monumentName || parsed.monumentNameKn)) {
        return res.json({ data: parsed, source: 'gemini-vision' });
      }
    } catch (e) {
      console.warn('Gemini vision API error on serverless:', e);
    }
  }

  // Registry match fallback
  const norm = (landmarkHint || '').toLowerCase();
  let match = MONUMENT_REGISTRY.badami_cave_1;
  if (norm.includes('bhootanatha') || norm.includes('agastya')) match = MONUMENT_REGISTRY.bhootanatha_temple;
  else if (norm.includes('pattadakal') || norm.includes('virupaksha')) match = MONUMENT_REGISTRY.pattadakal_virupaksha;
  else if (norm.includes('aihole') || norm.includes('durga')) match = MONUMENT_REGISTRY.aihole_durga;
  else if (norm.includes('mahakuta') || norm.includes('pushkarini')) match = MONUMENT_REGISTRY.mahakuta_pool;
  else if (norm.includes('banashankari') || norm.includes('cholachagudd')) match = MONUMENT_REGISTRY.banashankari_temple;
  else if (norm.includes('kudalasangama') || norm.includes('basava')) match = MONUMENT_REGISTRY.kudalasangama;
  else if (norm.includes('ilkal') || norm.includes('saree') || norm.includes('handloom')) match = MONUMENT_REGISTRY.ilkal_handloom;

  return res.json({ data: match, source: 'heritage-registry' });
}
