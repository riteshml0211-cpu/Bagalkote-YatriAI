import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
  Car,
  Bus,
  Train,
  Fuel,
  CreditCard,
  AlertTriangle,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { Language, Monument } from '../types';
import { MONUMENTS } from '../data/heritageData';
import { TRANSLATIONS } from '../data/translations';

interface CircuitMapExplorerProps {
  language: Language;
  onSelectMonument?: (monument: Monument) => void;
  onPlayMonumentAudio?: (monument: Monument) => void;
}

interface CircuitNode {
  id: string;
  nameEn: string;
  nameKn: string;
  cluster: string;
  clusterKn: string;
  lat: number;
  lng: number;
  svgX: number; // SVG coordinates percent 0-100
  svgY: number;
  monumentId: string;
  highlightsEn: string;
  highlightsKn: string;
  roadTipEn: string;
  roadTipKn: string;
  isHiddenGem?: boolean;
}

const CIRCUIT_NODES: CircuitNode[] = [
  {
    id: 'node-badami',
    nameEn: 'Badami Caves & Agastya Lake',
    nameKn: 'ಬಾದಾಮಿ ಗುಹೆಗಳು & ಅಗಸ್ತ್ಯ ತೀರ್ಥ',
    cluster: 'Badami',
    clusterKn: 'ಬಾದಾಮಿ',
    lat: 15.9189,
    lng: 75.6766,
    svgX: 28,
    svgY: 52,
    monumentId: 'badami-caves',
    highlightsEn: '4 rock-cut sanctuaries, Agastya Lake, Bhootanatha, and North Fort.',
    highlightsKn: '೪ ಬೃಹತ್ ಶಿಲಾ ಗುಹೆಗಳು, ಅಗಸ್ತ್ಯ ಸರೋವರ, ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಕೋಟೆ.',
    roadTipEn: 'Main tourism hub. Plentiful autos, fuel stations, ATMs, and hotels.',
    roadTipKn: 'ಪ್ರಮುಖ ಪ್ರವಾಸಿ ಕೇಂದ್ರ. ಆಟೋಗಳು, ಪೆಟ್ರೋಲ್ ಬಂಕ್ ಮತ್ತು ಎಟಿಎಂಗಳು ಸುಲಭವಾಗಿ ಲಭ್ಯ.',
  },
  {
    id: 'node-banashankari',
    nameEn: 'Banashankari Amma Temple',
    nameKn: 'ಬನಶಂಕರಿ ಅಮ್ಮನ ಸನ್ನಿಧಿ',
    cluster: 'Banashankari',
    clusterKn: 'ಬನಶಂಕರಿ',
    lat: 15.8752,
    lng: 75.7003,
    svgX: 25,
    svgY: 82,
    monumentId: 'banashankari-temple',
    highlightsEn: 'Sacred Shakambhari shrine, Haridra Tirtha pond, and 360-degree lamp towers.',
    highlightsKn: 'ಪವಿತ್ರ ಶಾಕಾಂಬರಿ ದೇವಿ, ಹರಿದ್ರಾ ತೀರ್ಥ ಮತ್ತು ದೀಪಸ್ತಂಭಗಳು.',
    roadTipEn: 'Just 5 km south of Badami on smooth highway. Frequent shared autos available (₹20).',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ದಕ್ಷಿಣಕ್ಕೆ ೫ ಕಿ.ಮೀ. ಸುಗಮ ಹೆದ್ದಾರಿ. ಶೇರಿಂಗ್ ಆಟೋಗಳು ಲಭ್ಯ.',
  },
  {
    id: 'node-mahakuta',
    nameEn: 'Mahakuta Temple & Springs',
    nameKn: 'ಮಹಾಕೂಟ ದೇವಾಲಯ & ಪುಷ್ಕರಿಣಿ',
    cluster: 'Mahakuta',
    clusterKn: 'ಮಹಾಕೂಟ',
    lat: 15.9328,
    lng: 75.7278,
    svgX: 45,
    svgY: 42,
    monumentId: 'mahakuta-springs',
    highlightsEn: 'Emerald banyan grove, Vishnu Pushkarini sacred natural bath, Ardhanareshwara.',
    highlightsKn: 'ದಟ್ಟ ಆಲದ ಮರಗಳು, ಸದಾ ಹರಿಯುವ ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ ಚಿಲುಮೆ ಮತ್ತು ಶಿಲ್ಪಗಳು.',
    roadTipEn: '14 km from Badami. Scenic forest road with occasional monkey groups; carry water.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ೧೪ ಕಿ.ಮೀ. ಸುಂದರ ಅರಣ್ಯ ಮಾರ್ಗ. ಮಂಗಗಳ ಬಗ್ಗೆ ಎಚ್ಚರವಿರಲಿ.',
  },
  {
    id: 'node-pattadakal',
    nameEn: 'Pattadakal UNESCO Complex',
    nameKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ಸಂಕೀರ್ಣ',
    cluster: 'Pattadakal',
    clusterKn: 'ಪಟ್ಟದಕಲ್ಲು',
    lat: 15.9489,
    lng: 75.8163,
    svgX: 62,
    svgY: 48,
    monumentId: 'pattadakal-unesco',
    highlightsEn: 'World Heritage site. Synthesis of Rekha-Nagara & Dravidian architecture (740 CE).',
    highlightsKn: 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ. ನಾಗರ & ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪದ ಭವ್ಯ ಸಂಗಮ.',
    roadTipEn: '22 km from Badami via SH-14. Good road. Parking available inside ASI compound (₹30).',
    roadTipKn: 'ರಾಜ್ಯ ಹೆದ್ದಾರಿ ೧೪ ಮೂಲಕ ೨೨ ಕಿ.ಮೀ. ಸುಸ್ಥಿತಿಯ ರಸ್ತೆ. ಎಎಸ್‌ಐ ವಾಹನ ನಿಲುಗಡೆ ಲಭ್ಯ.',
  },
  {
    id: 'node-aihole',
    nameEn: 'Aihole Temple Complex',
    nameKn: 'ಐಹೊಳೆ ದೇವಾಲಯ ಸಂಕೀರ್ಣ',
    cluster: 'Aihole',
    clusterKn: 'ಐಹೊಳೆ',
    lat: 16.0219,
    lng: 75.8817,
    svgX: 78,
    svgY: 30,
    monumentId: 'aihole-cradle',
    highlightsEn: 'Cradle of Indian Architecture with 120 ancient experimental temples & Durga Temple.',
    highlightsKn: 'ಭಾರತೀಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು. ೧೨೦ ಪ್ರಾಯೋಗಿಕ ದೇವಾಲಯಗಳು ಮತ್ತು ದುರ್ಗಾ ಮಂದಿರ.',
    roadTipEn: '14 km northeast of Pattadakal. Rural 2-lane road; watch for village speed breakers.',
    roadTipKn: 'ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ಈಶಾನ್ಯಕ್ಕೆ ೧೪ ಕಿ.ಮೀ. ಹಳ್ಳಿಯ ರಸ್ತೆ; ವೇಗ ನಿಯಂತ್ರಕಗಳ ಬಗ್ಗೆ ಎಚ್ಚರ.',
  },
  {
    id: 'node-kudalasangama',
    nameEn: 'Kudalasangama Confluence',
    nameKn: 'ಕೂಡಲಸಂಗಮ ಕ್ಷೇತ್ರ',
    cluster: 'Kudalasangama',
    clusterKn: 'ಕೂಡಲಸಂಗಮ',
    lat: 16.2114,
    lng: 76.0592,
    svgX: 92,
    svgY: 15,
    monumentId: 'kudalasangama-confluence',
    highlightsEn: 'Sacred confluence of Krishna and Malaprabha rivers; Basaveshwara Aikya Mantapa.',
    highlightsKn: 'ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಜಗಜ್ಯೋತಿ ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ.',
    roadTipEn: '70 km northeast of Badami via Bagalkote bypass. Best visited with a private taxi.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ೭೦ ಕಿ.ಮೀ. ಬಾಗಲಕೋಟೆ ಬೈಪಾಸ್ ರಸ್ತೆ. ಸ್ವಂತ ಅಥವಾ ಬಾಡಿಗೆ ಕಾರು ಸೂಕ್ತ.',
  },
  {
    id: 'node-siddhankolla',
    nameEn: 'Siddhankolla Canyon & Waterfall',
    nameKn: 'ಸಿದ್ಧನಕೊಳ್ಳ ಕಣಿವೆ & ಜಲಪಾತ',
    cluster: 'HiddenGems',
    clusterKn: 'ಗುಪ್ತ ತಾಣ',
    lat: 15.9622,
    lng: 75.6989,
    svgX: 38,
    svgY: 28,
    monumentId: 'siddhankolla-gorge',
    highlightsEn: 'Deep secluded sandstone canyon, perennial cascading waterfall, and ancient Shaivite hermitage.',
    highlightsKn: 'ಕೆಂಪು ಬಂಡೆಗಳ ಕಣಿವೆ, ಸದಾ ಹರಿಯುವ ಜಲಪಾತ ಮತ್ತು ಪ್ರಾಚೀನ ತಪೋಭೂಮಿ.',
    roadTipEn: '18 km from Badami via Katageri route. Beautiful shaded trail; carry drinking water.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ೧೮ ಕಿ.ಮೀ. ಕಟಗೇರಿ ಮಾರ್ಗ. ಕಾಲುದಾರಿಯ ನಡಿಗೆ; ನೀರು ಜೊತೆಯಿರಲಿ.',
    isHiddenGem: true,
  },
  {
    id: 'node-bilgi',
    nameEn: 'Bilgi Arebhavanavi Stepwell',
    nameKn: 'ಬಿಳಿಗಿ ಅರೆಭಾವನಾವಿ ಕಲ್ಯಾಣಿ',
    cluster: 'Bilgi',
    clusterKn: 'ಬಿಳಿಗಿ',
    lat: 16.3475,
    lng: 75.6178,
    svgX: 18,
    svgY: 18,
    monumentId: 'bilgi-arebhavanavi',
    highlightsEn: '1588 CE multi-tiered royal stepwell with arched pavilions and Kannada-Persian inscriptions.',
    highlightsKn: '೧೬ನೇ ಶತಮಾನದ ಮೆಟ್ಟಿಲು ಬಾವಿ, ತಂಪಾದ ಕಲ್ಲಿನ ಕಮಾನುಗಳು ಮತ್ತು ಅಪರೂಪದ ಶಾಸನಗಳು.',
    roadTipEn: '32 km north of Badami on smooth Bagalkote highway. Free entry and easy car parking.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ಉತ್ತರಕ್ಕೆ ೩೨ ಕಿ.ಮೀ. ಹೆದ್ದಾರಿ ಮಾರ್ಗ. ಉಚಿತ ಪ್ರವೇಶ ಮತ್ತು ವಾಹನ ನಿಲುಗಡೆ ಲಭ್ಯ.',
    isHiddenGem: true,
  },
  {
    id: 'node-guledgudda',
    nameEn: 'Guledgudda Hill Fort & Khana',
    nameKn: 'ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ & ಖಣ ನೇಕಾರಿಕೆ',
    cluster: 'Guledgudda',
    clusterKn: 'ಗುಳೇದಗುಡ್ಡ',
    lat: 16.0528,
    lng: 75.8014,
    svgX: 58,
    svgY: 24,
    monumentId: 'guledgudda-fort',
    highlightsEn: 'Medieval hilltop fortress with 360-degree canyon views and GI-tagged Khana blouse weavers.',
    highlightsKn: 'ಕಣಿವೆಯ ವಿಹಂಗಮ ನೋಟ ನೀಡುವ ಬೆಟ್ಟದ ಕೋಟೆ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಖಣ ನೇಯ್ಗೆಯ ಪಟ್ಟಣ.',
    roadTipEn: '24 km from Badami. 20-min stone stairway climb to the summit; visit weavers in town.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ೨೪ ಕಿ.ಮೀ. ಬೆಟ್ಟ ಹತ್ತಲು ೨೦ ನಿಮಿಷಗಳ ಮೆಟ್ಟಿಲು ಮಾರ್ಗ; ಪಟ್ಟಣದಲ್ಲಿ ನೇಕಾರರ ಭೇಟಿ.',
    isHiddenGem: true,
  },
  {
    id: 'node-bachinagudda',
    nameEn: 'Bachinagudda Megaliths & Viewpoint',
    nameKn: 'ಬಾಚಿನಗುಡ್ಡ ಶಿಲಾಯುಗ ತಾಣ & ವ್ಯೂಪಾಯಿಂಟ್',
    cluster: 'Pattadakal',
    clusterKn: 'ಪಟ್ಟದಕಲ್ಲು',
    lat: 15.9389,
    lng: 75.8312,
    svgX: 68,
    svgY: 60,
    monumentId: 'bachinagudda-megalithic',
    highlightsEn: 'Prehistoric stone dolmens and 7th-century shrine with panoramic views over Pattadakal UNESCO spires.',
    highlightsKn: '೩೦೦೦ ವರ್ಷಗಳ ಶಿಲಾಯುಗದ ಕಲ್ಮನೆಗಳು ಮತ್ತು ಪಟ್ಟದಕಲ್ಲಿನ ಶಿಖರಗಳನ್ನು ಮೇಲಿನಿಂದ ನೋಡುವ ವ್ಯೂಪಾಯಿಂಟ್.',
    roadTipEn: 'Just 3 km from Pattadakal. Short 15-minute nature walk; best at sunrise.',
    roadTipKn: 'ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ಕೇವಲ ೩ ಕಿ.ಮೀ. ೧೫ ನಿಮಿಷಗಳ ನಡಿಗೆ; ಸೂರ್ಯೋದಯಕ್ಕೆ ಅತ್ಯಂತ ಸುಂದರ.',
    isHiddenGem: true,
  },
  {
    id: 'node-nagral',
    nameEn: 'Naganatha Temple of Nagral',
    nameKn: 'ನಾಗರಾಳ ನಾಗನಾಥ ದೇವಾಲಯ',
    cluster: 'Badami',
    clusterKn: 'ಬಾದಾಮಿ',
    lat: 15.9312,
    lng: 75.7489,
    svgX: 52,
    svgY: 62,
    monumentId: 'nagral-naganatha',
    highlightsEn: 'Unspoiled 8th-century early Chalukyan temple standing peacefully in rural sunflower fields.',
    highlightsKn: 'ಹೊಲಗಳ ನಡುವೆ ಏಕಾಂಗಿಯಾಗಿ ಕಂಗೊಳಿಸುವ ೮ನೇ ಶತಮಾನದ ಅದ್ಭುತ ಶಿವಾಲಯ.',
    roadTipEn: '8 km east of Badami. 15-min auto ride through rural countryside; zero crowds.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ಪೂರ್ವಕ್ಕೆ ೮ ಕಿ.ಮೀ. ಹಳ್ಳಿಯ ರಸ್ತೆ; ಯಾವುದೇ ಪ್ರವಾಸಿ ಗದ್ದಲವಿಲ್ಲ.',
    isHiddenGem: true,
  },
  {
    id: 'node-shivayogamandira',
    nameEn: 'Shivayogamandira Hermitage',
    nameKn: 'ಶಿವಯೋಗಮಂದಿರ ತಪೋವನ',
    cluster: 'HiddenGems',
    clusterKn: 'ಗುಪ್ತ ತಾಣ',
    lat: 15.9392,
    lng: 75.7681,
    svgX: 54,
    svgY: 44,
    monumentId: 'shivayogamandira-ashram',
    highlightsEn: 'Riverside spiritual hermitage on the Malaprabha, fruit orchards, peacocks, and palm-leaf manuscripts.',
    highlightsKn: 'ಮಲಪ್ರಭಾ ನದೀತೀರದ ತಪೋಭೂಮಿ, ತೆಂಗಿನ ತೋಟ, ನವಿಲುಗಳು ಮತ್ತು ತಾಳೆಗರಿ ಗ್ರಂಥಾಲಯ.',
    roadTipEn: '15 km from Badami, located right on the Badami-Pattadakal highway. Free community dining.',
    roadTipKn: 'ಬಾದಾಮಿ-ಪಟ್ಟದಕಲ್ಲು ಮುಖ್ಯ ರಸ್ತೆಯಲ್ಲೇ ಇದೆ. ಉಚಿತ ದಾಸೋಹ ವ್ಯವಸ್ಥೆ.',
    isHiddenGem: true,
  },
  {
    id: 'node-kendur',
    nameEn: 'Kendur Prehistoric Rock Art',
    nameKn: 'ಕೆಂಡೂರು ಪ್ರಾಗೈತಿಹಾಸಿಕ ವರ್ಣಚಿತ್ರ',
    cluster: 'HiddenGems',
    clusterKn: 'ಗುಪ್ತ ತಾಣ',
    lat: 15.8942,
    lng: 75.7314,
    svgX: 36,
    svgY: 72,
    monumentId: 'kendur-rock-art',
    highlightsEn: '5,000-year-old red ochre pictographs of prehistoric hunters and horned bulls inside sandstone shelters.',
    highlightsKn: '೫೦೦೦ ವರ್ಷಗಳ ಹಿಂದಿನ ಕೆಂಪು ಶಿಲಾ ವರ್ಣಚಿತ್ರಗಳು ಮತ್ತು ಆದಿಮಾನವರ ಗುಹೆಗಳು.',
    roadTipEn: '8 km from Badami near Kendur village. Short footpath scramble to the sandstone shelter.',
    roadTipKn: 'ಬಾದಾಮಿಯಿಂದ ೮ ಕಿ.ಮೀ. ಕೆಂಡೂರು ಗ್ರಾಮ. ಕಾಲುದಾರಿಯ ನಡಿಗೆ.',
    isHiddenGem: true,
  },
];

// Distance & time lookups between nodes
const INTER_NODE_DISTANCES: Record<string, Record<string, { km: number; minsDrive: number; roadNoteEn: string; roadNoteKn: string }>> = {
  'node-badami': {
    'node-banashankari': { km: 5, minsDrive: 10, roadNoteEn: 'Direct SH-14 stretch, excellent tarmac.', roadNoteKn: 'ನೇರ ಹೆದ್ದಾರಿ, ಸುಗಮ ಡಾಂಬರು ರಸ್ತೆ.' },
    'node-mahakuta': { km: 14, minsDrive: 25, roadNoteEn: 'Scenic pass through red sandstone hills.', roadNoteKn: 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಣಿವೆಯ ಸುಂದರ ರಸ್ತೆ.' },
    'node-pattadakal': { km: 22, minsDrive: 35, roadNoteEn: 'Well-paved State Highway via Cholachagudd.', roadNoteKn: 'ಚೋಳಚಗುಡ್ಡ ಮಾರ್ಗವಾಗಿ ಸುಸ್ಥಿತಿಯ ಹೆದ್ದಾರಿ.' },
    'node-aihole': { km: 35, minsDrive: 55, roadNoteEn: 'Travel via Pattadakal or Katageri bypass.', roadNoteKn: 'ಪಟ್ಟದಕಲ್ಲು ಅಥವಾ ಕಟಗೇರಿ ಬೈಪಾಸ್ ಮೂಲಕ ಪ್ರಯಾಣ.' },
    'node-kudalasangama': { km: 70, minsDrive: 95, roadNoteEn: 'NH/SH route via Bagalkote twin city.', roadNoteKn: 'ಬಾಗಲಕೋಟೆ ನಗರದ ಮೂಲಕ ರಾಷ್ಟ್ರೀಯ/ರಾಜ್ಯ ಹೆದ್ದಾರಿ.' },
    'node-siddhankolla': { km: 18, minsDrive: 30, roadNoteEn: 'Rural road to the forest valley.', roadNoteKn: 'ಅರಣ್ಯ ಕಣಿವೆಗೆ ಹೋಗುವ ಗ್ರಾಮೀಣ ರಸ್ತೆ.' },
    'node-bilgi': { km: 32, minsDrive: 45, roadNoteEn: 'SH highway towards Bilgi and Jamkhandi.', roadNoteKn: 'ಬಿಳಿಗಿ ಮಾರ್ಗದ ಸುಗಮ ಹೆದ್ದಾರಿ.' },
    'node-guledgudda': { km: 24, minsDrive: 38, roadNoteEn: 'Eastbound road passing through hill passes.', roadNoteKn: 'ಬೆಟ್ಟದ ತಿರುವುಗಳ ಪೂರ್ವ ಮಾರ್ಗದ ರಸ್ತೆ.' },
    'node-bachinagudda': { km: 24, minsDrive: 40, roadNoteEn: 'Via Pattadakal village trail.', roadNoteKn: 'ಪಟ್ಟದಕಲ್ಲು ಗ್ರಾಮದ ಪಕ್ಕದ ರಸ್ತೆ.' },
    'node-nagral': { km: 8, minsDrive: 15, roadNoteEn: 'Direct countryside village road.', roadNoteKn: 'ನೇರ ಗ್ರಾಮೀಣ ರಸ್ತೆ.' },
    'node-shivayogamandira': { km: 15, minsDrive: 22, roadNoteEn: 'Direct SH-14 on the way to Pattadakal.', roadNoteKn: 'ಪಟ್ಟದಕಲ್ಲು ಮಾರ್ಗವಾಗಿ ನೇರ ರಾಜ್ಯ ಹೆದ್ದಾರಿ.' },
    'node-kendur': { km: 8, minsDrive: 15, roadNoteEn: 'Rural road south of Badami towards Kendur.', roadNoteKn: 'ಬಾದಾಮಿಯ ದಕ್ಷಿಣದ ಕೆಂಡೂರು ಗ್ರಾಮ ರಸ್ತೆ.' },
  },
  'node-pattadakal': {
    'node-aihole': { km: 14, minsDrive: 22, roadNoteEn: 'Along the Malaprabha river valley, rural highway.', roadNoteKn: 'ಮಲಪ್ರಭಾ ನದಿ ಕಣಿವೆಯ ಉದ್ದಕ್ಕೂ ಹಳ್ಳಿ ರಸ್ತೆ.' },
    'node-mahakuta': { km: 16, minsDrive: 28, roadNoteEn: 'Quiet village road connecting heritage shrines.', roadNoteKn: 'ಶಾಂತ ಹಳ್ಳಿ ರಸ್ತೆ.' },
    'node-badami': { km: 22, minsDrive: 35, roadNoteEn: 'State Highway 14, direct return to Badami.', roadNoteKn: 'ನೇರ ರಾಜ್ಯ ಹೆದ್ದಾರಿ ೧೪.' },
    'node-banashankari': { km: 25, minsDrive: 40, roadNoteEn: 'Via Badami ring intersection.', roadNoteKn: 'ಬಾದಾಮಿ ರಿಂಗ್ ರಸ್ತೆ ಮೂಲಕ.' },
    'node-kudalasangama': { km: 62, minsDrive: 80, roadNoteEn: 'Via Guledgudda or Bagalkote corridor.', roadNoteKn: 'ಗುಳೇದಗುಡ್ಡ ಅಥವಾ ಬಾಗಲಕೋಟೆ ಮಾರ್ಗ.' },
    'node-bachinagudda': { km: 3, minsDrive: 6, roadNoteEn: 'Immediate adjacent hillock overlooking temples.', roadNoteKn: 'ಪಟ್ಟದಕಲ್ಲಿನ ಪಕ್ಕದಲ್ಲೇ ಇರುವ ಬೆಟ್ಟದ ರಸ್ತೆ.' },
    'node-guledgudda': { km: 18, minsDrive: 28, roadNoteEn: 'Short rural connection across the ridge.', roadNoteKn: 'ಕಣಿವೆಯ ಅಡ್ಡಲಾಗಿ ಸಾಗುವ ಹಳ್ಳಿ ರಸ್ತೆ.' },
  },
  'node-aihole': {
    'node-pattadakal': { km: 14, minsDrive: 22, roadNoteEn: 'Smooth transit along historical circuit.', roadNoteKn: 'ಐತಿಹಾಸಿಕ ಹೆದ್ದಾರಿ ಮಾರ್ಗ.' },
    'node-badami': { km: 35, minsDrive: 55, roadNoteEn: 'Via Pattadakal or Amingad connecting highway.', roadNoteKn: 'ಪಟ್ಟದಕಲ್ಲು ಮೂಲಕ ಸಂಪರ್ಕ ರಸ್ತೆ.' },
    'node-kudalasangama': { km: 48, minsDrive: 65, roadNoteEn: 'Shortest crossing route through Hunagund taluk.', roadNoteKn: 'ಹುನಗುಂದ ತಾಲೂಕಿನ ಮೂಲಕ ಹತ್ತಿರದ ಮಾರ್ಗ.' },
    'node-guledgudda': { km: 16, minsDrive: 25, roadNoteEn: 'Direct link via Kamatagi corridor.', roadNoteKn: 'ಕಮತಗಿ ಮಾರ್ಗವಾಗಿ ನೇರ ರಸ್ತೆ.' },
  },
};

export const CircuitMapExplorer: React.FC<CircuitMapExplorerProps> = ({
  language,
  onSelectMonument,
  onPlayMonumentAudio,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-badami');
  const [originNodeId, setOriginNodeId] = useState<string>('node-badami');
  const [destNodeId, setDestNodeId] = useState<string>('node-pattadakal');
  const [mapFilter, setMapFilter] = useState<'all' | 'hidden' | 'main'>('all');

  const t = TRANSLATIONS[language];

  // Active selected node
  const activeNode = useMemo(() => {
    return CIRCUIT_NODES.find((n) => n.id === selectedNodeId) || CIRCUIT_NODES[0];
  }, [selectedNodeId]);

  // Associated monument
  const activeMonument = useMemo(() => {
    return MONUMENTS.find((m) => m.id === activeNode.monumentId);
  }, [activeNode]);

  // Check if current time is within operational hours (6:00 AM - 6:00 PM)
  const isCurrentlyOpen = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18;
  }, []);

  // Distance calculator calculation
  const routeCalculation = useMemo(() => {
    if (originNodeId === destNodeId) {
      return {
        km: 0,
        minsDrive: 0,
        fareAuto: 0,
        fareCab: 0,
        roadTip: language === 'kn' ? 'ನೀವು ಒಂದೇ ತಾಣದಲ್ಲಿದ್ದೀರಿ.' : 'Origin and destination are the same location.',
      };
    }

    const forward = INTER_NODE_DISTANCES[originNodeId]?.[destNodeId];
    const reverse = INTER_NODE_DISTANCES[destNodeId]?.[originNodeId];
    const data = forward || reverse;

    if (data) {
      return {
        km: data.km,
        minsDrive: data.minsDrive,
        fareAuto: Math.round(data.km * 18 + 50),
        fareCab: Math.round(data.km * 28 + 200),
        roadTip: language === 'kn' ? data.roadNoteKn : data.roadNoteEn,
      };
    }

    // Fallback estimation based on node index
    const distFallback = 20;
    return {
      km: distFallback,
      minsDrive: 30,
      fareAuto: 400,
      fareCab: 750,
      roadTip: language === 'kn' ? 'ಉತ್ತಮ ರಾಜ್ಯ ಹೆದ್ದಾರಿ ರಸ್ತೆ.' : 'State highway with rural sections.',
    };
  }, [originNodeId, destNodeId, language]);

  // Generate Google Maps navigation link
  const getGoogleMapsDirectionsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const getPointToPointDirectionsUrl = () => {
    const origin = CIRCUIT_NODES.find((n) => n.id === originNodeId);
    const dest = CIRCUIT_NODES.find((n) => n.id === destNodeId);
    if (!origin || !dest) return '#';
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${dest.lat},${dest.lng}`;
  };

  return (
    <section id="circuit-map" className="py-14 sm:py-20 bg-linear-to-b from-[#FAF7F2] via-amber-50/30 to-[#FAF7F2] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'kn' ? 'ಲೈವ್ ಮಾರ್ಗ ಮತ್ತು ಜಿಪಿಎಸ್ ನಕ್ಷೆ' : 'Live Circuit Map & GPS Driving Routes'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಬಾದಾಮಿ-ಪಟ್ಟದಕಲ್ಲು ಹೆರಿಟೇಜ್ ಕಾರಿಡಾರ್ ನಕ್ಷೆ' : 'The Chalukya Heritage Circuit Map'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'kn'
              ? 'ಪ್ರತಿಯೊಂದು ತಾಣವನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ, ನೇರವಾಗಿ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ನ್ಯಾವಿಗೇಷನ್ ಆರಂಭಿಸಿ, ಮತ್ತು ನಿಖರ ದೂರ ಹಾಗೂ ಪ್ರಯಾಣದ ಸಮಯವನ್ನು ಲೆಕ್ಕ ಹಾಕಿ.'
              : 'Interactive visual route map connecting all 6 heritage enclaves with real-time operational status, road advisories, and 1-tap Google Maps GPS navigation.'}
          </p>
        </div>

        {/* Top Grid: Interactive Vector Circuit Map + Active Node Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-10">
          {/* Interactive Vector Map Canvas */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200/90 p-4 sm:p-6 shadow-md overflow-hidden relative">
            {/* Header with Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {language === 'kn' ? 'ಮಾರ್ಗ ನಕ್ಷೆ (ಕ್ಲಿಕ್ ಮಾಡಿ)' : 'Interactive Highway Map'}
                </span>
              </div>

              {/* Map Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setMapFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    mapFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'kn' ? 'ಎಲ್ಲ ತಾಣ (೧೨)' : 'All Sites (12)'}
                </button>
                <button
                  type="button"
                  onClick={() => setMapFilter('hidden')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    mapFilter === 'hidden'
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'text-emerald-800 hover:text-emerald-950 font-medium'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'kn' ? 'ಗುಪ್ತ ತಾಣಗಳು (೬)' : 'Offbeat Gems (6)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapFilter('main')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    mapFilter === 'main' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'kn' ? 'ಪ್ರಮುಖ (೬)' : 'Main Circuit (6)'}
                </button>
              </div>
            </div>

            {/* SVG Visual Map Container */}
            <div className="relative w-full aspect-16/11 bg-linear-to-br from-amber-50/60 via-stone-50 to-orange-50/40 rounded-2xl border border-amber-200/60 overflow-hidden select-none">
              {/* Decorative Malaprabha River Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="riverGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="roadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>

                {/* River Malaprabha */}
                <path
                  d="M 15 95 C 35 70, 50 60, 65 45 C 75 35, 82 25, 95 12"
                  fill="none"
                  stroke="url(#riverGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Main Highway Lines (SH-14 and links) */}
                {/* Badami to Banashankari */}
                <line x1="28" y1="52" x2="25" y2="82" stroke="#D97706" strokeWidth="2" strokeDasharray="2,2" />
                {/* Badami to Mahakuta */}
                <line x1="28" y1="52" x2="45" y2="42" stroke="#D97706" strokeWidth="2" strokeDasharray="2,2" />
                {/* Mahakuta to Pattadakal */}
                <line x1="45" y1="42" x2="62" y2="48" stroke="#D97706" strokeWidth="2" />
                {/* Badami to Pattadakal direct highway */}
                <line x1="28" y1="52" x2="62" y2="48" stroke="#B45309" strokeWidth="2.5" />
                {/* Pattadakal to Aihole */}
                <line x1="62" y1="48" x2="78" y2="30" stroke="#B45309" strokeWidth="2.5" />
                {/* Aihole to Kudalasangama */}
                <line x1="78" y1="30" x2="92" y2="15" stroke="#D97706" strokeWidth="2" strokeDasharray="3,2" />

                {/* Dotted Trails connecting to Hidden & Offbeat Gems */}
                {/* Badami to Siddhankolla gorge */}
                <line x1="28" y1="52" x2="38" y2="28" stroke="#059669" strokeWidth="1.8" strokeDasharray="2,2" />
                {/* Badami to Bilgi stepwell */}
                <line x1="28" y1="52" x2="18" y2="18" stroke="#059669" strokeWidth="1.8" strokeDasharray="3,2" />
                {/* Badami to Nagral Naganatha */}
                <line x1="28" y1="52" x2="52" y2="62" stroke="#059669" strokeWidth="1.8" strokeDasharray="2,2" />
                {/* Badami to Kendur rock art */}
                <line x1="28" y1="52" x2="36" y2="72" stroke="#059669" strokeWidth="1.8" strokeDasharray="2,2" />
                {/* Badami-Pattadakal to Shivayogamandira */}
                <line x1="45" y1="46" x2="54" y2="44" stroke="#059669" strokeWidth="1.8" strokeDasharray="2,2" />
                {/* Pattadakal to Bachinagudda */}
                <line x1="62" y1="48" x2="68" y2="60" stroke="#059669" strokeWidth="1.8" strokeDasharray="2,2" />
                {/* Aihole / Pattadakal to Guledgudda */}
                <line x1="78" y1="30" x2="58" y2="24" stroke="#059669" strokeWidth="1.8" strokeDasharray="3,2" />
              </svg>

              {/* Highway distance badges */}
              <div className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-900 border border-amber-300 shadow-xs pointer-events-none">
                22 km
              </div>
              <div className="absolute top-[37%] left-[70%] -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-900 border border-amber-300 shadow-xs pointer-events-none">
                14 km
              </div>
              <div className="absolute top-[67%] left-[23%] -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-900 border border-amber-300 shadow-xs pointer-events-none">
                5 km
              </div>

              {/* River Label */}
              <div className="absolute bottom-2 right-3 text-[10px] font-bold text-blue-600/80 italic flex items-center gap-1">
                <span>≈ Malaprabha River Basin</span>
              </div>

              {/* Circuit Nodes (Pins) */}
              {CIRCUIT_NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isDimmed =
                  (mapFilter === 'hidden' && !node.isHiddenGem) ||
                  (mapFilter === 'main' && node.isHiddenGem);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ left: `${node.svgX}%`, top: `${node.svgY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-300 ${
                      isDimmed ? 'opacity-30 scale-90' : isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Pulse ring for active */}
                      {isSelected && (
                        <span
                          className={`absolute -inset-2 rounded-full animate-ping opacity-60 pointer-events-none ${
                            node.isHiddenGem ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                      )}

                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-all border-2 ${
                          isSelected
                            ? node.isHiddenGem
                              ? 'bg-emerald-600 border-white text-white ring-3 ring-emerald-400'
                              : 'bg-amber-600 border-white text-white ring-3 ring-amber-400'
                            : node.isHiddenGem
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 group-hover:bg-emerald-100 ring-2 ring-emerald-300/60'
                            : 'bg-white border-amber-600 text-amber-900 group-hover:bg-amber-50'
                        }`}
                      >
                        {node.isHiddenGem ? (
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-emerald-600 group-hover:text-emerald-800" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        )}
                      </div>

                      {/* Tooltip / Label */}
                      <span
                        className={`mt-1 whitespace-nowrap px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold shadow-md transition-all flex items-center gap-0.5 ${
                          isSelected
                            ? 'bg-stone-900 text-amber-300 border border-amber-400'
                            : node.isHiddenGem
                            ? 'bg-emerald-900 text-emerald-100 border border-emerald-500 shadow-emerald-900/30'
                            : 'bg-white/95 text-slate-800 border border-slate-200 group-hover:bg-amber-50'
                        }`}
                      >
                        {node.isHiddenGem && <span className="text-emerald-300">✨</span>}
                        <span>{language === 'kn' ? node.clusterKn : node.cluster}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-1 bg-amber-700 rounded-sm inline-block" />
                  <span>State Highway (SH-14)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-1 border-t-2 border-dashed border-emerald-600 inline-block" />
                  <span className="text-emerald-800 font-semibold">✨ Offbeat Trail</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-1 bg-blue-400 rounded-sm inline-block" />
                  <span>Malaprabha River</span>
                </span>
              </div>
              <span className="text-amber-800 font-medium">
                {language === 'kn' ? 'ಕ್ಲಿಕ್ ಮಾಡಿ ವಿವರ & ನ್ಯಾವಿಗೇಷನ್ ನೋಡಿ' : 'Tap any node to view live details'}
              </span>
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-amber-200/90 shadow-lg overflow-hidden flex flex-col justify-between">
            <div>
              {/* Header image & status */}
              <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                <img
                  src={activeMonument?.image || '/assets/monuments/badami_caves.jpg'}
                  alt={activeNode.nameEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                      isCurrentlyOpen
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-red-600/90 text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{isCurrentlyOpen ? (language === 'kn' ? 'ಈಗ ತೆರೆದಿದೆ (೬:೦೦ – ೬:೦೦)' : 'Open Now (6:00 AM – 6:00 PM)') : (language === 'kn' ? 'ಈಗ ಮುಚ್ಚಿದೆ' : 'Closed for Today')}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-amber-300 font-semibold border border-amber-400/40">
                    GPS: {activeNode.lat.toFixed(4)}, {activeNode.lng.toFixed(4)}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                    {language === 'kn' ? activeNode.clusterKn : activeNode.cluster} Cluster
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    {language === 'kn' ? activeNode.nameKn : activeNode.nameEn}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-5 space-y-3.5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'kn' ? activeNode.highlightsKn : activeNode.highlightsEn}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-amber-50/60 p-3 rounded-2xl border border-amber-200/60">
                  <div>
                    <span className="text-slate-500 block text-[11px]">{language === 'kn' ? 'ಬಾದಾಮಿಯಿಂದ ದೂರ:' : 'Distance from Badami:'}</span>
                    <span className="font-bold text-slate-900">
                      {activeMonument?.distanceFromBadamiKm || 0} km
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">{language === 'kn' ? 'ಪ್ರವೇಶ ಶುಲ್ಕ (ASI):' : 'Entry Ticket (ASI):'}</span>
                    <span className="font-bold text-amber-900">
                      {activeMonument?.entryFee.indian === 0
                        ? (language === 'kn' ? 'ಉಚಿತ ಪ್ರವೇಶ' : 'Free Entry')
                        : `₹${activeMonument?.entryFee.indian || 25} (Indians) / ₹${activeMonument?.entryFee.foreigner || 300}`}
                    </span>
                  </div>
                </div>

                {/* Road and Parking Advice */}
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <Car className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      {language === 'kn' ? 'ರಸ್ತೆ ಮತ್ತು ವಾಹನ ನಿಲುಗಡೆ ಸಲಹೆ:' : 'Road & Transit Condition:'}
                    </span>
                    <span>{language === 'kn' ? activeNode.roadTipKn : activeNode.roadTipEn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action: Google Maps Button & Transit Link */}
            <div className="p-4 sm:p-5 pt-0 space-y-2">
              <a
                href={getGoogleMapsDirectionsUrl(activeNode.lat, activeNode.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-900/15 transition-all active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'kn' ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ನೇರ ದಾರಿ ಪಡೆಯಿರಿ' : 'Get Driving Route in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="#transportation"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200/80 transition-all cursor-pointer"
              >
                <Train className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'kn' ? 'ನಿಮ್ಮ ಊರಿನಿಂದ ರೈಲು / ಬಸ್ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ ನೋಡಿ' : 'Check Trains & Buses from Your Departure City'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 2: Point-to-Point Route & Travel Fare Calculator */}
        <div className="bg-white rounded-3xl border border-amber-200/90 p-5 sm:p-8 shadow-md">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                {language === 'kn' ? 'ಪಾಯಿಂಟ್-ಟು-ಪಾಯಿಂಟ್ ದೂರ & ಪ್ರಯಾಣ ದರ ಲೆಕ್ಕಾಚಾರ' : 'Point-to-Point Route & Fare Calculator'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'kn' ? 'ಯಾವುದೇ ಎರಡು ತಾಣಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ನಿಖರ ಕಿಲೋಮೀಟರ್, ಸಮಯ ಮತ್ತು ಆಟೋ/ಟ್ಯಾಕ್ಸಿ ದರ ತಿಳಿಯಿರಿ' : 'Calculate driving duration, estimated auto/taxi fares, and fuel tips between any two circuit stops'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Select Origin */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {language === 'kn' ? 'ಪ್ರಾರಂಭದ ತಾಣ (Origin)' : 'Starting Location'}
              </label>
              <select
                value={originNodeId}
                onChange={(e) => setOriginNodeId(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {CIRCUIT_NODES.map((node) => (
                  <option key={node.id} value={node.id}>
                    {language === 'kn' ? node.nameKn : node.nameEn} ({language === 'kn' ? node.clusterKn : node.cluster})
                  </option>
                ))}
              </select>
            </div>

            {/* Arrow Divider */}
            <div className="md:col-span-2 flex justify-center">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Select Destination */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {language === 'kn' ? 'ಗಮ್ಯಸ್ಥಾನ (Destination)' : 'Destination Location'}
              </label>
              <select
                value={destNodeId}
                onChange={(e) => setDestNodeId(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {CIRCUIT_NODES.map((node) => (
                  <option key={node.id} value={node.id}>
                    {language === 'kn' ? node.nameKn : node.nameEn} ({language === 'kn' ? node.clusterKn : node.cluster})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calculator Output Row */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-amber-200/60">
              <span className="text-[11px] text-slate-500 block">{language === 'kn' ? 'ಒಟ್ಟು ದೂರ:' : 'Total Distance:'}</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-amber-900">
                ~{routeCalculation.km} km
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-amber-200/60">
              <span className="text-[11px] text-slate-500 block">{language === 'kn' ? 'ಕಾರು ಚಾಲನೆ ಸಮಯ:' : 'Drive Duration:'}</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                ~{routeCalculation.minsDrive} mins
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-amber-200/60">
              <span className="text-[11px] text-slate-500 block">{language === 'kn' ? 'ಆಟೋ ರಿಕ್ಷಾ ಅಂದಾಜು:' : 'Estimated Auto Fare:'}</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-emerald-800">
                ₹{routeCalculation.fareAuto}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-amber-200/60">
              <span className="text-[11px] text-slate-500 block">{language === 'kn' ? 'ಪ್ರೈವೇಟ್ ಕ್ಯಾಬ್ ಅಂದಾಜು:' : 'Private Cab Fare:'}</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                ₹{routeCalculation.fareCab}
              </span>
            </div>
          </div>

          {/* Road Tip and Launch Nav Button */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs text-amber-950 min-w-0">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="truncate">
                <strong className="mr-1">{language === 'kn' ? 'ರಸ್ತೆ ಸಲಹೆ:' : 'Transit Tip:'}</strong>
                {routeCalculation.roadTip}
              </span>
            </div>

            <a
              href={getPointToPointDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-300 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? 'ನೇರ ಮಾರ್ಗ ನ್ಯಾವಿಗೇಷನ್ ಆರಂಭಿಸಿ' : 'Open Point-to-Point Route'}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
