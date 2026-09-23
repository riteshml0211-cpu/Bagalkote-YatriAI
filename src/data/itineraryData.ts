import { ItineraryPlan } from '../types';

export function getDefaultItinerary(daysCount: number = 2): ItineraryPlan {
  const day1 = {
    dayNumber: 1,
    theme: 'Monolithic Cave Wonders & Agastya Lake Sunset',
    themeKn: 'ಕಲ್ಲಿನ ಗುಹೆಗಳ ಅದ್ಭುತ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತ',
    activities: [
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
        title: 'Badami Archaeological Museum & North Fort Trail',
        titleKn: 'ಬಾದಾಮಿ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ & ಉತ್ತರ ಕೋಟೆ',
        location: 'Near Bhootanatha Complex',
        description:
          'Explore 7th-century Lajja Gauri sculptures, architectural fragments, and ancient cannons atop the sandstone crag.',
        descriptionKn: 'ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಅಪರೂಪದ ಶಿಲ್ಪಗಳು ಮತ್ತು ಉತ್ತರ ಕೋಟೆಯ ಐತಿಹಾಸಿಕ ತಾಣ.',
        insiderTip: 'Carry a refillable water bottle; photography is permitted without flash.',
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
    ],
    recommendedMeal: {
      place: 'Shri Banashankari Lingayat Khanavali, Station Road',
      dish: 'Unlimited Jolada Rotti Meal with Yennegayi & Shenga Holige',
      dishKn: 'ಅನ್‌ಲಿಮಿಟೆಡ್ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಮತ್ತು ಶೇಂಗಾ ಹೋಳಿಗೆ',
    },
  };

  const day2 = {
    dayNumber: 2,
    theme: 'Cradle of Architecture & UNESCO World Heritage',
    themeKn: 'ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಕಲಾಶಾಲೆ',
    activities: [
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
        title: 'Aihole: Durga Temple & Ravana Phadi Cave',
        titleKn: 'ಐಹೊಳೆ: ಅಪರೂಪದ ಗಜಪೃಷ್ಠ ದುರ್ಗಾ ದೇವಾಲಯ ಮತ್ತು ರಾವಣ ಫಡಿ ಗುಹೆ',
        location: 'Aihole (14 km from Pattadakal)',
        description:
          'Investigate the famous apsidal (horseshoe-shaped) Durga temple, the Lad Khan temple, and the exquisite rock-cut Ravana Phadi shrine.',
        descriptionKn: 'ಗಜಪೃಷ್ಠ ಆಕಾರದ ದುರ್ಗಾ ದೇವಾಲಯ, ಲಾಡ್ ಖಾನ್ ದೇಗುಲ ಹಾಗೂ ರಾವಣಫಡಿ ಗುಹೆಗಳ ವೀಕ್ಷಣೆ.',
        insiderTip: 'Aihole has over 120 temples dating back to 450 CE spread across village fields.',
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
    ],
    recommendedMeal: {
      place: 'Pattadakal Heritage Canteen / Badami Courtyard',
      dish: 'Girmit, Mirchi Bajji, and Fresh Sugarcane Juice',
      dishKn: 'ಗರಂ ಗಿರ್ಮಿಟ್, ಬಿಸಿ ಮಿರ್ಚಿ ಬಜ್ಜಿ ಹಾಗೂ ಕಬ್ಬಿನ ಹಾಲು',
    },
  };

  const day3 = {
    dayNumber: 3,
    theme: 'Spiritual Confluence & Living Handloom Traditions',
    themeKn: 'ಕೂಡಲಸಂಗಮದ ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ಪರಂಪರೆ',
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
        insiderTip: 'Look for the official Silk Mark and Handloom Mark tags on authentic Ilkal sarees.',
      },
    ],
    recommendedMeal: {
      place: 'Basava Bhavana Dining Hall, Kudalasangama',
      dish: 'Prasada Oota: Jolada Rotti, Bele Saaru, Holige, and Payasa',
      dishKn: 'ದಾಸೋಹ ಪ್ರಸಾದ ಊಟ: ರೊಟ್ಟಿ, ಬೇಳೆ ಸಾರು, ಹೋಳಿಗೆ ಹಾಗೂ ಪಾಯಸ',
    },
  };

  const days = daysCount === 1 ? [day1] : daysCount === 3 ? [day1, day2, day3] : [day1, day2];

  return {
    title: `${daysCount}-Day Masterpiece Heritage Journey through Bagalkote`,
    titleKn: `ಬಾಗಲಕೋಟೆಯ ${daysCount} ದಿನಗಳ ಐತಿಹಾಸಿಕ ಪರಂಪರೆ ಪ್ರವಾಸ ಯೋಜನೆ`,
    summary: `Curated journey covering Badami rock caves, Bhootanatha sunset, UNESCO Pattadakal, cradle of temple art at Aihole, sacred Mahakuta, and living craft traditions.`,
    summaryKn: `ಬಾದಾಮಿ ಗುಹೆಗಳು, ಭೂತನಾಥ ಸೂರ್ಯಾಸ್ತ, ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ ಹಾಗೂ ಕೈಮಗ್ಗ ಪರಂಪರೆಯನ್ನು ಒಳಗೊಂಡ ಪರಿಪೂರ್ಣ ಪ್ರವಾಸ ಮಾರ್ಗ.`,
    totalDistanceKm: daysCount === 1 ? 28 : daysCount === 2 ? 85 : 175,
    recommendedTransport:
      'Private auto-rickshaw for local Badami; hired taxi (Sedan/SUV) for Pattadakal-Aihole-Kudalasangama circuit.',
    days,
    proTips: [
      'Pack slip-on walking shoes as you will remove footwear at multiple sanctums.',
      'Carry small cash/UPI for local rickshaws, coconut water, and museum entry turnstiles.',
      'Best travel months are October through March when Deccan temperatures are pleasant.',
    ],
  };
}
