import { Monument, ArtisanCooperative, LocalDish, Homestay } from '../types';

export const MONUMENTS: Monument[] = [
  {
    id: 'badami-caves',
    name: 'Badami Cave Temples & Agastya Lake',
    nameKn: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ',
    cluster: 'Badami',
    clusterKn: 'ಬಾದಾಮಿ',
    tagline: 'Magnificent 6th-century rock-cut monolithic sandstone sanctuaries',
    taglineKn: '೬ನೇ ಶತಮಾನದ ಬೃಹತ್ ಮರಳುಗಲ್ಲಿನ ಗುಹಾ ದೇವಾಲಯಗಳು',
    century: 'Late 6th to Early 7th Century CE',
    dynasty: 'Badami Chalukyas (Pulakeshin I, Kirtivarman I, Mangalesha)',
    dynastyKn: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು',
    architecturalStyle: 'Rock-cut Monolithic Deccan Sandstone Architecture',
    architecturalStyleKn: 'ಮರಳುಗಲ್ಲಿನ ಕಲ್ಲಿನ ಗುಹಾ ವಾಸ್ತುಶಿಲ್ಪ',
    image: '/assets/monuments/badami_caves.jpg',
    gallery: [
      '/assets/monuments/badami_caves.jpg',
      '/assets/monuments/badami_nataraja.jpg',
      '/assets/monuments/badami_cave3_vishnu.jpg',
    ],
    operationalTimings: '6:00 AM – 6:00 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ಸಂಜೆ ೬:೦೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 25,
      foreigner: 300,
      camera: 25,
    },
    distanceFromBadamiKm: 1.5,
    coordinates: { lat: 15.9189, lng: 75.6766 },
    audioDurationSeconds: 145,
    audioFileEn: '/assets/audio/badami-caves_en.mp3',
    audioFileKn: '/assets/audio/badami-caves_kn.mp3',
    audioSnippetEn:
      'Welcome to the Badami Cave Temples. As you climb these ancient red sandstone steps, notice Cave 1 on your right—home to the celebrated 18-armed Nataraja, striking eighty-one Bharatanatyam poses simultaneously. Cave 2 honors Lord Vishnu as Trivikrama conquering the heavens and earth, while Cave 3, consecrated in 578 CE by King Mangalesha, is the grandest of all with its monumental Varaha and Narasimha reliefs. Cave 4 reveals the serene penance of Jain Tirthankaras Mahavira and Parshvanatha.',
    audioSnippetKn:
      'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳಿಗೆ ಸ್ವಾಗತ. ಕ್ರಿ.ಶ. ೬ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಹೆಗಳು ಚಾಲುಕ್ಯರ ಕಲಾ ಪ್ರೌಢಿಮೆಗೆ ಸಾಕ್ಷಿ. ಮೊದಲನೇ ಗುಹೆಯಲ್ಲಿ ೧೮ ತೋಳುಗಳ ನಟರಾಜ, ಎರಡನೇ ಗುಹೆಯಲ್ಲಿ ತ್ರಿವಿಕ್ರಮ, ಮೂರನೇ ಗುಹೆಯಲ್ಲಿ ಅದ್ಭುತ ವರಾಹ ಮತ್ತು ನರಸಿಂಹ ಶಿಲ್ಪಗಳು ಹಾಗೂ ನಾಲ್ಕನೇ ಗುಹೆಯಲ್ಲಿ ಜೈನ ತೀರ್ಥಂಕರರ ತಪಸ್ಸಿನ ಮೂರ್ತಿಗಳಿವೆ.',
    descriptionEn:
      'Carved into the rugged red sandstone bluffs enclosing the emerald waters of Agastya Tirtha, the four rock-cut caves of Badami represent the birthplace of structural Indian temple architecture. Consecrated between 578 and 610 CE, they stand as an enduring tribute to religious harmony—showcasing Shaivite, Vaishnavite, and Jain masterworks side by side.',
    descriptionKn:
      'ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಸರೋವರದ ದಂಡೆಯ ಮೇಲೆ ಕಂಗೊಳಿಸುವ ಬಾದಾಮಿಯ ನಾಲ್ಕು ಗುಹಾ ದೇವಾಲಯಗಳು ಭಾರತೀಯ ಶಿಲ್ಪಕಲೆಯ ಸುವರ್ಣ ಅಧ್ಯಾಯ. ಕ್ರಿ.ಶ. ೫೭೮ ರಿಂದ ೬೧೦ ರ ಅವಧಿಯಲ್ಲಿ ಕೆತ್ತಲಾದ ಈ ಗುಹೆಗಳಲ್ಲಿ ಶೈವ, ವೈಷ್ಣವ ಮತ್ತು ಜೈನ ಧರ್ಮಗಳ ಸಾಮರಸ್ಯ ಎದ್ದು ಕಾಣುತ್ತದೆ.',
    keyFeaturesEn: [
      '18-armed Dancing Nataraja exhibiting 81 distinct classical dance mudras',
      'Cave 3 royal inscription dating precisely to Saka 500 (578 CE) under King Mangalesha',
      'Sweeping sunset panorama overlooking Bhootanatha Temples and Agastya Lake',
      'Ancient carved steps leading up to Badami North Fort and cannon ramparts',
    ],
    keyFeaturesKn: [
      'ಭರತನಾಟ್ಯದ ೮೧ ಮುದ್ರೆಗಳನ್ನು ಹೊಂದಿರುವ ವಿಶ್ವವಿಖ್ಯಾತ ೧೮ ತೋಳುಗಳ ನಟರಾಜ',
      'ಕ್ರಿ.ಶ. ೫೭೮ ರ ಮಂಗಲೇಶ ರಾಜನ ಐತಿಹಾಸಿಕ ಶಿಲಾಶಾಸನ',
      'ಅಗಸ್ತ್ಯ ಸರೋವರ ಮತ್ತು ಭೂತನಾಥ ದೇವಾಲಯಗಳ ಸೂರ್ಯಾಸ್ತದ ಅಪೂರ್ವ ನೋಟ',
      'ಉತ್ತರ ಕೋಟೆ ಮತ್ತು ಕ್ಯಾನನ್ ತೋಪುಗಳಿರುವ ಪ್ರಾಚೀನ ಶಿಲಾ ಮೆಟ್ಟಿಲುಗಳು',
    ],
    visitorTipsEn: [
      'Visit between 6:30 AM and 9:00 AM for soft morning light and cooler climbing temperatures.',
      'Beware of bonnet macaques (monkeys) along the stairs; keep bags zipped and snacks hidden.',
      'A combo ASI ticket purchased via online QR code saves time at the entrance turnstile.',
    ],
    visitorTipsKn: [
      'ಬಿಸಿಲಿನ ತಾಪ ತಪ್ಪಿಸಲು ಬೆಳಗ್ಗೆ ೬:೩೦ ರಿಂದ ೯:೦೦ ರ ನಡುವೆ ಭೇಟಿ ನೀಡುವುದು ಸೂಕ್ತ.',
      'ಮೆಟ್ಟಿಲುಗಳ ಬಳಿ ಕೋತಿಗಳ ಕಾಟವಿರುವುದರಿಂದ ಆಹಾರ ಪದಾರ್ಥಗಳನ್ನು ಕೈಯಲ್ಲಿ ಹಿಡಿಯಬೇಡಿ.',
      'ಪ್ರವೇಶ ದ್ವಾರದಲ್ಲಿ ಆನ್‌ಲೈನ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ಮೂಲಕ ಟಿಕೆಟ್ ಪಡೆಯಬಹುದು.',
    ],
    isUnesco: false,
  },
  {
    id: 'bhootanatha-badami',
    name: 'Bhootanatha Temples & Agastya Lake',
    nameKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಸಂಕೀರ್ಣ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ',
    cluster: 'Badami',
    clusterKn: 'ಬಾದಾಮಿ',
    tagline: '7th-century golden sandstone shrines projecting into the tranquil sacred waters of Agastya Tirtha',
    taglineKn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಪವಿತ್ರ ಜಲದಲ್ಲಿ ಕಂಗೊಳಿಸುವ ೭ನೇ ಶತಮಾನದ ಮರಳುಗಲ್ಲಿನ ಶಿವಾಲಯ',
    century: '7th to 11th Century CE',
    dynasty: 'Badami Chalukyas & Kalyana Chalukyas',
    dynastyKn: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು & ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರು',
    architecturalStyle: 'Waterfront Sandstone Dravida Sanctuary',
    architecturalStyleKn: 'ಮರಳುಗಲ್ಲಿನ ಜಲತೀರ ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪ',
    image: '/assets/monuments/bhootanatha_temple.jpg',
    gallery: [
      '/assets/monuments/bhootanatha_temple.jpg',
      '/assets/monuments/badami_caves.jpg',
      '/assets/monuments/badami_nataraja.jpg',
    ],
    operationalTimings: '6:00 AM – 6:30 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ಸಂಜೆ ೬:೩೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 0,
      foreigner: 0,
      camera: 0,
    },
    distanceFromBadamiKm: 1.2,
    coordinates: { lat: 15.9208, lng: 75.6865 },
    audioDurationSeconds: 135,
    audioFileEn: '/assets/audio/bhootanatha-badami_en.mp3',
    audioFileKn: '/assets/audio/bhootanatha-badami_kn.mp3',
    audioSnippetEn:
      'You are standing at the eastern edge of Agastya Lake in front of the legendary Bhootanatha Temples. Built in the late 7th century, these warm yellow sandstone shrines appear to float upon the waters when the lake is full. As sunset approaches, the crimson cliffs of Badami cast their glowing reflections across the rippling surface.',
    audioSnippetKn:
      'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಪೂರ್ವ ತೀರದಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯದ ಎದುರು ನೀವಿದ್ದೀರಿ. ಕ್ರಿ.ಶ. ೭ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ಮರಳುಗಲ್ಲಿನ ಶಿವಾಲಯವು ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಪ್ರತಿಬಿಂಬಿತವಾಗುವ ದೃಶ್ಯ ಅತ್ಯಂತ ರಮಣೀಯ. ಸಂಜೆಯ ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ಬಾದಾಮಿಯ ಕೆಂಪು ಬಂಡೆಗಳ ಸುವರ್ಣ ಕಾಂತಿ ನೀರಿನಲ್ಲಿ ಮಿನುಗುತ್ತದೆ.',
    descriptionEn:
      'The Bhootanatha group comprises two major clusters: the primary 7th-century shrine jutting directly into the eastern shores of Agastya Lake, and the northeastern Mallikarjuna group built during the 11th-century Kalyana Chalukya period. Surrounded on three sides by towering sandstone bluffs, it is considered the most poetic architectural composition in Karnataka.',
    descriptionKn:
      'ಅಗಸ್ತ್ಯ ಸರೋವರದ ನೀರಿನೊಳಗೆ ವಿಸ್ತರಿಸಿರುವ ಮುಖ್ಯ ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಈಶಾನ್ಯದ ಮಲ್ಲಿಕಾರ್ಜುನ ಗುಂಪು ಚಾಲುಕ್ಯರ ಅಪ್ರತಿಮ ಸೌಂದರ್ಯಪ್ರಜ್ಞೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ. ಸುತ್ತಲೂ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗಿರಿಶ್ರೇಣಿಯಿದ್ದು, ಛಾಯಾಗ್ರಾಹಕರ ಸ್ವರ್ಗವೆನಿಸಿದೆ.',
    keyFeaturesEn: [
      'Scenic waterfront sanctum with stone steps leading directly into the sacred water tank',
      'Pillared open mantapa built into the sandstone lakebed',
      'Best panoramic golden hour and sunset vantage point in the entire Badami circuit',
      'Carved rock-face relief panels of Varaha, Vishnu, and Shiva on surrounding cliffs',
    ],
    keyFeaturesKn: [
      'ನೇರವಾಗಿ ಸರೋವರದ ನೀರಿಗೆ ಇಳಿಯುವ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳುಳ್ಳ ಜಲಮಂದಿರ',
      'ಮರಳುಗಲ್ಲಿನ ಕಂಬಗಳ ಸುಂದರ ಮುಖಮಂಟಪ',
      'ಬಾದಾಮಿಯಲ್ಲೇ ಅತ್ಯಂತ ಸುಂದರ ಸೂರ್ಯಾಸ್ತದ ಛಾಯಾಗ್ರಹಣ ತಾಣ',
      'ಹಿಂಬದಿಯ ಬಂಡೆಗಳ ಮೇಲೆ ಕೆತ್ತಲಾದ ವರಾಹ, ವಿಷ್ಣು ಮತ್ತು ಶಿವನ ಉಬ್ಬು ಶಿಲ್ಪಗಳು',
    ],
    visitorTipsEn: [
      'Arrive around 4:30 PM to catch the magical transition from afternoon light to sunset reflection.',
      'Walk carefully on the wet stone steps near the water’s edge.',
      'Combine this with a climb to the Badami North Fort and upper Shivalaya temples.',
    ],
    visitorTipsKn: [
      'ಸಂಜೆ ೪:೩೦ ರ ಸುಮಾರಿಗೆ ಭೇಟಿ ನೀಡಿ ಸೂರ್ಯಾಸ್ತದ ಅದ್ಭುತ ಪ್ರತಿಬಿಂಬವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
      'ನೀರಿನ ಬಳಿಯ ಮೆಟ್ಟಿಲುಗಳ ಮೇಲೆ ಜಾಗರೂಕತೆಯಿಂದ ಹೆಜ್ಜೆ ಇಡಿ.',
      'ಇಲ್ಲಿಂದಲೇ ಉತ್ತರ ಕೋಟೆ ಮತ್ತು ಮೇಲಿನ ಶಿವಾಲಯಗಳ ಮೆಟ್ಟಿಲುಗಳ ಹಾದಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.',
    ],
    isUnesco: false,
  },
  {
    id: 'pattadakal-unesco',
    name: 'Pattadakal UNESCO World Heritage Complex',
    nameKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ',
    cluster: 'Pattadakal',
    clusterKn: 'ಪಟ್ಟದಕಲ್ಲು',
    tagline: 'The coronation capital where Northern Nagara and Southern Dravida styles fused',
    taglineKn: 'ಚಾಲುಕ್ಯರ ಪಟ್ಟಾಭಿಷೇಕ ನಗರಿ ಮತ್ತು ನಾಗರ-ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪ ಸಂಗಮ',
    century: '7th to 8th Century CE (c. 740 CE)',
    dynasty: 'Badami Chalukyas (Vikramaditya II & Queen Lokamahadevi)',
    dynastyKn: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು (ವಿಕ್ರಮಾದಿತ್ಯ ೨ ಮತ್ತು ಲೋಕಮಹಾದೇವಿ)',
    architecturalStyle: 'Vesara / Synthesis of Rekha-Nagara & Dravidian Vimana',
    architecturalStyleKn: 'ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಗಳ ಸಂಗಮ (ವೇಸರ ಶೈಲಿ)',
    image: '/assets/monuments/pattadakal_virupaksha.jpg',
    gallery: [
      '/assets/monuments/pattadakal_virupaksha.jpg',
      '/assets/monuments/pattadakal_complex.jpg',
    ],
    operationalTimings: '6:00 AM – 6:00 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ಸಂಜೆ ೬:೦೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 40,
      foreigner: 600,
      camera: 25,
    },
    distanceFromBadamiKm: 22,
    coordinates: { lat: 15.9485, lng: 75.8163 },
    audioDurationSeconds: 160,
    audioFileEn: '/assets/audio/pattadakal-unesco_en.mp3',
    audioFileKn: '/assets/audio/pattadakal-unesco_kn.mp3',
    audioSnippetEn:
      'You are standing within Pattadakal, a designated UNESCO World Heritage Site on the peaceful banks of the Malaprabha River. This sacred ground was the royal ceremonial coronation site, Pattada-Kisuvolal. Look closely at the contrast between temples: the Virupaksha and Mallikarjuna temples celebrate Southern Dravidian vimanas, while Galaganatha and Kadasiddheshwara mirror the curved curvilinear towers of Northern Nagara temples. The master architect Gundana Anivaritachari was awarded the supreme royal title of Tribhuvanacharya here.',
    audioSnippetKn:
      'ಮಲಪ್ರಭಾ ನದಿಯ ತಟದಲ್ಲಿರುವ ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣ. ಚಾಲುಕ್ಯ ಅರಸರ ಪಟ್ಟಾಭಿಷೇಕಗಳು ನಡೆಯುತ್ತಿದ್ದ ಪವಿತ್ರ ನಗರವಿದು. ಇಲ್ಲಿರುವ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳು ದಕ್ಷಿಣದ ದ್ರಾವಿಡ ಶೈಲಿಯನ್ನು ಪ್ರತಿನಿಧಿಸಿದರೆ, ಕಾಶಿ ವಿಶ್ವನಾಥ ಮತ್ತು ಗಳಗನಾಥ ದೇವಾಲಯಗಳು ಉತ್ತರದ ನಾಗರ ಶೈಲಿಯನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತವೆ. ಈ ದೇವಾಲಯವು ಎಲ್ಲೋರಾದ ಕೈಲಾಸ ದೇವಾಲಯದ ನಿರ್ಮಾಣಕ್ಕೆ ಪ್ರೇರಣೆಯಾಗಿದೆ.',
    descriptionEn:
      'Pattadakal represents the high point of an eclectic art which, in the 7th and 8th centuries under the Chalukya dynasty, achieved a harmonious blend of architectural forms from northern and southern India. Nine Hindu temples and one Jain sanctuary stand within this manicured archaeological park along the Malaprabha River.',
    descriptionKn:
      'ಕ್ರಿ.ಶ. ೭ ಮತ್ತು ೮ನೇ ಶತಮಾನದಲ್ಲಿ ಚಾಲುಕ್ಯರಿಂದ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಪಟ್ಟದಕಲ್ಲು ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ವಾಸ್ತುಶಿಲ್ಪಗಳ ಅದ್ಭುತ ಸಂಗಮ. ಇಲ್ಲಿ ಒಂಬತ್ತು ಹಿಂದೂ ದೇವಾಲಯಗಳು ಮತ್ತು ಒಂದು ಜೈನ ಬಸದಿ ಇದ್ದು, ವಾಸ್ತುಶಿಲ್ಪದ ಪರಮೋಚ್ಛ ಶಿಖರವೆನಿಸಿದೆ.',
    keyFeaturesEn: [
      'Virupaksha Temple: Commissioned by Queen Lokamahadevi in 740 CE to celebrate victory over Kanchi',
      'Inscriptions honoring royal architect Gundana Anivaritachari with title "Tribhuvanacharya"',
      'Continuous friezes of episodes from the Mahabharata, Ramayana, and Panchatantra',
      'Direct structural ancestor and model for the monolithic Kailash Temple at Ellora',
    ],
    keyFeaturesKn: [
      'ಕಂಚಿಯ ಪಲ್ಲವರ ಮೇಲಿನ ವಿಜಯೋತ್ಸವಕ್ಕಾಗಿ ರಾಣಿ ಲೋಕಮಹಾದೇವಿ ನಿರ್ಮಿಸಿದ ಭವ್ಯ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ',
      'ಪ್ರಧಾನ ಶಿಲ್ಪಿ ಗುಂಡನ ಅನಿವಾರಿತಾಚಾರಿಗೆ "ತ್ರಿಭುವನಾಚಾರ್ಯ" ಪ್ರಶಸ್ತಿ ನೀಡಿದ ಶಿಲಾಶಾಸನಗಳು',
      'ಗೋಡೆಗಳ ಮೇಲೆ ಕೆತ್ತಲಾದ ರಾಮಾಯಣ, ಮಹಾಭಾರತ ಮತ್ತು ಪಂಚತಂತ್ರದ ಕಥಾನಕಗಳು',
      'ಎಲ್ಲೋರಾದ ವಿಶ್ವವಿಖ್ಯಾತ ಕೈಲಾಸ ದೇವಾಲಯಕ್ಕೆ ಮಾದರಿಯಾದ ವಾಸ್ತುಶಿಲ್ಪ',
    ],
    visitorTipsEn: [
      'Allow at least 2 hours to walk between Virupaksha, Mallikarjuna, Sangameshwara, and Papanatha temples.',
      'Sunset along the Malaprabha River bank behind the temples offers breathtaking golden reflections.',
      'Sound and light festival takes place annually in winter (January-February).',
    ],
    visitorTipsKn: [
      'ಸಂಪೂರ್ಣ ಸಂಕೀರ್ಣವನ್ನು ವೀಕ್ಷಿಸಲು ಕನಿಷ್ಠ ೨ ಗಂಟೆಗಳ ಕಾಲಾವಕಾಶ ಮೀಸಲಿಡಿ.',
      'ದೇವಾಲಯದ ಹಿಂಭಾಗದ ಮಲಪ್ರಭಾ ನದಿಯ ತಟದಲ್ಲಿ ಸೂರ್ಯಾಸ್ತದ ಸಮಯ ಅತ್ಯಂತ ರಮಣೀಯವಾಗಿರುತ್ತದೆ.',
      'ಪ್ರತಿ ವರ್ಷ ಚಳಿಗಾಲದಲ್ಲಿ (ಜನವರಿ-ಫೆಬ್ರವರಿ) ಪಟ್ಟದಕಲ್ಲು ಉತ್ಸವ ನಡೆಯುತ್ತದೆ.',
    ],
    isUnesco: true,
  },
  {
    id: 'aihole-cradle',
    name: 'Aihole Temple Complex ("Cradle of Architecture")',
    nameKn: 'ಐಹೊಳೆ ದೇವಾಲಯ ಸಂಕೀರ್ಣ ("ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು")',
    cluster: 'Aihole',
    clusterKn: 'ಐಹೊಳೆ',
    tagline: 'The ancient experimental workshop with over 120 stone temples dating back to 450 CE',
    taglineKn: '೧೨೦ಕ್ಕೂ ಹೆಚ್ಚು ದೇವಾಲಯಗಳಿರುವ ಭಾರತೀಯ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಾಚೀನ ಕಲಾಶಾಲೆ',
    century: '5th to 12th Century CE (c. 450 - 750 CE core)',
    dynasty: 'Early Chalukyas (Aryapura Merchant Guild)',
    dynastyKn: 'ಆರಂಭಿಕ ಚಾಲುಕ್ಯರು ಮತ್ತು ಅಯ್ಯಾವೊಳೆ ಐನೂರ್ವರ ವಣಿಕ ಸಂಘ',
    architecturalStyle: 'Experimental Hindu, Jain, and Buddhist Rock-cut and Structural Styles',
    architecturalStyleKn: 'ಪ್ರಾಯೋಗಿಕ ಗಜಪೃಷ್ಠ ಮತ್ತು ಶಿಖರ ವಾಸ್ತುಶಿಲ್ಪ',
    image: '/assets/monuments/aihole_durga.jpg',
    gallery: [
      '/assets/monuments/aihole_durga.jpg',
      '/assets/monuments/pattadakal_virupaksha.jpg',
    ],
    operationalTimings: '6:00 AM – 6:00 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ಸಂಜೆ ೬:೦೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 25,
      foreigner: 300,
      camera: 25,
    },
    distanceFromBadamiKm: 34,
    coordinates: { lat: 16.0199, lng: 75.8821 },
    audioDurationSeconds: 155,
    audioFileEn: '/assets/audio/aihole-cradle_en.mp3',
    audioFileKn: '/assets/audio/aihole-cradle_kn.mp3',
    audioSnippetEn:
      'Aihole is universally hailed as the Cradle of Indian Temple Architecture. It was here that early guild stonecutters experimented with floor plans, roofing, and decorative lintels. Observe the world-famous Durga Temple with its horseshoe apsidal plan reminiscent of an ancient Buddhist chaitya. Step inside Lad Khan Temple to see how royal assembly halls were adapted into sacred sanctums, and hike up to Meguti Temple to read court poet Ravikirti’s 634 CE Sanskrit inscription celebrating King Pulakeshin II defeating Emperor Harsha.',
    audioSnippetKn:
      'ಐಹೊಳೆಯನ್ನು ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಇಲ್ಲಿ ೧೨೦ಕ್ಕೂ ಹೆಚ್ಚು ದೇವಾಲಯಗಳಿದ್ದು, ಶಿಲ್ಪಿಗಳ ಪ್ರಯೋಗಶಾಲೆಯಾಗಿತ್ತು. ಆನೆಯ ಬೆನ್ನಿನಂತಹ ದುರ್ಗಾ ದೇವಾಲಯ, ಪ್ರಾಚೀನ ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ ಮತ್ತು ಮೇಗುತಿ ಗುಡ್ಡದ ಮೇಲಿರುವ ಜೈನ ದೇವಾಲಯದಲ್ಲಿ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯು ಹರ್ಷವರ್ಧನನನ್ನು ಸೋಲಿಸಿದ ಬಗ್ಗೆ ಬರೆದ ರವಿಕೀರ್ತಿಯ ೬೩೪ರ ಶಾಸನ ಇಲ್ಲಿದೆ.',
    descriptionEn:
      'Historic Aryapura (modern Aihole) was both a thriving medieval mercantile capital of the 500-strong Ayyavole merchant guild and an open-air stone laboratory. With over 120 temples dotting the surrounding village fields, Aihole documents the evolution of Indian temple design from elementary flat-roofed shrines to ornate tiered towers.',
    descriptionKn:
      'ಪ್ರಾಚೀನ ಆರ್ಯಪುರ ಎಂದೇ ಖ್ಯಾತವಾಗಿದ್ದ ಐಹೊಳೆ ಅಯ್ಯಾವೊಳೆ ಐನೂರ್ವರ ಪ್ರಸಿದ್ಧ ವಣಿಕ ಸಂಘದ ಕೇಂದ್ರವಾಗಿತ್ತು. ಇಲ್ಲಿರುವ ದೇವಾಲಯಗಳಲ್ಲಿ ಆರಂಭಿಕ ಚಪ್ಪಟೆ ಮೇಲ್ಛಾವಣಿಯಿಂದ ಹಿಡಿದು ಶಿಖರಗಳವರೆಗಿನ ದೇವಾಲಯ ವಿಕಾಸದ ಹಂತಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಬಹುದು.',
    keyFeaturesEn: [
      'Durga Temple: Iconic apsidal (Gajaprishtha) peristyle with exquisite Mahishasuramardini relief',
      'Lad Khan Temple: One of the earliest stone shrines (c. 5th century) resembling a wooden log cabin',
      'Ravana Phadi Cave: 6th-century rock-cut sanctuary dedicated to Nataraja with Saptamatrikas',
      'Meguti Hill Inscription: 634 CE poem by Jain scholar Ravikirti recording Pulakeshin II\'s triumphs',
    ],
    keyFeaturesKn: [
      'ದುರ್ಗಾ ದೇವಾಲಯ: ಅಪರೂಪದ ಗಜಪೃಷ್ಠ ವಿನ್ಯಾಸ ಮತ್ತು ಮಹಿಷಾಸುರಮರ್ದಿನಿ ಶಿಲ್ಪ',
      'ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ: ಮರದ ರಚನೆಯ ಮಾದರಿಯಲ್ಲೇ ಕಲ್ಲಿನಲ್ಲಿ ನಿರ್ಮಿಸಿದ ೫ನೇ ಶತಮಾನದ ದೇವಾಲಯ',
      'ರಾವಣ ಫಡಿ ಗುಹೆ: ಸಪ್ತಮಾತೃಕೆಯರೊಂದಿಗೆ ನರ್ತಿಸುವ ನಟರಾಜನ ಸುಂದರ ಗುಹಾ ಶಿಲ್ಪ',
      'ಮೇಗುತಿ ಶಾಸನ: ರವಿಕೀರ್ತಿ ರಚಿತ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯ ಜಯಭೇರಿಯನ್ನು ಸಾರುವ ಸಂಸ್ಕೃತ ಶಿಲಾಶಾಸನ',
    ],
    visitorTipsEn: [
      'Rent a bicycle or hire a local auto to explore the scattered temples (Meguti, Ravana Phadi, Konti Gudi, Huchappayya Gudi).',
      'Visit the ASI Archaeological Museum on-site to view excavated Chalukyan stone sculptures and relics.',
      'Carry sun protection as walking between monument clusters involves open village trails.',
    ],
    visitorTipsKn: [
      'ಗ್ರಾಮದಾದ್ಯಂತ ಹರಡಿರುವ ಇತರ ದೇವಾಲಯಗಳನ್ನು (ಮೇಗುತಿ, ರಾವಣ ಫಡಿ, ಕೊಂಟಿಗುಡಿ) ನೋಡಲು ಆಟೋ ಅಥವಾ ಸೈಕಲ್ ಬಳಸಿ.',
      'ಆವರಣದಲ್ಲಿರುವ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯಕ್ಕೆ ತಪ್ಪದೇ ಭೇಟಿ ನೀಡಿ.',
      'ತೆರೆದ ಬಯಲು ಪ್ರದೇಶವಾಗಿರುವುದರಿಂದ ಛತ್ರಿ ಅಥವಾ ಟೋಪಿ ಧರಿಸಿ.',
    ],
    isUnesco: false,
  },
  {
    id: 'mahakuta-springs',
    name: 'Mahakuta Temple Complex & Vishnu Pushkarini',
    nameKn: 'ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಂಕೀರ್ಣ & ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ',
    cluster: 'Mahakuta',
    clusterKn: 'ಮಹಾಕೂಟ',
    tagline: 'Tranquil Shaivite pilgrimage enclave shaded by banyan groves with a sacred perennial spring',
    taglineKn: 'ಆಲದ ಮರಗಳ ನೆರಳಿನಲ್ಲಿರುವ ಪವಿತ್ರ ಶೈವ ಕ್ಷೇತ್ರ ಮತ್ತು ನಿತ್ಯ ಜಲಧಾರೆಯ ಪುಷ್ಕರಿಣಿ',
    century: 'Early 7th Century CE (c. 600 - 625 CE)',
    dynasty: 'Badami Chalukyas (Mangalesha & Pulakeshin II)',
    dynastyKn: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು (ಮಂಗಲೇಶ ಮತ್ತು ಇಮ್ಮಡಿ ಪುಲಕೇಶಿ)',
    architecturalStyle: 'Early Chalukyan Dravida & Kadamba Nagara Hybrid',
    architecturalStyleKn: 'ಆರಂಭಿಕ ಚಾಲುಕ್ಯ ದ್ರಾವಿಡ ಮತ್ತು ಕದಂಬ ನಾಗರ ಶೈಲಿ',
    image: '/assets/monuments/mahakuta_temple.jpg',
    gallery: [
      '/assets/monuments/mahakuta_temple.jpg',
      '/assets/monuments/bhootanatha_temple.jpg',
    ],
    operationalTimings: '6:00 AM – 7:30 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ರಾತ್ರಿ ೭:೩೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 0,
      foreigner: 0,
      camera: 0,
    },
    distanceFromBadamiKm: 14,
    coordinates: { lat: 15.9333, lng: 75.7277 },
    audioDurationSeconds: 130,
    audioFileEn: '/assets/audio/mahakuta-springs_en.mp3',
    audioFileKn: '/assets/audio/mahakuta-springs_kn.mp3',
    audioSnippetEn:
      'Hidden in a tranquil valley bordered by sandstone hills lies Mahakuta, dedicated to Lord Mahakuteshwara. At the center of the courtyard is the sacred Vishnu Pushkarini, a stone-lined pool fed by an underground natural freshwater spring that never runs dry. In the middle of the pool stands a submerged small shrine enshrining a rare Panchamukha Linga—a five-faced Shiva representing the cosmic elements of creation.',
    audioSnippetKn:
      'ಬಾದಾಮಿಯ ಸಮೀಪದ ಬೆಟ್ಟಗಳ ಕಣಿವೆಯಲ್ಲಿ ಮಹಾಕೂಟದ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಿದೆ. ಇಲ್ಲಿನ ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿಯಲ್ಲಿ ವರ್ಷವಿಡೀ ಸಿಹಿನೀರಿನ ನೈಸರ್ಗಿಕ ಬುಗ್ಗೆ ಹರಿಯುತ್ತಿರುತ್ತದೆ. ಕಲ್ಯಾಣಿಯ ಮಧ್ಯದಲ್ಲಿ ಅಪರೂಪದ ಪಂಚಮುಖ ಲಿಂಗವಿದ್ದು, ಭಕ್ತರು ಇಲ್ಲಿ ಪವಿತ್ರ ಸ್ನಾನ ಮಾಡುತ್ತಾರೆ. ಮಹಾಕೂಟೇಶ್ವರ ದೇವಾಲಯದ ಆವರಣವು ಪ್ರಾಚೀನ ಆಲದ ಮರಗಳಿಂದ ಕೂಡಿದ್ದು ಅಪೂರ್ವ ಶಾಂತಿಯನ್ನು ನೀಡುತ್ತದೆ.',
    descriptionEn:
      'Mahakuta was once a revered retreat for ascetics and sage Agastya. The complex retains an active devotional atmosphere with over two dozen stone shrines, massive banyans, and the historic Mahakuta Pillar Inscription of 602 CE recording military grants by King Mangalesha.',
    descriptionKn:
      'ಅಗಸ್ತ್ಯ ಮುನಿಗಳ ತಪೋಭೂಮಿ ಎಂದೇ ನಂಬಲಾದ ಮಹಾಕೂಟವು ಪ್ರಶಾಂತ ಆಧ್ಯಾತ್ಮಿಕ ತಾಣ. ಕ್ರಿ.ಶ. ೬೦೨ ರ ಮಂಗಲೇಶ ರಾಜನ ಮಹಾಕೂಟ ಸ್ತಂಭ ಶಾಸನವು ಇಲ್ಲಿ ದೊರೆತಿದ್ದು, ಚಾಲುಕ್ಯರ ಇತಿಹಾಸದ ಮೇಲೆ ಮಹತ್ವದ ಬೆಳಕು ಚೆಲ್ಲುತ್ತದೆ.',
    keyFeaturesEn: [
      'Vishnu Pushkarini: Pristine natural spring pool with submerged four-faced + top-faced Shiva Linga',
      'Mahakuteshwara Temple: Intricate carvings of Ardhanarishwara and Shiva Gangadhara',
      'Ancient Banyan Grove providing cool canopy throughout the hot Deccan afternoons',
      'Historic 602 CE Mahakuta Pillar Inscription site',
    ],
    keyFeaturesKn: [
      'ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ: ಸದಾ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ನೀರಿನ ಬುಗ್ಗೆ ಮತ್ತು ಪಂಚಮುಖ ಲಿಂಗದ ಗುಡಿ',
      'ಮಹಾಕೂಟೇಶ್ವರ ದೇವಾಲಯ: ಅರ್ಧನಾರೀಶ್ವರ ಮತ್ತು ಗಂಗಾಧರ ಶಿವನ ಅಪೂರ್ವ ಶಿಲ್ಪಗಳು',
      'ಶತಮಾನಗಳಷ್ಟು ಪುರಾತನವಾದ ತಂಪಾದ ಹಸಿರು ಆಲದ ಮರಗಳ ವೃಕ್ಷರಾಶಿ',
      'ಕ್ರಿ.ಶ. ೬೦೨ ರ ಐತಿಹಾಸಿಕ ಮಹಾಕೂಟ ಸ್ತಂಭ ಶಾಸನ',
    ],
    visitorTipsEn: [
      'A serene, crowd-free alternative to Badami caves during midday heat.',
      'Visitors are welcome to dip their feet or take a bath in the holy pushkarini; carry a change of clothes if bathing.',
      'Local vendors outside sell sweet jaggery tea and bananas.',
    ],
    visitorTipsKn: [
      'ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲಿನಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಅತ್ಯಂತ ಪ್ರಶಾಂತ ಸ್ಥಳ.',
      'ಪುಷ್ಕರಿಣಿಯಲ್ಲಿ ಪವಿತ್ರ ಸ್ನಾನ ಮಾಡಲು ಇಚ್ಛಿಸಿದರೆ ಬಟ್ಟೆಗಳನ್ನು ತರಲು ಮರೆಯಬೇಡಿ.',
      'ಪ್ರವೇಶ ಉಚಿತವಾಗಿದೆ ಮತ್ತು ಛಾಯಾಗ್ರಹಣಕ್ಕೆ ಯಾವುದೇ ನಿರ್ಬಂಧವಿಲ್ಲ.',
    ],
    isUnesco: false,
  },
  {
    id: 'banashankari-temple',
    name: 'Banashankari Amma Temple & Haridra Tirtha',
    nameKn: 'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ',
    cluster: 'Banashankari',
    clusterKn: 'ಬನಶಂಕರಿ',
    tagline: 'Sacred Shakambhari shrine beside the historic step-well pond and three-tiered lamp towers',
    taglineKn: 'ಹರಿದ್ರಾ ತೀರ್ಥ ಮತ್ತು ಭವ್ಯ ದೀಪಸ್ತಂಭಗಳಿರುವ ಶಾಕಂಭರಿ ದೇವಿಯ ಪುಣ್ಯಕ್ಷೇತ್ರ',
    century: 'Originally 7th Century Chalukyan; Expanded in 17th Century',
    dynasty: 'Kalyana Chalukyas & Marathas',
    dynastyKn: 'ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರು ಮತ್ತು ಮರಾಠರು',
    architecturalStyle: 'Dravidian temple architecture with Vijayanagara & Maratha deepa stambhas',
    architecturalStyleKn: 'ದ್ರಾವಿಡ ಮತ್ತು ವಿಜಯನಗರ-ಮರಾಠಾ ಶೈಲಿಯ ದೀಪಸ್ತಂಭಗಳು',
    image: '/assets/monuments/banashankari_temple.jpg',
    gallery: [
      '/assets/monuments/banashankari_temple.jpg',
      '/assets/monuments/banashankari_deepastambha.jpg',
    ],
    operationalTimings: '6:00 AM – 8:30 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ರಾತ್ರಿ ೮:೩೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 0,
      foreigner: 0,
      camera: 0,
    },
    distanceFromBadamiKm: 5,
    coordinates: { lat: 15.8778, lng: 75.6989 },
    audioDurationSeconds: 125,
    audioFileEn: '/assets/audio/banashankari-temple_en.mp3',
    audioFileKn: '/assets/audio/banashankari-temple_kn.mp3',
    audioSnippetEn:
      'You have arrived at Banashankari Amma Temple in Cholachagudd, just 5 kilometers from Badami. Revered as Shakambhari—the goddess of greenery and agricultural prosperity—she is the patron deity of Bagalkote and its weaving community. Step onto the stone pavilion of Haridra Tirtha, a massive sacred pond enclosed on all four sides by colonnaded cloisters. On the northern bank rise the famed Deepa Stambhas, multistorey stone lamp towers illuminated with hundreds of clay lamps during festivals.',
    audioSnippetKn:
      'ಬಾದಾಮಿಯಿಂದ ಕೇವಲ ೫ ಕಿ.ಮೀ ದೂರದಲ್ಲಿರುವ ಚೋಳಚಗುಡ್ಡದ ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಸ್ಥಾನಕ್ಕೆ ಸ್ವಾಗತ. ಶಾಕಂಭರಿ ದೇವಿಯ ಸನ್ನಿಧಾನವಿದು. ದೇವಾಲಯದ ಎದುರಿನ ವಿಶಾಲವಾದ ಹರಿದ್ರಾ ತೀರ್ಥ ಕಲ್ಯಾಣಿ ಮತ್ತು ಅದರ ದಂಡೆಯ ಮೇಲಿರುವ ಎತ್ತರದ ಕಲ್ಲಿನ ದೀಪಸ್ತಂಭಗಳು ಈ ಕ್ಷೇತ್ರದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆ. ಇಳಕಲ್ ನೇಕಾರರ ಆರಾಧ್ಯ ದೈವವಾಗಿರುವ ಬನಶಂಕರಿ ಜಾತ್ರೆ ಉತ್ತರ ಕರ್ನಾಟಕದಲ್ಲೇ ಅತಿ ದೊಡ್ಡದು.',
    descriptionEn:
      'Surrounded by coconut palms and the waters of Haridra Tirtha, Banashankari Temple is one of Karnataka\'s most beloved Shakti Peethas. The black stone idol depicts the 8-armed Goddess riding a fierce lion. The annual month-long Banashankari Jathre in January draws hundreds of thousands of pilgrims, artisans, and cattle traders.',
    descriptionKn:
      'ಹರಿದ್ರಾ ತೀರ್ಥದ ತೀರದಲ್ಲಿರುವ ಬನಶಂಕರಿ ದೇವಾಲಯವು ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಶಕ್ತಿಪೀಠಗಳಲ್ಲೊಂದು. ಸಿಂಹವಾಹಿನಿಯಾದ ಶಾಕಂಭರಿ ದೇವಿಯ ಕಪ್ಪು ಶಿಲೆಯ ಮೂರ್ತಿ ಭಕ್ತರ ಇಷ್ಟಾರ್ಥಗಳನ್ನು ಈಡೇರಿಸುತ್ತದೆ. ಜನವರಿಯಲ್ಲಿ ನಡೆಯುವ ಬನಶಂಕರಿ ಜಾತ್ರೆ ಉತ್ತರ ಕರ್ನಾಟಕದ ಅತಿ ದೊಡ್ಡ ಸಾಂಸ್ಕೃತಿಕ ಹಾಗೂ ವ್ಯಾಪಾರ ಉತ್ಸವ.',
    keyFeaturesEn: [
      'Black chlorite stone idol of 8-armed Banashankari crushing demon Durgamasura underfoot',
      'Haridra Tirtha: Grand square stepped tank surrounded by stone corridors built in 1733',
      'Pair of towering three-storey stone Deepa Stambhas (oil lamp pillars)',
      'Site of the legendary Banashankari Jathre (annual cultural and handloom fair)',
    ],
    keyFeaturesKn: [
      'ದುರ್ಗಮಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ಸಿಂಹವಾಹಿನಿ ಅಷ್ಟಭುಜಧಾರಿ ಬನಶಂಕರಿ ದೇವಿಯ ವಿಗ್ರಹ',
      '೧೭೩೩ ರಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಕಲ್ಲಿನ ಮಂಟಪಗಳಿಂದ ಸುತ್ತುವರೆದ ಭವ್ಯ ಹರಿದ್ರಾ ತೀರ್ಥ ಕಲ್ಯಾಣಿ',
      'ಮೂರು ಹಂತಗಳ ಎತ್ತರದ ಕಲ್ಲಿನ ದೀಪಸ್ತಂಭಗಳು',
      'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ವೈಭವವನ್ನು ಪ್ರದರ್ಶಿಸುವ ಐತಿಹಾಸಿಕ ಬನಶಂಕರಿ ಜಾತ್ರೆ',
    ],
    visitorTipsEn: [
      'Do not miss trying hot Jolada Rotti, Yennegayi, and Shenga Chutney sold at the local village stalls near the pond.',
      'Early morning (6:30 AM) and evening aarti (7:00 PM) are the most spiritually uplifting times to visit.',
      'Photography inside the inner sanctum is restricted, but the courtyard and tank are open for photos.',
    ],
    visitorTipsKn: [
      'ದೇವಸ್ಥಾನದ ಹೊರಗಿನ ಮಳಿಗೆಗಳಲ್ಲಿ ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ ಮತ್ತು ಬದನೆಕಾಯಿ ಪಲ್ಯ ಊಟ ಸವಿಯಿರಿ.',
      'ಬೆಳಗಿನ ಪೂಜೆ ಅಥವಾ ಸಂಜೆ ೭:೦೦ ರ ಮಹಾಮಂಗಳಾರತಿ ಸಮಯದಲ್ಲಿ ಭೇಟಿ ನೀಡುವುದು ಶ್ರೇಷ್ಠ.',
      'ಗರ್ಭಗುಡಿಯ ಒಳಗೆ ಛಾಯಾಗ್ರಹಣ ನಿಷೇಧಿಸಲಾಗಿದೆ, ಆದರೆ ಹೊರಗಿನ ಆವರಣದಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಬಹುದು.',
    ],
    isUnesco: false,
  },
  {
    id: 'kudalasangama-confluence',
    name: 'Kudalasangama Aikya Mantapa & Confluence',
    nameKn: 'ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ನದೀ ಸಂಗಮ',
    cluster: 'Kudalasangama',
    clusterKn: 'ಕೂಡಲಸಂಗಮ',
    tagline: 'The sacred river confluence where 12th-century philosopher Jagadjyothi Basaveshwara attained samadhi',
    taglineKn: 'ಜಗಜ್ಯೋತಿ ಬಸವೇಶ್ವರರು ಐಕ್ಯವಾದ ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಪುಣ್ಯ ಸಂಗಮ',
    century: '12th Century CE Spiritual Site & Chalukyan Sangameshwara Temple',
    dynasty: 'Kalyana Chalukyas & Kudalasangama Development Board',
    dynastyKn: 'ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರು & ಕೂಡಲಸಂಗಮ ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿ',
    architecturalStyle: 'Chalukyan Stone Sanctum & Modern Cylindrical Well Engineering',
    architecturalStyleKn: 'ಚಾಲುಕ್ಯ ದೇವಾಲಯ ಮತ್ತು ಆಧುನಿಕ ಸುರಕ್ಷಿತ ವೃತ್ತಾಕಾರದ ಐಕ್ಯ ಮಂಟಪ',
    image: '/assets/monuments/kudalasangama.jpg',
    gallery: [
      '/assets/monuments/kudalasangama.jpg',
      '/assets/monuments/pattadakal_virupaksha.jpg',
    ],
    operationalTimings: '5:00 AM – 9:00 PM (Daily)',
    operationalTimingsKn: 'ಬೆಳಗ್ಗೆ ೫:೦೦ ರಿಂದ ರಾತ್ರಿ ೯:೦೦ (ಪ್ರತಿದಿನ)',
    entryFee: {
      indian: 0,
      foreigner: 0,
      camera: 0,
    },
    distanceFromBadamiKm: 70,
    coordinates: { lat: 16.2128, lng: 76.0792 },
    audioDurationSeconds: 150,
    audioFileEn: '/assets/audio/kudalasangama-confluence_en.mp3',
    audioFileKn: '/assets/audio/kudalasangama-confluence_kn.mp3',
    audioSnippetEn:
      'You are standing at Kudalasangama, where the mighty Krishna and sacred Malaprabha rivers unite. This is the spiritual fountainhead of the Sharana movement. Here, in the 12th century, Jagadjyothi Basaveshwara preached social equality, dignity of manual labor under the doctrine of Kayakave Kailasa, and rejection of caste hierarchy. When the Almatti Dam backwaters threatened to submerge his sacred Aikya Mantapa, engineers constructed an innovative cylindrical wall to protect the underwater sanctum forever.',
    audioSnippetKn:
      'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ ಕ್ಷೇತ್ರವಾದ ಕೂಡಲಸಂಗಮಕ್ಕೆ ಸ್ವಾಗತ. "ಕಾಯಕವೇ ಕೈಲಾಸ" ಮತ್ತು "ಇವನಾರವ ಇವನಾರವನೆನ್ನದೆ ಇವ ನಮ್ಮವನೆನ್ನಿರೋ" ಎಂದು ಜಗತ್ತಿಗೆ ಸಮಾನತೆಯ ಸಂದೇಶ ಸಾರಿದ ವಿಶ್ವಗುರು ಬಸವಣ್ಣನವರು ಐಕ್ಯವಾದ ಪುಣ್ಯಭೂಮಿ ಇದು. ಆಲಮಟ್ಟಿ ಜಲಾಶಯದ ಹಿನ್ನೀರಿನಿಂದ ಐಕ್ಯ ಮಂಟಪವನ್ನು ಸಂರಕ್ಷಿಸಲು ಬೃಹತ್ ವೃತ್ತಾಕಾರದ ರಕ್ಷಣಾ ಗೋಡೆಯನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ.',
    descriptionEn:
      'Located at the junction of the Krishna and Malaprabha rivers, Kudalasangama is an international pilgrimage center for Lingayats and seekers of egalitarian humanism. The complex houses the ancient Chalukyan Sangameshwara Temple, the protected Aikya Mantapa, and the sprawling Basava International Center with its massive Mahamane auditorium.',
    descriptionKn:
      'ಕೂಡಲಸಂಗಮವು ಶರಣ ಸಾಹಿತ್ಯ ಮತ್ತು ವಚನ ಚಳವಳಿಯ ಪವಿತ್ರ ಕೇಂದ್ರ. ಇಲ್ಲಿ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯ, ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ, ಬಸವ ಅಂತರರಾಷ್ಟ್ರೀಯ ಅಧ್ಯಯನ ಕೇಂದ್ರ ಮತ್ತು ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮ ತಾಣ ಭಕ್ತರ ಮನಸ್ಸಿಗೆ ಶಾಂತಿ ನೀಡುತ್ತದೆ.',
    keyFeaturesEn: [
      'Aikya Mantapa: Final samadhi of Basaveshwara protected by an engineering marvel circular well',
      'Sangameshwara Temple: 12th-century Chalukyan temple with ornate floral doorways and Nandi hall',
      'Scenic river boating across the confluence of Krishna and Malaprabha',
      'Basava Gopura and museum exhibiting authentic palm-leaf and stone Vachana manuscripts',
    ],
    keyFeaturesKn: [
      'ಬಸವಣ್ಣನವರ ಪವಿತ್ರ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ನವೀನ ವೃತ್ತಾಕಾರದ ಸಂರಕ್ಷಣಾ ಗೋಡೆ',
      '೧೨ನೇ ಶತಮಾನದ ಸುಂದರ ಕಲಾತ್ಮಕ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯ',
      'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮದಲ್ಲಿ ದೋಣಿ ವಿಹಾರ',
      'ವಚನ ಸಾಹಿತ್ಯ ಮತ್ತು ಶರಣ ಚಳವಳಿಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯ',
    ],
    visitorTipsEn: [
      'Reach by 4:30 PM to take a sunset river boat ride and attend the evening musical Vachana chanting.',
      'Clean Prasad (free community dining / Dasoha) is offered daily to all visitors without discrimination.',
      'Located approximately 70 km from Badami; can easily be combined with an Almatti Dam garden visit.',
    ],
    visitorTipsKn: [
      'ಸಂಜೆ ೪:೩೦ ರ ವೇಳೆಗೆ ಭೇಟಿ ನೀಡಿ ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ದೋಣಿ ವಿಹಾರ ಮತ್ತು ವಚನ ಗಾಯನವನ್ನು ಆನಂದಿಸಿ.',
      'ಎಲ್ಲ ಭಕ್ತರಿಗೂ ಪ್ರತಿದಿನ ಉಚಿತ ದಾಸೋಹ (ಪ್ರಸಾದ) ವ್ಯವಸ್ಥೆ ಇರುತ್ತದೆ.',
      'ಬಾದಾಮಿಯಿಂದ ಸುಮಾರು ೭೦ ಕಿ.ಮೀ ದೂರದಲ್ಲಿದ್ದು, ಆಲಮಟ್ಟಿ ಜಲಾಶಯದ ಜೊತೆ ಭೇಟಿ ನೀಡಬಹುದು.',
    ],
    isUnesco: false,
  },
];

export const ARTISAN_COOPERATIVES: ArtisanCooperative[] = [
  {
    id: 'ilkal-weavers-coop',
    name: 'Ilkal Heritage Handloom Weavers Cooperative Society',
    nameKn: 'ಇಳಕಲ್ ಪಾರಂಪರಿಕ ಕೈಮಗ್ಗ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ',
    location: 'Ilkal, Bagalkote District',
    locationKn: 'ಇಳಕಲ್, ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ',
    established: '1954',
    artisanCount: 320,
    specialty: 'GI-Tagged Pure Silk & Cotton Ilkal Sarees (Topetenchi Pallu & Chikki Paras Border)',
    specialtyKn: 'ಭೌಗೋಳಿಕ ಸೂಚ್ಯಂಕ (GI #43) ಇಳಕಲ್ ಶುದ್ಧ ರೇಷ್ಮೆ ಮತ್ತು ಹತ್ತಿ ಸೀರೆಗಳು (ಟೋಪೆತೆಂಚಿ ಸೆರಗು)',
    descriptionEn:
      'A registered primary weavers collective dedicated to preserving the 8th-century "Kondi" warp-interlocking technique. Buying directly from this cooperative guarantees fair wages for artisan families, eliminates middlemen, and certifies 100% authentic GI-tagged handloom weave.',
    descriptionKn:
      '೮ನೇ ಶತಮಾನದ ಪ್ರಾಚೀನ "ಕೊಂಡಿ" ತಂತ್ರಜ್ಞಾನವನ್ನು ಉಳಿಸಿಕೊಂಡು ಬಂದಿರುವ ನೇಕಾರರ ಅಧಿಕೃತ ಸಹಕಾರ ಸಂಘ. ಇಲ್ಲಿ ನೇರವಾಗಿ ಖರೀದಿಸುವುದರಿಂದ ನೇಕಾರ ಕುಟುಂಬಗಳಿಗೆ ನೇರ ಲಾಭ ದೊರೆಯುತ್ತದೆ ಮತ್ತು ಅಧಿಕೃತ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಮುದ್ರೆ ದೊರೆಯುತ್ತದೆ.',
    image: '/assets/monuments/ilkal_weaving.jpg',
    priceRange: '₹1,800 – ₹12,500',
    phone: '+91 8351 270420 / +91 94481 22910',
    address: 'Near Weaver Colony, Main Road, Ilkal - 587125, Bagalkote',
    giTagCertified: true,
    masterWeaver: {
      name: 'Shri Basavaraj H. Pattanashetty',
      nameKn: 'ಶ್ರೀ ಬಸವರಾಜ ಎಚ್. ಪಟ್ಟಣಶೆಟ್ಟಿ',
      experienceYears: 42,
      quoteEn:
        'The soul of an Ilkal saree lies in the rhythmic dance of the shuttle and the Kondi knot uniting the red silk pallu with the cotton body. When you drape an Ilkal, you wear our ancestors’ devotion.',
      quoteKn:
        'ಇಳಕಲ್ ಸೀರೆಯ ಜೀವಾಳವೇ ಟೋಪೆತೆಂಚಿ ಕೆಂಪು ಸೆರಗನ್ನು ಹತ್ತಿಯ ಒಡಲಿಗೆ ಬೆಸೆಯುವ ಕೊಂಡಿ ತಂತ್ರಜ್ಞಾನ. ನೀವು ಇಳಕಲ್ ಸೀರೆ ಧರಿಸಿದಾಗ ನಮ್ಮ ಶತಮಾನಗಳ ಪರಂಪರೆಯನ್ನು ಗೌರವಿಸುತ್ತೀರಿ.',
    },
  },
  {
    id: 'guledgudda-khana-society',
    name: 'Guledgudda Traditional Khana & Kasuti Society',
    nameKn: 'ಗುಳೇದಗುಡ್ಡ ಸಾಂಪ್ರದಾಯಿಕ ಖಣ ಮತ್ತು ಕಸೂತಿ ಸಂಘ',
    location: 'Guledgudda (20 km from Badami)',
    locationKn: 'ಗುಳೇದಗುಡ್ಡ (ಬಾದಾಮಿಯಿಂದ ೨೦ ಕಿ.ಮೀ)',
    established: '1968',
    artisanCount: 180,
    specialty: 'Handwoven Khana (Choli/Blouse) fabrics & Handcrafted Kasuti Embroidered Sarees',
    specialtyKn: 'ಕೈಮಗ್ಗದ ಸಾಂಪ್ರದಾಯಿಕ ಖಣ ಮತ್ತು ಕೈ ಕಸೂತಿ ಕಲೆಯ ಸೀರೆಗಳು',
    descriptionEn:
      'Guledgudda is celebrated as India\'s only recognized cluster for woven "Khana"—the lustrous geometric blouse textile traditionally presented to brides and deities. The society also trains rural women in centuries-old Kasuti needlecraft featuring temple chariot (Theru) and peacock motifs.',
    descriptionKn:
      'ಭಾರತದಲ್ಲೇ ವಿಶಿಷ್ಟವಾದ "ಖಣ" (ರವಿಕೆ ಕಣ) ನೇಯ್ಗೆಗೆ ಗುಳೇದಗುಡ್ಡ ಜಗತ್ಪ್ರಸಿದ್ಧ. ದೇವಿಯರಿಗೆ ಮತ್ತು ಮದುಮಗಳಿಗೆ ಉಡುಗೊರೆ ನೀಡುವ ಈ ಪವಿತ್ರ ವಸ್ತ್ರದೊಂದಿಗೆ ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಕಸೂತಿ ಕಲೆಯ ತೇರು, ನವಿಲು ಮತ್ತು ಗೋಪುರದ ಚಿತ್ತಾರಗಳನ್ನು ಬಿಡಿಸುತ್ತಾರೆ.',
    image: '/assets/monuments/ilkal_saree.jpg',
    priceRange: '₹450 – ₹4,200',
    phone: '+91 8357 262115 / +91 98452 77319',
    address: 'Khana Bazaar, Weaver Street, Guledgudda - 587203, Bagalkote',
    giTagCertified: true,
    masterWeaver: {
      name: 'Smt. Gangamma M. Kembhavi',
      nameKn: 'ಶ್ರೀಮತಿ ಗಂಗಮ್ಮ ಎಂ. ಕೆಂಭಾವಿ',
      experienceYears: 35,
      quoteEn:
        'Every tiny Kasuti stitch is counted thread-by-thread without knots or tracings. It transforms simple fabric into an everlasting temple scripture.',
      quoteKn:
        'ಕಸೂತಿಯ ಪ್ರತಿ ಹೊಲಿಗೆಯನ್ನು ಎಳೆ-ಎಳೆಯಾಗಿ ಲೆಕ್ಕ ಹಾಕಿ ಕಲೆಯಾಗಿಸುತ್ತೇವೆ. ಇದು ಬಟ್ಟೆಯಲ್ಲ, ನಮ್ಮ ಕಲಾ ಭಕ್ತಿ.',
    },
  },
  {
    id: 'mahalakshmi-weaver-federation',
    name: 'Shree Mahalakshmi Artisan Handloom Guild',
    nameKn: 'ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ ಗ್ರಾಮೀಣ ಕೈಮಗ್ಗ ನೇಕಾರರ ಒಕ್ಕೂಟ',
    location: 'Badami Heritage Road, Badami',
    locationKn: 'ಬಾದಾಮಿ ಹೆರಿಟೇಜ್ ರಸ್ತೆ, ಬಾದಾಮಿ',
    established: '1982',
    artisanCount: 140,
    specialty: 'Authentic 6-yard and 9-yard Ilkal Silk-Cotton Drapes & Stoles',
    specialtyKn: '೬ ಮತ್ತು ೯ ಗಜದ ಇಳಕಲ್ ರೇಷ್ಮೆ ಸೀರೆಗಳು ಮತ್ತು ಶಾಲಗಳು',
    descriptionEn:
      'Located close to the Badami archaeological enclave, this guild empowers women weavers and offers live loom demonstrations to travelers. Certified with the Silk Mark and India Handloom Brand.',
    descriptionKn:
      'ಬಾದಾಮಿಗೆ ಭೇಟಿ ನೀಡುವ ಪ್ರವಾಸಿಗರಿಗೆ ನೇರ ಮಗ್ಗದ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಮತ್ತು ಅಧಿಕೃತ ಸಿಲ್ಕ್ ಮಾರ್ಕ್ ಮುದ್ರೆಯ ಸೀರೆಗಳನ್ನು ಒದಗಿಸುವ ಮಹಿಳಾ ನೇಕಾರರ ಸಂಘ.',
    image: '/assets/monuments/ilkal_weaving.jpg',
    priceRange: '₹2,200 – ₹15,000',
    phone: '+91 8357 220045 / +91 97410 88234',
    address: 'Near Old Bus Stand, Ramdurg Road, Badami - 587201',
    giTagCertified: true,
    masterWeaver: {
      name: 'Shri Ramachandrappa K',
      nameKn: 'ಶ್ರೀ ರಾಮಚಂದ್ರಪ್ಪ ಕೆ',
      experienceYears: 38,
      quoteEn:
        'Travelers who visit our looms carry away not just silk, but the living memory of Badami’s craft traditions.',
      quoteKn:
        'ನಮ್ಮ ಮಗ್ಗಗಳಿಗೆ ಭೇಟಿ ನೀಡುವ ಪ್ರವಾಸಿಗರು ಸೀರೆಯ ಜೊತೆಗೆ ಬಾದಾಮಿಯ ಜೀವಂತ ಕರಕುಶಲ ಪರಂಪರೆಯನ್ನು ಕೊಂಡೊಯ್ಯುತ್ತಾರೆ.',
    },
  },
];

export const LOCAL_CUISINE: LocalDish[] = [
  {
    id: 'jolada-rotti-oota',
    name: 'Jolada Rotti Oota (Jowar Thali)',
    nameKn: 'ಜೋಳದ ರೊಟ್ಟಿ ಊಟ (ಉತ್ತರ ಕರ್ನಾಟಕ ಥಾಲಿ)',
    type: 'Meal',
    descriptionEn:
      'The quintessential North Karnataka meal: ultra-thin, soft, freshly clapped unleavened sorghum flatbreads served with Yennegayi (spicy stuffed baby brinjals), Kaalu palya (sprouted mung curry), and fresh curd.',
    descriptionKn:
      'ಉತ್ತರ ಕರ್ನಾಟಕದ ರಾಜ ಊಟ: ಬಿಸಿಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಪಲ್ಯ, ಕಾಳು ಪಲ್ಯ, ಶೇಂಗಾ ಚಟ್ನಿ ಮತ್ತು ತಾಜಾ ಮೊಸರು.',
    image: '/assets/monuments/jolada_rotti.jpg',
    bestPlaceToTryEn: 'Shri Banashankari Lingayat Khanavali or Basaveshwara Bhojanalaya, Badami',
    bestPlaceToTryKn: 'ಶ್ರೀ ಬನಶಂಕರಿ ಲಿಂಗಾಯತ ಖಾನಾವಳಿ, ಬಾದಾಮಿ',
    dietary: 'Gluten-Free',
  },
  {
    id: 'shenga-chutney-pudi',
    name: 'Shenga Chutney Pudi & Ranjaka',
    nameKn: 'ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ & ಕೆಂಪು ರಂಜಕ',
    type: 'Condiment',
    descriptionEn:
      'Coarsely pounded roasted peanut powder blended with garlic, cumin, and dried red Byadagi chillies. Paired with Ranjaka—a fiery pounded red chilli and methi paste eaten with dollops of fresh butter.',
    descriptionKn:
      'ಹುರಿದ ಶೇಂಗಾ, ಬೆಳ್ಳುಳ್ಳಿ, ಜೀರಿಗೆ ಮತ್ತು ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿಯ ಗರಿಗರಿ ಚಟ್ನಿ ಪುಡಿ ಹಾಗೂ ಬೆಣ್ಣೆಯೊಂದಿಗೆ ಸವಿಯುವ ರಂಜಕ ಖಾರ.',
    image: '/assets/monuments/shenga_chutney_pudi.jpg',
    bestPlaceToTryEn: 'Local grocery cooperatives and Khanavalis across Bagalkote',
    bestPlaceToTryKn: 'ಬಾಗಲಕೋಟೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಅಂಗಡಿಗಳು ಮತ್ತು ಖಾನಾವಳಿಗಳು',
    dietary: 'Vegan',
  },
  {
    id: 'ilkal-dharwad-peda',
    name: 'Ilkal Milk Peda & Shenga Holige',
    nameKn: 'ಇಳಕಲ್ ಹಾಲು ಪೇಡ & ಶೇಂಗಾ ಹೋಳಿಗೆ',
    type: 'Sweet',
    descriptionEn:
      'Slow-caramelized rich mawa peda dusted with fine castor sugar from Ilkal dairies, alongside Shenga Holige—a sweet flaky flatbread stuffed with roasted peanut jaggery crumble.',
    descriptionKn:
      'ಇಳಕಲ್‌ನ ಕೆನೆಭರಿತ ಹಾಲಿನಿಂದ ತಯಾರಿಸಿದ ರುಚಿಕರ ಹಾಲು ಪೇಡ ಮತ್ತು ಬೆಲ್ಲ-ಶೇಂಗಾದಿಂದ ತಯಾರಿಸಿದ ಬಿಸಿಬಿಸಿ ಶೇಂಗಾ ಹೋಳಿಗೆ.',
    image: '/assets/monuments/ilkal_peda.jpg',
    bestPlaceToTryEn: 'Anand Sweets, Ilkal / Heritage Sweet Corner, Station Road Badami',
    bestPlaceToTryKn: 'ಆನಂದ್ ಸ್ವೀಟ್ಸ್ ಇಳಕಲ್ ಮತ್ತು ಬಾದಾಮಿ ಸ್ಟೇಷನ್ ರಸ್ತೆ',
    dietary: 'Vegetarian',
  },
];

export const HOMESTAYS: Homestay[] = [
  {
    id: 'badami-heritage-farmstay',
    name: 'Badami Heritage Farmstay & Orchards',
    nameKn: 'ಬಾದಾಮಿ ಹೆರಿಟೇಜ್ ಫಾರ್ಮ್‌ಸ್ಟೇ & ತೋಟ',
    location: 'Kendur Road (6 km from Badami Caves)',
    locationKn: 'ಕೆಂಡೂರು ರಸ್ತೆ (ಬಾದಾಮಿ ಗುಹೆಗಳಿಂದ ೬ ಕಿ.ಮೀ)',
    pricePerNight: '₹2,400',
    rating: 4.8,
    hostName: 'Shri Shivanand Goudar',
    descriptionEn:
      'Eco-friendly farmstay nestled inside pomegranate and guava orchards. Features traditional stone cottages, bullock cart rides, stargazing, and home-cooked organic Jolada Rotti dinners.',
    descriptionKn:
      'ದಾಳಿಂಬೆ ಮತ್ತು ಸೀಬೆ ತೋಟಗಳ ನಡುವೆ ಇರುವ ಸುಂದರ ಪರಿಸರಸ್ನೇಹಿ ಫಾರ್ಮ್‌ಸ್ಟೇ. ಎತ್ತಿನ ಬಂಡಿ ಸವಾರಿ, ಗ್ರಾಮೀಣ ವಾತಾವರಣ ಮತ್ತು ಸಾವಯವ ಜೋಳದ ರೊಟ್ಟಿ ಊಟದ ಸವಲತ್ತು.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    highlightsEn: ['Organic Farm Tour', 'Open Courtyard Campfire', 'Village Bullock Cart Ride', 'Bicycle Rentals'],
    highlightsKn: ['ಸಾವಯವ ತೋಟದ ಪ್ರವಾಸ', 'ಕ್ಯಾಂಪ್‌ಫೈರ್', 'ಎತ್ತಿನ ಬಂಡಿ ಸವಾರಿ', 'ಸೈಕಲ್ ಸವಲತ್ತು'],
    contact: '+91 94490 82190',
  },
  {
    id: 'malaprabha-eco-stay',
    name: 'Malaprabha Riverside Eco Retreat',
    nameKn: 'ಮಲಪ್ರಭಾ ನದೀ ತೀರದ ಇಕೋ ರಿಟ್ರೀಟ್',
    location: 'Pattadakal - Aihole Highway',
    locationKn: 'ಪಟ್ಟದಕಲ್ಲು - ಐಹೊಳೆ ಹೆದ್ದಾರಿ',
    pricePerNight: '₹3,200',
    rating: 4.9,
    hostName: 'Smt. Roopa & Girish Kulkarni',
    descriptionEn:
      'Serene riverside cottage stay with panoramic views of the Malaprabha River. Offers bird watching, guided village artisan visits, and stargazing sessions over ancient sandstone bluffs.',
    descriptionKn:
      'ಮಲಪ್ರಭಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿರುವ ಪ್ರಶಾಂತ ಕಾಟೇಜ್. ಪಕ್ಷಿ ವೀಕ್ಷಣೆ, ಸ್ಥಳೀಯ ನೇಕಾರರ ಭೇಟಿ ಮತ್ತು ನಕ್ಷತ್ರ ವೀಕ್ಷಣೆಯ ಅದ್ಭುತ ಅನುಭವ.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    highlightsEn: ['Riverfront Deck', 'Authentic Local Cooking Classes', 'Guided Weaver Visits', 'Solar Powered'],
    highlightsKn: ['ನದಿಯ ನೋಟ', 'ಸ್ಥಳೀಯ ಅಡುಗೆ ತರಬೇತಿ', 'ನೇಕಾರರ ಮಾರ್ಗದರ್ಶಿ ಭೇಟಿ', 'ಸೌರಶಕ್ತಿ ವ್ಯವಸ್ಥೆ'],
    contact: '+91 98441 55320',
  },
];
