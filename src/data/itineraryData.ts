import { ItineraryPlan } from '../types';

export function getDefaultItinerary(
  daysCount: number = 2,
  interests: string[] = ['Architecture', 'History'],
  pace: 'relaxed' | 'moderate' | 'active' = 'moderate'
): ItineraryPlan {
  const isOneDay = daysCount === 1;
  const isThreeDay = daysCount === 3;
  const hasHandloom = interests.includes('Handlooms');
  const hasSpiritual = interests.includes('Spiritual');
  const hasNature = interests.includes('Nature');

  // Day 1
  const day1Activities = [
    {
      time: '07:30 AM',
      title: 'Morning Ascent: Badami Cave Temples 1 to 4',
      titleKn: 'ಬೆಳಗಿನ ವೀಕ್ಷಣೆ: ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು ೧ ರಿಂದ ೪',
      location: 'Badami Hills',
      description:
        'Witness the 18-armed dancing Shiva Nataraja in Cave 1 lit by morning rays, followed by the colossal Trivikrama in Cave 2, Varaha in Cave 3, and Jain Tirthankaras in Cave 4.',
      descriptionKn:
        'ಗುಹೆ ೧ ರಲ್ಲಿ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ವೀಕ್ಷಣೆ, ನಂತರ ಗುಹೆ ೨, ೩ ಹಾಗೂ ೪ ರ ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಯ ದರ್ಶನ.',
      insiderTip: 'Start early to avoid the afternoon sun and monkey mischief on steps.',
    },
    {
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
    },
    {
      time: '01:00 PM',
      title: 'Authentic Uttara Karnataka Jolada Rotti Lunch',
      titleKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ',
      location: 'Badami Heritage Circle',
      description:
        'Relish hot, wafer-thin Jolada Rotti served with Ennegayi (spiced baby brinjals), Shenga Chutney powder with fresh curd, and Ranjaka chilli paste.',
      descriptionKn: 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಹಾಗೂ ಮೊಸರು.',
      insiderTip: 'Wash down with freshly churned spiced buttermilk (Majjige).',
    },
    {
      time: '04:30 PM',
      title: 'Bhootanatha Temples & Agastya Lake Golden Hour',
      titleKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಸೂರ್ಯಾಸ್ತ',
      location: 'Eastern Edge of Agastya Lake',
      description:
        'Capture reflections of 7th-century sandstone shrines projecting into the tranquil waters of Agastya Tirtha as the sun dips behind the cliffs.',
      descriptionKn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಭೂತನಾಥ ದೇವಾಲಯದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ಪ್ರತಿಬಿಂಬ.',
      insiderTip: 'The steps leading down to the lake offer the best panoramic photograph angle in all of Karnataka.',
    },
  ];

  if (pace === 'active') {
    day1Activities.push({
      time: '06:30 PM',
      title: 'Evening Sandstone Stroll & Local Spiced Tea',
      titleKn: 'ಸಂಜೆಯ ಬಾದಾಮಿ ಬೀದಿಗಳಲ್ಲಿ ನಡಿಗೆ & ಮಸಾಲೆ ಚಹಾ',
      location: 'Badami Old Bazaar',
      description: 'Stroll through the old bazaar lined with sandstone houses, stone carvings, and taste authentic Badami masala chai.',
      descriptionKn: 'ಪ್ರಾಚೀನ ಬಾದಾಮಿಯ ಗಲ್ಲಿಗಳಲ್ಲಿ ನಡಿಗೆ ಮತ್ತು ಬಿಸಿ ಮಸಾಲೆ ಚಹಾದ ರುಚಿ.',
      insiderTip: 'Pick up locally grown roasted groundnuts from street vendors.',
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

  // Day 2
  const day2Activities = [
    {
      time: '08:30 AM',
      title: 'Pattadakal UNESCO World Heritage Complex',
      titleKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ಸಂಕೀರ್ಣ',
      location: 'Pattadakal (22 km from Badami)',
      description:
        'Tour the monumental Virupaksha Temple, Mallikarjuna, and Sangameshwara temples along the Malaprabha River. Marvel at the synthesis of Nagara and Dravidian architectural towers.',
      descriptionKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳ ಶಿಲ್ಪ ವೈಭವ.',
      insiderTip: 'Check the ceiling of Virupaksha Temple for Surya riding his seven-horse chariot.',
    },
    {
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
    },
    {
      time: '03:30 PM',
      title: 'Sacred Forest Springs of Mahakuta',
      titleKn: 'ಮಹಾಕೂಟದ ಪವಿತ್ರ ನೀರಿನ ಬುಗ್ಗೆ ಮತ್ತು ಪುಷ್ಕರಣಿ',
      location: 'Mahakuta Glen (near Badami)',
      description:
        'Walk through lush banyan groves surrounding the pristine Vishnu Pushkarini natural spring pool, where a submerged four-faced Shiva Linga presides.',
      descriptionKn: 'ಹಸಿರು ಮರಗಳ ನೆರಳಿನಲ್ಲಿರುವ ಮಹಾಕೂಟದ ವಿಷ್ಣು ಪುಷ್ಕರಣಿ ಮತ್ತು ಪಂಚಮುಖ ಲಿಂಗ ದರ್ಶನ.',
      insiderTip: 'A serene place to meditate away from tourist crowds.',
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

  // Day 3
  const day3 = {
    dayNumber: 3,
    theme: hasSpiritual
      ? 'Spiritual Confluence of Basaveshwara & Sacred Confluences'
      : 'Living Handloom Traditions & Confluence of Rivers',
    themeKn: hasSpiritual
      ? 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ'
      : 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ಪರಂಪರೆ',
    activities: [
      {
        time: '08:00 AM',
        title: 'Banashankari Amma Temple & Haridra Tirtha',
        titleKn: 'ಬನಶಂಕರಿ ದೇವಿ ಸನ್ನಿಧಿ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ ಕಲ್ಯಾಣಿ',
        location: 'Cholachagudd (5 km from Badami)',
        description:
          'Seek blessings from the guardian deity of the Chalukyas and admire the ancient three-tiered lamp towers encircling the Haridra Tirtha lake.',
        descriptionKn: 'ಚಾಲುಕ್ಯರ ಕುಲದೇವತೆ ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದರ್ಶನ ಮತ್ತು ಪುರಾತನ ದೀಪಸ್ತಂಭಗಳ ವೀಕ್ಷಣೆ.',
        insiderTip: 'Taste the special sweet offerings (Prasada) prepared fresh daily.',
      },
      {
        time: '11:00 AM',
        title: 'Kudalasangama: Sangameshwara & Aikya Mantapa',
        titleKn: 'ಕೂಡಲಸಂಗಮ: ಸಂಗಮನಾಥ ಮತ್ತು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ',
        location: 'Krishna-Malaprabha River Sangama',
        description:
          'Visit the sacred confluence where Saint Basaveshwara attained Mahasamadhi. Explore the cylindrical river-well protection structure and the modern Basava International Centre.',
        descriptionKn: 'ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ಸಂಗಮ ಹಾಗೂ ಜಗದ್ಗುರು ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪದ ದರ್ಶನ.',
        insiderTip: 'A boat ride along the sangama offers soothing breeze and panoramic river views.',
      },
      {
        time: '03:00 PM',
        title: 'Ilkal Handloom Colony & Kasuti Embroidery Collective',
        titleKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ಕಾಲೋನಿ ಮತ್ತು ಕಸೂತಿ ಕರಕುಶಲ ಕೇಂದ್ರ',
        location: 'Ilkal Town (30 km from Kudalasangama)',
        description:
          'Visit traditional pit-loom workshops to watch artisans weave the patented Topetenwe silk pallu. Shop directly from cooperative weavers without mediator markups.',
        descriptionKn: 'ಪ್ರಾಚೀನ ಕೈಮಗ್ಗಗಳಲ್ಲಿ ತೊಪೆತೆನೆ ರೇಷ್ಮೆ ಸೀರೆ ನೇಯುವ ಕೌಶಲ್ಯ ವೀಕ್ಷಣೆ ಮತ್ತು ನೇರ ಖರೀದಿ.',
        insiderTip: 'Look for official Silk Mark and Handloom Mark tags on authentic Ilkal sarees.',
      },
    ],
    recommendedMeal: {
      place: 'Basava Bhavana Dining Hall, Kudalasangama',
      dish: 'Prasada Oota: Jolada Rotti, Bele Saaru, Holige, and Payasa',
      dishKn: 'ದಾಸೋಹ ಪ್ರಸಾದ ಊಟ: ರೊಟ್ಟಿ, ಬೇಳೆ ಸಾರು, ಹೋಳಿಗೆ ಹಾಗೂ ಪಾಯಸ',
    },
  };

  const days = isOneDay ? [day1] : isThreeDay ? [day1, day2, day3] : [day1, day2];

  return {
    title: isOneDay
      ? 'Badami Express: Cave Sanctuaries & Heritage Sunset'
      : isThreeDay
      ? 'Grand Bagalkote Heritage, Rivers & Silk Circuit'
      : hasHandloom
      ? 'Chalukya Heritage & Living Ilkal Silk Trail'
      : 'Classic Chalukya Circuit: Badami, Pattadakal & Aihole',
    titleKn: isOneDay
      ? 'ಬಾದಾಮಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್: ಗುಹಾ ದೇವಾಲಯಗಳು ಮತ್ತು ಸೂರ್ಯಾಸ್ತ'
      : isThreeDay
      ? 'ಬಾಗಲಕೋಟೆಯ ಭವ್ಯ ಚಾಲುಕ್ಯ, ನದಿ ಸಂಗಮ ಮತ್ತು ರೇಷ್ಮೆ ಯಾತ್ರೆ'
      : hasHandloom
      ? 'ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಮತ್ತು ಇಳಕಲ್ ರೇಷ್ಮೆ ಯಾತ್ರೆ'
      : 'ಕ್ಲಾಸಿಕ್ ಚಾಲುಕ್ಯ ಸರ್ಕ್ಯೂಟ್: ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ',
    summary: isOneDay
      ? `A focused 1-day exploration of Badami’s 6th-century rock-cut cave temples, North Fort, archaeological museum, and sunset over Agastya Lake at a ${pace} pace.`
      : isThreeDay
      ? `A comprehensive 3-day expedition covering rock-cut caves, UNESCO World Heritage monuments, Aihole architecture cradle, sacred Kudalasangama confluence, and GI-tagged Ilkal handloom weavers tailored for ${interests.join(' & ')}.`
      : `A masterfully balanced 2-day journey exploring Badami caves, Pattadakal UNESCO temples, Aihole architectural cradle, and Mahakuta sacred springs with emphasis on ${interests.join(' & ')}.`,
    summaryKn: isOneDay
      ? 'ಬಾದಾಮಿಯ ೬ನೇ ಶತಮಾನದ ಗುಹಾ ದೇವಾಲಯಗಳು, ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತವನ್ನು ಒಳಗೊಂಡ ಒಂದು ದಿನದ ಪ್ರವಾಸ.'
      : isThreeDay
      ? 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಕೂಡಲಸಂಗಮ ಸಂಗಮ ಕ್ಷೇತ್ರ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಕಾರರ ಸಂಘಗಳನ್ನು ಒಳಗೊಂಡ ಸಂಪೂರ್ಣ ೩ ದಿನಗಳ ಯಾತ್ರೆ.'
      : 'ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ, ಐಹೊಳೆ ಕಲಾಶಾಲೆ ಮತ್ತು ಮಹಾಕೂಟದ ಪವಿತ್ರ ಬುಗ್ಗೆಗಳನ್ನು ಒಳಗೊಂಡ ಸಮತೋಲಿತ ೨ ದಿನಗಳ ಪ್ರವಾಸ ಯೋಜನೆ.',
    totalDistanceKm: isOneDay ? 25 : isThreeDay ? 175 : 95,
    recommendedTransport: isOneDay
      ? 'Tourist Auto Rickshaw or Walking Trail'
      : 'Private Cab or Tourist Auto / KSRTC Heritage Shuttle',
    days,
    proTips: [
      'Pack slip-on walking shoes as you will remove footwear at multiple sanctums.',
      'Carry small cash/UPI for local rickshaws, coconut water, and museum entry turnstiles.',
      'Best travel months are October through March when Deccan temperatures are pleasant.',
    ],
  };
}
