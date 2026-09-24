export interface TrainOption {
  trainNumber: string;
  trainName: string;
  trainNameKn: string;
  originStation: string;
  destinationStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  frequency: string;
  frequencyKn: string;
  classes: string[];
  fareRange: string;
  proTip: string;
  proTipKn: string;
  bookingUrl: string;
}

export interface BusOption {
  operator: string;
  busType: string;
  busTypeKn: string;
  boardingPoints: string[];
  droppingPoints: string[];
  departureTimes: string;
  duration: string;
  fareRange: string;
  amenities: string[];
  bookingUrl: string;
  proTip: string;
  proTipKn: string;
}

export interface FlightOption {
  nearestAirport: string;
  nearestAirportKn: string;
  airportCode: string;
  distanceToBadami: string;
  driveTime: string;
  flightDuration: string;
  airlines: string[];
  connectingRoadTransit: {
    taxiFare: string;
    taxiDuration: string;
    busDetails: string;
    busDetailsKn: string;
  };
  proTip: string;
  proTipKn: string;
}

export interface RoadOption {
  routeSummary: string;
  routeSummaryKn: string;
  highways: string;
  totalDistanceKm: number;
  estimatedDrivingTime: string;
  tollEstimate: string;
  roadQuality: 'Excellent' | 'Good' | 'Scenic Ghats' | 'Average';
  scenicStops: string[];
  scenicStopsKn: string[];
  recommendedPitStops: string[];
  cabFareEstimate: {
    hatchback: string;
    sedan: string;
    suv: string;
  };
  navigationUrl: string;
}

export interface DepartureHub {
  id: string;
  name: string;
  nameKn: string;
  state: string;
  distanceKm: number;
  fastestTravelTime: string;
  cheapestFareEstimate: string;
  recommendedMode: 'train' | 'bus' | 'flight' | 'road';
  recommendationSummary: string;
  recommendationSummaryKn: string;
  trains: TrainOption[];
  buses: BusOption[];
  flight?: FlightOption;
  road: RoadOption;
}

export interface LocalTransitOption {
  id: string;
  mode: string;
  modeKn: string;
  icon: string;
  title: string;
  titleKn: string;
  coverage: string;
  coverageKn: string;
  timings: string;
  fareCard: string;
  fareCardKn: string;
  bestFor: string;
  bestForKn: string;
  standLocation: string;
  standLocationKn: string;
  helplineOrContact?: string;
  tips: string[];
  tipsKn: string[];
}

export interface CircuitDestinationInfo {
  id: string;
  name: string;
  nameKn: string;
  distanceFromBadami: string;
  travelTimeFromBadami: string;
  routeDescription: string;
  routeDescriptionKn: string;
  recommendedLocalTransit: string;
  recommendedLocalTransitKn: string;
  keySpots: string[];
}

export const CIRCUIT_DESTINATIONS: Record<string, CircuitDestinationInfo> = {
  badami: {
    id: 'badami',
    name: 'Badami (Primary Heritage Railhead & Bus Hub)',
    nameKn: 'ಬಾದಾಮಿ (ಮುಖ್ಯ ರೈಲು ಮತ್ತು ಬಸ್ ನಿಲ್ದಾಣ)',
    distanceFromBadami: '0 km (Central Base)',
    travelTimeFromBadami: '0 min',
    routeDescription: 'Direct arrival at Badami Railway Station (BDM) or Badami KSRTC Bus Stand. Hub for all cave temples, Agastya lake & museum.',
    routeDescriptionKn: 'ಬಾದಾಮಿ ರೈಲು ನಿಲ್ದಾಣ (BDM) ಅಥವಾ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ನಿಲ್ದಾಣ. ಗುಹಾಂತರ ದೇವಾಲಯಗಳು, ಅಗಸ್ತ್ಯ ತೀರ್ಥಕ್ಕೆ ಕೇಂದ್ರ ತಾಣ.',
    recommendedLocalTransit: 'Walking / E-Rickshaw / Auto Rickshaw (₹40-₹60 within town)',
    recommendedLocalTransitKn: 'ಕಾಲ್ನಡಿಗೆ / ಆಟೋ ರಿಕ್ಷಾ (ಊರಿನೊಳಗೆ ₹೪೦-₹೬೦)',
    keySpots: ['Cave Temples 1-4', 'Agastya Lake', 'Bhootanatha Temples', 'Badami North Fort', 'Archaeological Museum'],
  },
  pattadakal: {
    id: 'pattadakal',
    name: 'Pattadakal (UNESCO World Heritage Site)',
    nameKn: 'ಪಟ್ಟದಕಲ್ಲು (ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ)',
    distanceFromBadami: '22 km Northeast',
    travelTimeFromBadami: '25-35 minutes',
    routeDescription: 'Via Badami-Pattadakal-Aihole Main Road (MDR/SH). Well-paved scenic road passing through sunflower fields and red sandstone outcrops.',
    routeDescriptionKn: 'ಬಾದಾಮಿ-ಪಟ್ಟದಕಲ್ಲು ಮುಖ್ಯ ರಸ್ತೆಯ ಮೂಲಕ. ಸೂರ್ಯಕಾಂತಿ ಹೊಲಗಳು ಮತ್ತು ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ರಸ್ತೆ.',
    recommendedLocalTransit: 'NWKRTC Red Shuttle Bus (every 30 min, ₹28) or Day-Tour Auto/Cab',
    recommendedLocalTransitKn: 'ವಾಯವ್ಯ ಸಾರಿಗೆ ಕೆಂಪು ಬಸ್ (ಪ್ರತಿ ೩೦ ನಿಮಿಷಕ್ಕೆ, ₹೨೮) ಅಥವಾ ದಿನದ ಪ್ರವಾಸದ ಆಟೋ/ಟ್ಯಾಕ್ಸಿ',
    keySpots: ['Virupaksha Temple', 'Mallikarjuna Temple', 'Sangameshwara Temple', 'Galaganatha', 'Papanatha Temple'],
  },
  aihole: {
    id: 'aihole',
    name: 'Aihole (Cradle of Indian Temple Architecture)',
    nameKn: 'ಐಹೊಳೆ (ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು)',
    distanceFromBadami: '34 km Northeast (13 km beyond Pattadakal)',
    travelTimeFromBadami: '45-55 minutes',
    routeDescription: 'Take Badami -> Pattadakal -> Aihole road along the Malaprabha river valley. Flat, scenic 2-lane road with gentle turns.',
    routeDescriptionKn: 'ಮಲಪ್ರಭಾ ನದಿ ಕಣಿವೆಯಲ್ಲಿ ಬಾದಾಮಿ -> ಪಟ್ಟದಕಲ್ಲು -> ಐಹೊಳೆ ರಸ್ತೆ. ಸಮತಟ್ಟಾದ ಸುಂದರ ಮಾರ್ಗ.',
    recommendedLocalTransit: 'NWKRTC Bus from Badami / Pattadakal (₹40) or Full-Circuit Auto/Taxi Tour',
    recommendedLocalTransitKn: 'ಬಾದಾಮಿ/ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ವಾಯವ್ಯ ಸಾರಿಗೆ ಬಸ್ (₹೪೦) ಅಥವಾ ಪೂರ್ಣ ಪ್ರವಾಸದ ಆಟೋ/ಟ್ಯಾಕ್ಸಿ',
    keySpots: ['Durga Temple (Apsidal)', 'Lad Khan Temple', 'Ravalphadi Cave', 'Huchappayyagudi', 'Meguti Jain Hilltop Temple'],
  },
  banashankari_mahakuta: {
    id: 'banashankari_mahakuta',
    name: 'Banashankari & Mahakuta (Sacred Spring Temples)',
    nameKn: 'ಬನಶಂಕರಿ ಮತ್ತು ಮಹಾಕೂಟ (ಪವಿತ್ರ ಪುಷ್ಕರಣಿ ದೇವಾಲಯಗಳು)',
    distanceFromBadami: 'Banashankari: 5 km South | Mahakuta: 14 km East',
    travelTimeFromBadami: '10-20 minutes',
    routeDescription: 'Banashankari is 5 km along Badami-Gadag road. Mahakuta is nestled in a lush valley reached via Badami-Pattadakal branch turnoff.',
    routeDescriptionKn: 'ಬನಶಂಕರಿಯು ಗದಗ ರಸ್ತೆಯಲ್ಲಿ ೫ ಕಿ.ಮೀ. ಮಹಾಕೂಟವು ಹಸಿರು ಕಣಿವೆಯಲ್ಲಿದ್ದು ಬಾದಾಮಿ-ಪಟ್ಟದಕಲ್ಲು ತಿರುವಿನಲ್ಲಿ ಬರುತ್ತದೆ.',
    recommendedLocalTransit: 'Frequent Auto Rickshaws (₹60-₹120) or Rural Buses from Badami',
    recommendedLocalTransitKn: 'ಆಟೋ ರಿಕ್ಷಾ (₹೬೦-₹೧೨೦) ಅಥವಾ ಬಾದಾಮಿಯಿಂದ ಗ್ರಾಮೀಣ ಬಸ್ಸುಗಳು',
    keySpots: ['Banashankari Temple & Haridra Tirtha', 'Mahakuteshwara Temple', 'Vishnu Pushkarani Spring', 'Deepastambha Towers'],
  },
  guledgudda_ilkal: {
    id: 'guledgudda_ilkal',
    name: 'Guledgudda & Ilkal (GI Handloom Silk Towns)',
    nameKn: 'ಗುಳೇದಗುಡ್ಡ ಮತ್ತು ಇಳಕಲ್ (ಜಿಐ ಕೈಮಗ್ಗ ಸೀರೆ ತಾಣಗಳು)',
    distanceFromBadami: 'Guledgudda: 24 km | Ilkal: 55 km East',
    travelTimeFromBadami: '35 min to 1 hr 10 min',
    routeDescription: 'Badami -> Guledgudda -> Bagalkot/Ilkal via SH 14 and NH 50. High-speed highway connecting to authentic weaver pit-loom societies.',
    routeDescriptionKn: 'ಬಾದಾಮಿ -> ಗುಳೇದಗುಡ್ಡ -> ಇಳಕಲ್ ಮಾರ್ಗ. ನೇಯ್ಗೆ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ ಸಂಪರ್ಕಿಸುವ ರಸ್ತೆ.',
    recommendedLocalTransit: 'NWKRTC Express Bus or Private Taxi',
    recommendedLocalTransitKn: 'ವಾಯವ್ಯ ಸಾರಿಗೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್ ಅಥವಾ ಖಾಸಗಿ ಟ್ಯಾಕ್ಸಿ',
    keySpots: ['Weaver Pit Looms', 'GI Ilkal Saree Co-operatives', 'Guledgudda Hilltop Fort', 'Traditional Dyeing Units'],
  },
  full_circuit: {
    id: 'full_circuit',
    name: 'Full Chalukya Heritage Circuit (All Sites)',
    nameKn: 'ಸಮಗ್ರ ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಪ್ರವಾಸ (ಎಲ್ಲಾ ತಾಣಗಳು)',
    distanceFromBadami: 'Circular Loop (~85 km total round trip)',
    travelTimeFromBadami: 'Full-Day 7-8 hours comfortable pace',
    routeDescription: 'Badami -> Banashankari (5km) -> Mahakuta (14km) -> Pattadakal (18km) -> Aihole (13km) -> Back to Badami (34km).',
    routeDescriptionKn: 'ಬಾದಾಮಿ -> ಬನಶಂಕರಿ -> ಮಹಾಕೂಟ -> ಪಟ್ಟದಕಲ್ಲು -> ಐಹೊಳೆ -> ಮರಳಿ ಬಾದಾಮಿ (ಒಟ್ಟು ೮೫ ಕಿ.ಮೀ ಸುತ್ತು).',
    recommendedLocalTransit: 'Dedicated Golden Circuit Auto Package (₹1,500) or AC Tourist Taxi (₹2,800)',
    recommendedLocalTransitKn: 'ಗೋಲ್ಡನ್ ಸರ್ಕ್ಯೂಟ್ ದಿನದ ಆಟೋ ಪ್ಯಾಕೇಜ್ (₹೧,೫೦೦) ಅಥವಾ ಎಸಿ ಟ್ಯಾಕ್ಸಿ (₹೨,೮೦೦)',
    keySpots: ['All 5 Major Clusters in One Seamless Day'],
  },
};

export const DEPARTURE_HUBS: DepartureHub[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru (Bangalore)',
    nameKn: 'ಬೆಂಗಳೂರು',
    state: 'Karnataka',
    distanceKm: 450,
    fastestTravelTime: '1 hr 15 min (Flight to Hubballi + Cab)',
    cheapestFareEstimate: '₹340 (Train Sleeper Class)',
    recommendedMode: 'train',
    recommendationSummary: 'Top pick: Overnight Gol Gumbaz Express (16535) or Basava Express. Board in evening at Majestic / Yesvantpur, wake up right in Badami at 5:40 AM fresh for sightseeing!',
    recommendationSummaryKn: 'ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ: ರಾತ್ರಿಯ ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (೧೬೫೩೫). ಸಂಜೆ ಮೆಜೆಸ್ಟಿಕ್‌ನಲ್ಲಿ ಹತ್ತಿ, ಬೆಳಿಗ್ಗೆ ೫:೪೦ಕ್ಕೆ ನೇರವಾಗಿ ಬಾದಾಮಿಯಲ್ಲೇ ಇಳಿಯಿರಿ!',
    trains: [
      {
        trainNumber: '16535',
        trainName: 'Gol Gumbaz Express',
        trainNameKn: 'ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'KSR Bengaluru (SBC) / Yesvantpur (YPR)',
        destinationStation: 'Badami (BDM)',
        departureTime: '18:30 (SBC) / 18:45 (YPR)',
        arrivalTime: '05:40 AM (Next Morning)',
        duration: '11h 10m',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['1A', '2A', '3A', '3E', 'SL', 'GN'],
        fareRange: 'SL: ₹340 | 3A: ₹910 | 2A: ₹1,300 | 1A: ₹2,180',
        proTip: 'Direct train stopping right at Badami station! Book 3A/SL berths 30 days in advance as it fills fast during tourist season (Oct-March).',
        proTipKn: 'ಬಾದಾಮಿ ನಿಲ್ದಾಣದಲ್ಲೇ ನಿಲ್ಲುವ ನೇರ ರೈಲು! ಅಕ್ಟೋಬರ್-ಮಾರ್ಚ್ ತಿಂಗಳಲ್ಲಿ ಮುಂಚಿತವಾಗಿ ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸಿ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
      {
        trainNumber: '17307',
        trainName: 'Basava Express',
        trainNameKn: 'ಬಸವ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'KSR Bengaluru (SBC) / Yesvantpur (YPR)',
        destinationStation: 'Bagalkot (BGK) / Badami (BDM)',
        departureTime: '16:45 (SBC) / 17:00 (YPR)',
        arrivalTime: '06:20 AM',
        duration: '13h 35m',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['2A', '3A', 'SL', 'GN'],
        fareRange: 'SL: ₹360 | 3A: ₹970 | 2A: ₹1,390',
        proTip: 'Excellent alternative when Gol Gumbaz is waitlisted. Passes via Hubballi & Gadag.',
        proTipKn: 'ಗೋಳಗುಮ್ಮಟ ರೈಲು ಭರ್ತಿಯಾಗಿದ್ದಾಗ ಬಸವ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಅತ್ಯುತ್ತಮ ಪರ್ಯಾಯ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
      {
        trainNumber: '16541',
        trainName: 'Yesvantpur - Pandharpur Express',
        trainNameKn: 'ಯಶವಂತಪುರ - ಪಂಢರಪುರ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Yesvantpur Jn (YPR)',
        destinationStation: 'Badami (BDM)',
        departureTime: '18:15 (Thursday only)',
        arrivalTime: '05:40 AM',
        duration: '11h 25m',
        frequency: 'Weekly (Thursday)',
        frequencyKn: 'ವಾರಕ್ಕೊಮ್ಮೆ (ಗುರುವಾರ)',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹340 | 3A: ₹910 | 2A: ₹1,300',
        proTip: 'Great for weekend long trips starting Thursday evening.',
        proTipKn: 'ವಾರಾಂತ್ಯದ ಪ್ರವಾಸಕ್ಕೆ ಉಪಯುಕ್ತ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'KSRTC (Karnataka State Road Transport)',
        busType: 'Airavat Club Class (Multi-Axle AC Sleeper)',
        busTypeKn: 'ಐರಾವತ ಕ್ಲಬ್ ಕ್ಲಾಸ್ (ಎಸಿ ಸ್ಲೀಪರ್)',
        boardingPoints: ['Kempegowda Bus Station (Majestic)', 'Navrang', 'Yeshwanthpur Govardhan', '8th Mile'],
        droppingPoints: ['Badami Bus Stand', 'Badami Bypass Circle'],
        departureTimes: '20:30 PM & 21:45 PM',
        duration: '9h 30m - 10h',
        fareRange: '₹1,050 - ₹1,350',
        amenities: ['AC Sleeper Berths', 'Charging Points', 'Mineral Water', 'Blanket & Pillow'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Direct dropping at Badami Bus Stand in the heart of town. Highly punctual and smooth overnight ride.',
        proTipKn: 'ನೇರವಾಗಿ ಬಾದಾಮಿ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲೇ ಇಳಿಸುತ್ತದೆ. ಆರಾಮದಾಯಕ ಎಸಿ ಸ್ಲೀಪರ್.',
      },
      {
        operator: 'NWKRTC / KSRTC',
        busType: 'Rajahamsa / Non-AC Sleeper',
        busTypeKn: 'ರಾಜಹಂಸ / ನಾನ್-ಎಸಿ ಸ್ಲೀಪರ್',
        boardingPoints: ['Majestic Platform 2B', 'Basaveshwara Bus Station (Peenya)'],
        droppingPoints: ['Badami Bus Stand'],
        departureTimes: '19:45 PM & 21:00 PM',
        duration: '10h 15m',
        fareRange: '₹620 - ₹780',
        amenities: ['Reclining 2x2 Seats or Bunks', 'Reading Lights'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Budget-friendly government sleeper service operated by North Western Karnataka division.',
        proTipKn: 'ಕಡಿಮೆ ಖರ್ಚಿನ ವಿಶ್ವಾಸಾರ್ಹ ಸರ್ಕಾರಿ ಸ್ಲೀಪರ್ ಸೇವೆ.',
      },
      {
        operator: 'Private Operators (VRL Travels / SRS / Sugama)',
        busType: 'Multi-Axle AC Sleeper / Semi-Sleeper',
        busTypeKn: 'ಖಾಸಗಿ ಮಲ್ಟಿ-ಆಕ್ಸಲ್ ಎಸಿ ಸ್ಲೀಪರ್',
        boardingPoints: ['Anand Rao Circle', 'Madiwala', 'Indiranagar', 'Yeshwantpur'],
        droppingPoints: ['Badami Bus Stand / Bagalkot'],
        departureTimes: '20:00 PM to 22:30 PM (Multiple departures)',
        duration: '9h 15m',
        fareRange: '₹850 - ₹1,400',
        amenities: ['Live GPS Tracking', 'Personal LCD screen (select buses)', 'Power sockets'],
        bookingUrl: 'https://www.redbus.in',
        proTip: 'VRL provides frequent connecting buses to Bagalkot and Badami.',
        proTipKn: 'ವಿಆರ್‌ಎಲ್ ಮತ್ತು ಎಸ್‌ಆರ್‌ಎಸ್ ದಿನಂಪ್ರತಿ ಹಲವು ಬಸ್‌ಗಳನ್ನು ಓಡಿಸುತ್ತವೆ.',
      },
    ],
    flight: {
      nearestAirport: 'Hubballi Airport (HBX)',
      nearestAirportKn: 'ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣ (HBX)',
      airportCode: 'HBX',
      distanceToBadami: '105 km (~2 hr 15 min road trip)',
      driveTime: '2h 15m via NH 218 / SH',
      flightDuration: '1h 10m direct flight from Bengaluru (BLR)',
      airlines: ['IndiGo (3-4 daily direct flights)', 'Star Air'],
      connectingRoadTransit: {
        taxiFare: '₹2,200 - ₹2,800 (Pre-paid airport taxi to Badami)',
        taxiDuration: '2h 15m',
        busDetails: 'Take an airport auto (₹150) to Hubballi Hosur Bus Stand; NWKRTC express buses leave every 30 mins to Badami (₹110, 2h 45m).',
        busDetailsKn: 'ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ಹೊಸೂರು ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗಿ, ಅಲ್ಲಿಂದ ಪ್ರತಿ ಅರ್ಧ ಗಂಟೆಗೆ ಬಾದಾಮಿಗೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್ ಲಭ್ಯ (₹೧೧೦).',
      },
      proTip: 'Fastest overall travel mode! Take the 08:30 AM IndiGo flight from BLR, land in Hubballi at 09:40 AM, and reach Badami caves before lunch at 12:15 PM.',
      proTipKn: 'ಅತ್ಯಂತ ವೇಗದ ಮಾರ್ಗ! ಬೆಳಿಗ್ಗೆ ೮:೩೦ರ ವಿಮಾನದಲ್ಲಿ ಹೊರಟರೆ ಮಧ್ಯಾಹ್ನ ೧೨:೧೫ರ ಒಳಗೆ ಬಾದಾಮಿಗೆ ತಲುಪಬಹುದು.',
    },
    road: {
      routeSummary: 'Bengaluru -> Tumakuru -> Sira -> Chitradurga -> Hosapete (Hampi bypass) -> Kushtagi -> Ilkal -> Badami',
      routeSummaryKn: 'ಬೆಂಗಳೂರು -> ತುಮಕೂರು -> ಚಿತ್ರದುರ್ಗ -> ಹೊಸಪೇಟೆ -> ಇಳಕಲ್ -> ಬಾದಾಮಿ',
      highways: 'NH 48 (6-lane expressway up to Chitradurga) + NH 50 (4-lane smooth highway to Ilkal) + SH 14',
      totalDistanceKm: 455,
      estimatedDrivingTime: '8h 00m - 8h 30m',
      tollEstimate: '₹480 - ₹540 total tolls',
      roadQuality: 'Excellent',
      scenicStops: ['Chitradurga Windmill Bluffs', 'Tungabhadra Dam & Hampi Heritage gateway', 'Ilkal Silk Saree Weaving Belt'],
      scenicStopsKn: ['ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಕೋಟೆ & ಗಾಳಿ ಯಂತ್ರಗಳು', 'ತುಂಗಭದ್ರಾ ಡ್ಯಾಮ್ & ಹಂಪಿ', 'ಇಳಕಲ್ ರೇಷ್ಮೆ ಸೀರೆಗಳ ಊರು'],
      recommendedPitStops: ['Paakashala (Sira NH 48)', 'Highway 18 Food Court (Chitradurga)', 'Royal Orchid / Malligi (Hosapete)', 'Hotel Mayura (Ilkal)'],
      cabFareEstimate: {
        hatchback: '₹5,200 - ₹6,000',
        sedan: '₹6,500 - ₹7,500',
        suv: '₹8,500 - ₹10,500',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Bengaluru,+Karnataka/Badami,+Karnataka',
    },
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    nameKn: 'ಹೈದರಾಬಾದ್',
    state: 'Telangana',
    distanceKm: 410,
    fastestTravelTime: '1 hr 15 min (Flight to Hubballi) or 7.5 hrs Drive',
    cheapestFareEstimate: '₹280 (Train)',
    recommendedMode: 'road',
    recommendationSummary: 'Scenic road drive via Raichur and Bagalkot (~7.5 hrs) or overnight TSRTC/KSRTC AC Sleeper from MGBS directly to Bagalkot/Badami.',
    recommendationSummaryKn: 'ರಾಯಚೂರು ಮತ್ತು ಬಾಗಲಕೋಟೆ ಮಾರ್ಗವಾಗಿ ಆರಾಮದಾಯಕ ೭.೫ ಗಂಟೆಗಳ ರಸ್ತೆ ಪ್ರಯಾಣ ಅಥವಾ ಎಂಜಿಬಿಎಸ್‌ನಿಂದ ರಾತ್ರಿಯ ಎಸಿ ಸ್ಲೀಪರ್ ಬಸ್.',
    trains: [
      {
        trainNumber: '17320',
        trainName: 'Hyderabad - Hubballi Express',
        trainNameKn: 'ಹೈದರಾಬಾದ್ - ಹುಬ್ಬಳ್ಳಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Hyderabad Deccan (HYB) / Secunderabad (SC)',
        destinationStation: 'Gadag Jn (GDG) -> Transfer to Badami (BDM)',
        departureTime: '15:50 (HYB)',
        arrivalTime: '03:15 AM (Gadag) / 04:45 AM (Badami)',
        duration: '11h 20m',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹310 | 3A: ₹840 | 2A: ₹1,210',
        proTip: 'Connects easily to Badami via Gadag or Bagalkot junction with local passenger connecting trains.',
        proTipKn: 'ಗದಗ ಅಥವಾ ಬಾಗಲಕೋಟೆ ಮೂಲಕ ಸುಲಭ ರೈಲು ಸಂಪರ್ಕ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
      {
        trainNumber: '17603',
        trainName: 'Kacheguda - Yelahanka / Vasco Express',
        trainNameKn: 'ಕಾಚೇಗುಡ - ವಾಸ್ಕೋ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Kacheguda (KCG)',
        destinationStation: 'Guntakal / Hubballi Jn',
        departureTime: '21:05 (KCG)',
        arrivalTime: '07:30 AM',
        duration: '10h 25m',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹320 | 3A: ₹880 | 2A: ₹1,250',
        proTip: 'Alight at Hubballi or Bellary and take a quick 2-hour taxi/bus directly into the Badami caves.',
        proTipKn: 'ಹುಬ್ಬಳ್ಳಿಯಲ್ಲಿ ಇಳಿದು ನೇರ ಬಸ್ ಮೂಲಕ ಬಾದಾಮಿಗೆ ಬರಬಹುದು.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'KSRTC / NWKRTC / TSRTC',
        busType: 'Corona AC Sleeper & Rajahamsa',
        busTypeKn: 'ಕರೋನಾ ಎಸಿ ಸ್ಲೀಪರ್ ಮತ್ತು ರಾಜಹಂಸ',
        boardingPoints: ['Mahatma Gandhi Bus Station (MGBS)', 'Afzalgunj', 'Aramghar Circle'],
        droppingPoints: ['Bagalkot New Bus Stand', 'Badami Stand'],
        departureTimes: '20:15 PM & 21:30 PM',
        duration: '8h 30m - 9h',
        fareRange: '₹750 - ₹1,150',
        amenities: ['AC / Non-AC Sleeper Berths', 'USB Chargers', 'Water Bottle'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Board at MGBS Hyderabad in late evening; you arrive at Bagalkot/Badami at sunrise.',
        proTipKn: 'ಸಂಜೆ ಎಂಜಿಬಿಎಸ್‌ನಲ್ಲಿ ಹೊರಟು ಸೂರ್ಯೋದಯಕ್ಕೆ ಬಾದಾಮಿ ತಲುಪಿ.',
      },
    ],
    flight: {
      nearestAirport: 'Hubballi Airport (HBX)',
      nearestAirportKn: 'ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣ (HBX)',
      airportCode: 'HBX',
      distanceToBadami: '105 km',
      driveTime: '2h 15m',
      flightDuration: '1h 20m direct (Star Air / IndiGo)',
      airlines: ['Star Air', 'IndiGo'],
      connectingRoadTransit: {
        taxiFare: '₹2,200 - ₹2,800',
        taxiDuration: '2h 15m',
        busDetails: 'Direct NWKRTC express bus from Hubballi Hosur Bus Stand every 30 mins.',
        busDetailsKn: 'ಹುಬ್ಬಳ್ಳಿ ಬಸ್ ನಿಲ್ದಾಣದಿಂದ ಪ್ರತಿ ೩೦ ನಿಮಿಷಕ್ಕೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್ಸುಗಳು.',
      },
      proTip: 'Star Air operates direct flights from Hyderabad to Hubballi with Embraer jets.',
      proTipKn: 'ಹೈದರಾಬಾದ್‌ನಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ನೇರ ವಿಮಾನ ಸಂಪರ್ಕವಿದೆ.',
    },
    road: {
      routeSummary: 'Hyderabad -> Mahbubnagar -> Raichur -> Sindhanur -> Mudgal -> Bagalkot -> Badami',
      routeSummaryKn: 'ಹೈದರಾಬಾದ್ -> ಮಹಬೂಬ್‌ನಗರ -> ರಾಯಚೂರು -> ಸಿಂಧನೂರು -> ಮುದಗಲ್ -> ಬಾಗಲಕೋಟೆ -> ಬಾದಾಮಿ',
      highways: 'NH 167 + SH 20 (Well-maintained state highways and dual carriage roads)',
      totalDistanceKm: 410,
      estimatedDrivingTime: '7h 30m - 8h 00m',
      tollEstimate: '₹220 - ₹280',
      roadQuality: 'Good',
      scenicStops: ['Krishna River Bridge at Raichur', 'Mudgal Medieval Fort Ramparts', 'Bagalkot Ghataprabha River'],
      scenicStopsKn: ['ರಾಯಚೂರಿನ ಕೃಷ್ಣಾ ನದಿ ಸೇತುವೆ', 'ಮುದಗಲ್ ಕೋಟೆ', 'ಬಾಗಲಕೋಟೆ ಘಟಪ್ರಭಾ ನದಿ'],
      recommendedPitStops: ['Food Pyramid (Jadcherla NH 44)', 'Raichur Highway Dhabas', 'Bagalkot Heritage Restaurant'],
      cabFareEstimate: {
        hatchback: '₹4,800 - ₹5,500',
        sedan: '₹5,800 - ₹6,800',
        suv: '₹8,000 - ₹9,500',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Hyderabad,+Telangana/Badami,+Karnataka',
    },
  },
  {
    id: 'mumbai_pune',
    name: 'Mumbai / Pune',
    nameKn: 'ಮುಂಬೈ / ಪುಣೆ',
    state: 'Maharashtra',
    distanceKm: 520,
    fastestTravelTime: '1h 10m Flight (Mumbai to Hubballi) + 2h Cab',
    cheapestFareEstimate: '₹380 (CSMT Gadag Express)',
    recommendedMode: 'train',
    recommendationSummary: 'Direct Train #11139 CSMT - Gadag Express stops right at Badami! Departs Mumbai at 21:20, Pune at 01:10, and reaches Badami at 12:45 noon.',
    recommendationSummaryKn: 'ನೇರ ರೈಲು #೧೧೧೩೯ ಮುಂಬೈ-ಗದಗ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಾದಾಮಿ ನಿಲ್ದಾಣದಲ್ಲೇ ನಿಲ್ಲುತ್ತದೆ! ಮುಂಬೈ ಮತ್ತು ಪುಣೆಯ ಪ್ರಯಾಣಿಕರಿಗೆ ಅತಿ ಸುಲಭ ಮಾರ್ಗ.',
    trains: [
      {
        trainNumber: '11139',
        trainName: 'Mumbai CSMT - Gadag Express',
        trainNameKn: 'ಮುಂಬೈ ಸಿಎಸ್‌ಎಂಟಿ - ಗದಗ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Mumbai CSMT / Dadar / Thane / Pune Jn',
        destinationStation: 'Badami (BDM)',
        departureTime: '21:20 (CSMT) / 01:10 (Pune)',
        arrivalTime: '12:45 PM (Next Day)',
        duration: '15h 25m (from CSMT) / 11h 35m (from Pune)',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['2A', '3A', 'SL', 'GN'],
        fareRange: 'SL: ₹380 | 3A: ₹1,020 | 2A: ₹1,480',
        proTip: 'Direct halt at Badami Railway Station (BDM)! No interchange needed. Extremely popular with heritage lovers from Maharashtra.',
        proTipKn: 'ಬಾದಾಮಿ ರೈಲು ನಿಲ್ದಾಣದಲ್ಲೇ ನಿಲ್ಲುತ್ತದೆ. ಯಾವುದೇ ಬಸ್ ಬದಲಾವಣೆ ಬೇಡ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
      {
        trainNumber: '11005',
        trainName: 'Chalukya Express',
        trainNameKn: 'ಚಾಲುಕ್ಯ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Dadar Central (DR) / Pune (PUNE)',
        destinationStation: 'Hubballi Jn (UBL) / Belagavi',
        departureTime: '21:30 (Dadar) / 01:45 (Pune)',
        arrivalTime: '11:30 AM (Hubballi)',
        duration: '14h',
        frequency: '3 days a week',
        frequencyKn: 'ವಾರದಲ್ಲಿ ೩ ದಿನಗಳು',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹370 | 3A: ₹1,010 | 2A: ₹1,450',
        proTip: 'Namesake Chalukya Express connects the historic Chalukyan capital corridor.',
        proTipKn: 'ಚಾಲುಕ್ಯರ ಐತಿಹಾಸಿಕ ಹೆಸರಿನ ರೈಲು.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'VRL Travels / SRS / National / KSRTC',
        busType: 'Multi-Axle AC Sleeper',
        busTypeKn: 'ಮಲ್ಟಿ-ಆಕ್ಸಲ್ ಎಸಿ ಸ್ಲೀಪರ್',
        boardingPoints: ['Borivali', 'Andheri', 'Vashi', 'Pune Swargate', 'Katraj'],
        droppingPoints: ['Badami Stand / Bagalkot'],
        departureTimes: '17:30 PM to 21:00 PM',
        duration: '11h - 13h',
        fareRange: '₹1,100 - ₹1,800',
        amenities: ['AC Sleeper', 'Charging Ports', 'Water', 'GPS Tracking'],
        bookingUrl: 'https://www.redbus.in',
        proTip: 'Multiple overnight sleepers run daily down the smooth NH 48 corridor via Kolhapur and Belagavi.',
        proTipKn: 'ಕೊಲ್ಹಾಪುರ, ಬೆಳಗಾವಿ ಮಾರ್ಗವಾಗಿ ದಿನಂಪ್ರತಿ ಹಲವು ಸ್ಲೀಪರ್ ಬಸ್‌ಗಳು ಲಭ್ಯ.',
      },
    ],
    flight: {
      nearestAirport: 'Hubballi Airport (HBX)',
      nearestAirportKn: 'ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣ (HBX)',
      airportCode: 'HBX',
      distanceToBadami: '105 km',
      driveTime: '2h 15m',
      flightDuration: '1h 10m direct from Mumbai (BOM)',
      airlines: ['IndiGo (Daily direct flight)'],
      connectingRoadTransit: {
        taxiFare: '₹2,200 - ₹2,800',
        taxiDuration: '2h 15m',
        busDetails: 'Direct NWKRTC buses from Hubballi to Badami.',
        busDetailsKn: 'ಹುಬ್ಬಳ್ಳಿಯಿಂದ ನೇರ ಬಸ್ಸುಗಳು ಲಭ್ಯ.',
      },
      proTip: 'Fly IndiGo BOM to HBX in just 70 minutes; catch a scenic afternoon drive straight to Agastya lake sunset!',
      proTipKn: 'ಮುಂಬೈನಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ಕೇವಲ ೭೦ ನಿಮಿಷಗಳಲ್ಲಿ ವಿಮಾನದಲ್ಲಿ ತಲುಪಿ.',
    },
    road: {
      routeSummary: 'Mumbai/Pune -> Satara -> Karad -> Kolhapur -> Nipani -> Sankeshwar -> Bagalkot -> Badami',
      routeSummaryKn: 'ಮುಂಬೈ/ಪುಣೆ -> ಸತಾರಾ -> ಕೊಲ್ಹಾಪುರ -> ಸಂಕೇಶ್ವರ -> ಬಾಗಲಕೋಟೆ -> ಬಾದಾಮಿ',
      highways: 'NH 48 (Golden Quadrilateral 6-lane) to Sankeshwar + SH 20 2-lane smooth state highway',
      totalDistanceKm: 520,
      estimatedDrivingTime: '9h 00m - 10h 00m (from Mumbai) / 7h 30m (from Pune)',
      tollEstimate: '₹620 - ₹740',
      roadQuality: 'Excellent',
      scenicStops: ['Western Ghats foothills', 'Kolhapur Mahalaxmi temple detour', 'Sugar cane fields of Krishna Valley'],
      scenicStopsKn: ['ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸುಂದರ ದೃಶ್ಯ', 'ಕೊಲ್ಹಾಪುರ ಮಹಾಲಕ್ಷ್ಮಿ ದೇವಾಲಯ', 'ಕಬ್ಬಿನ ಗದ್ದೆಗಳು'],
      recommendedPitStops: ['McD / Starbucks Pune-Bangalore Expressway', 'Sai International (Kolhapur bypass)', 'Amar Pure Veg (Nipani)'],
      cabFareEstimate: {
        hatchback: '₹6,500 - ₹7,500',
        sedan: '₹8,000 - ₹9,500',
        suv: '₹11,000 - ₹13,500',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Pune,+Maharashtra/Badami,+Karnataka',
    },
  },
  {
    id: 'goa',
    name: 'Goa (Panaji / Madgaon)',
    nameKn: 'ಗೋವಾ (ಪಣಜಿ / ಮಡಗಾಂವ್)',
    state: 'Goa',
    distanceKm: 240,
    fastestTravelTime: '4 hr 45 min (Scenic Drive through Western Ghats)',
    cheapestFareEstimate: '₹180 (KSRTC Sarige Bus)',
    recommendedMode: 'road',
    recommendationSummary: 'A world-famous coast-to-canyon heritage drive! Climb up the misty Anmod / Chorla Ghats into Dharwad, then cross into the red sandstone monuments of Badami.',
    recommendationSummaryKn: 'ಕರಾವಳಿಯಿಂದ ಕಣಿವೆಗೆ ಸುಂದರ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಘಾಟ್ ರಸ್ತೆ ಪ್ರಯಾಣ! ಪಣಜಿಯಿಂದ ೪.೫ ಗಂಟೆಗಳ ರಸ್ತೆ ಪ್ರಯಾಣ.',
    trains: [
      {
        trainNumber: '18048',
        trainName: 'Amaravati Express',
        trainNameKn: 'ಅಮರಾವತಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Vasco Da Gama (VSG) / Madgaon (MAO)',
        destinationStation: 'Hubballi Jn (UBL) / Gadag Jn',
        departureTime: '06:30 (VSG) / 07:15 (MAO)',
        arrivalTime: '11:45 AM (Hubballi)',
        duration: '4h 30m',
        frequency: '4 days a week',
        frequencyKn: 'ವಾರದಲ್ಲಿ ೪ ದಿನಗಳು',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹175 | 3A: ₹505 | 2A: ₹710',
        proTip: 'Passes directly by the roaring Dudhsagar Waterfalls in the ghats! Switch to Badami train or taxi at Hubballi.',
        proTipKn: 'ದೂದ್‌ಸಾಗರ್ ಜಲಪಾತದ ಸುಂದರ ದೃಶ್ಯಗಳ ಮೂಲಕ ಸಾಗುತ್ತದೆ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'KSRTC / Kadamba Transport',
        busType: 'Rajahamsa / Express Sarige',
        busTypeKn: 'ರಾಜಹಂಸ / ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಸಾರಿಗೆ',
        boardingPoints: ['Panaji KSRTC Bus Stand', 'Madgaon KTC Stand', 'Ponda'],
        droppingPoints: ['Badami Stand / Bagalkot'],
        departureTimes: '07:30 AM (Day Service) & 20:30 PM (Night Service)',
        duration: '5h 30m - 6h',
        fareRange: '₹280 - ₹450',
        amenities: ['Comfortable 2x2 pushback seats'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Morning departure allows you to enjoy daylight views of the lush Bhagwan Mahaveer Sanctuary.',
        proTipKn: 'ಬೆಳಗಿನ ಬಸ್‌ನಲ್ಲಿ ಹೋದರೆ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಹಸಿರು ಕಣಿವೆಗಳನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಬಹುದು.',
      },
    ],
    road: {
      routeSummary: 'Panaji -> Ponda -> Mollem -> Anmod Ghat -> Ramnagar -> Dharwad -> Navalgund -> Badami',
      routeSummaryKn: 'ಪಣಜಿ -> ಪೋಂಡಾ -> ಮೊಲ್ಲೆಂ -> ಅನ್ಮೋಡ್ ಘಾಟ್ -> ಧಾರವಾಡ -> ನವಲಗುಂದ -> ಬಾದಾಮಿ',
      highways: 'NH 748 (Ghats road through reserve forest) + SH 34',
      totalDistanceKm: 240,
      estimatedDrivingTime: '4h 45m - 5h 15m',
      tollEstimate: '₹85',
      roadQuality: 'Scenic Ghats',
      scenicStops: ['Dudhsagar Viewpoint / Mollem National Park', 'Misty Western Ghats mountain curves', 'Dharwad Pedha Sweet Hub'],
      scenicStopsKn: ['ಮೊಲ್ಲೆಂ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ', 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮಂಜಿನ ಬೆಟ್ಟಗಳು', 'ಧಾರವಾಡ ಪೇಢಾ ಅಂಗಡಿಗಳು'],
      recommendedPitStops: ['Mollem Forest Resort Cafe', 'Dharwad Mishra Pedha Junction', 'Navalgund highway dhabas'],
      cabFareEstimate: {
        hatchback: '₹3,600 - ₹4,200',
        sedan: '₹4,500 - ₹5,200',
        suv: '₹6,000 - ₹7,200',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Panaji,+Goa/Badami,+Karnataka',
    },
  },
  {
    id: 'hubballi_dharwad',
    name: 'Hubballi / Dharwad (Regional Transit Gateway)',
    nameKn: 'ಹುಬ್ಬಳ್ಳಿ / ಧಾರವಾಡ (ಪ್ರಾದೇಶಿಕ ಹೆಬ್ಬಾಗಿಲು)',
    state: 'Karnataka',
    distanceKm: 105,
    fastestTravelTime: '1 hr 45 min (Train or Taxi)',
    cheapestFareEstimate: '₹45 (Unreserved Train Ticket)',
    recommendedMode: 'train',
    recommendationSummary: 'Hubballi is the chief railway headquarters and airport hub of North Karnataka, only 105 km away. Trains and express buses leave almost every 30 minutes!',
    recommendationSummaryKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ರೈಲ್ವೆ ಜಂಕ್ಷನ್ ಮತ್ತು ವಿಮಾನ ನಿಲ್ದಾಣ. ಕೇವಲ ೧೦೫ ಕಿ.ಮೀ ದೂರದಲ್ಲಿದ್ದು ಪ್ರತಿ ೩೦ ನಿಮಿಷಕ್ಕೆ ರೈಲು/ಬಸ್ಸುಗಳು ಲಭ್ಯ.',
    trains: [
      {
        trainNumber: '06920 / 16535',
        trainName: 'Hubballi - Solapur / Gol Gumbaz Express',
        trainNameKn: 'ಹುಬ್ಬಳ್ಳಿ - ಸೊಲ್ಲಾಪುರ / ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'Hubballi Jn (UBL)',
        destinationStation: 'Badami (BDM)',
        departureTime: '03:45 AM, 06:15 AM, 10:30 AM, 16:20 PM, 20:45 PM',
        arrivalTime: 'Multiple throughout the day (1h 45m - 2h 15m journey)',
        duration: '1h 50m',
        frequency: '6+ Daily Trains',
        frequencyKn: 'ದಿನಕ್ಕೆ ೬ಕ್ಕೂ ಹೆಚ್ಚು ರೈಲುಗಳು',
        classes: ['2S', 'SL', '3A', 'GN'],
        fareRange: 'General: ₹45 | 2S: ₹75 | SL: ₹145 | 3A: ₹505',
        proTip: 'Quickest, smoothest and most cost-effective connection directly to Badami railhead.',
        proTipKn: 'ಬಾದಾಮಿಗೆ ತಲುಪಲು ಅತ್ಯಂತ ಸುಲಭ ಮತ್ತು ಅಗ್ಗದ ರೈಲು ಮಾರ್ಗ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'NWKRTC (North Western Karnataka Road Transport)',
        busType: 'Non-Stop & Express Red Cruisers',
        busTypeKn: 'ನಾನ್‌ಸ್ಟಾಪ್ & ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಕೆಂಪು ಬಸ್ಸುಗಳು',
        boardingPoints: ['Hubballi Hosur Bus Stand (Platform 6)', 'Old CBT Bus Stand', 'Dharwad CBT'],
        droppingPoints: ['Badami Bus Stand'],
        departureTimes: 'Every 25-30 minutes from 05:30 AM to 22:30 PM',
        duration: '2h 15m - 2h 30m',
        fareRange: '₹110 - ₹135',
        amenities: ['Frequent departures', 'Government subsidized fares'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'No advance booking required. Just walk up to Hosur Bus Stand and hop on the next Badami or Bagalkot express.',
        proTipKn: 'ಯಾವುದೇ ಮುಂಗಡ ಬುಕಿಂಗ್ ಬೇಡ. ಹೊಸೂರು ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋದರೆ ತಕ್ಷಣ ಬಸ್ ಸಿಗುತ್ತದೆ.',
      },
    ],
    road: {
      routeSummary: 'Hubballi -> Navalgund -> Nargund -> Ron -> Badami (or via Gadag / Bagalkot NH 218)',
      routeSummaryKn: 'ಹುಬ್ಬಳ್ಳಿ -> ನವಲಗುಂದ -> ನರಗುಂದ -> ರೋಣ -> ಬಾದಾಮಿ',
      highways: 'SH 34 & NH 218 (Paved 2-lane North Karnataka highway)',
      totalDistanceKm: 105,
      estimatedDrivingTime: '1h 45m - 2h 00m',
      tollEstimate: '₹40',
      roadQuality: 'Good',
      scenicStops: ['Nargund historic hill ramparts', 'Cotton and chili farmlands of Malaprabha basin'],
      scenicStopsKn: ['ನರಗುಂದ ಐತಿಹಾಸಿಕ ಕೋಟೆ ಬೆಟ್ಟ', 'ಮಲಪ್ರಭಾ ಕಣಿವೆಯ ಹತ್ತಿ ಮತ್ತು ಮೆಣಸಿನಕಾಯಿ ಹೊಲಗಳು'],
      recommendedPitStops: ['Navalgund highway bakeries', 'Ron town tea junction'],
      cabFareEstimate: {
        hatchback: '₹1,800 - ₹2,200',
        sedan: '₹2,200 - ₹2,600',
        suv: '₹3,000 - ₹3,600',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Hubballi,+Karnataka/Badami,+Karnataka',
    },
  },
  {
    id: 'belagavi',
    name: 'Belagavi (Belgaum)',
    nameKn: 'ಬೆಳಗಾವಿ',
    state: 'Karnataka',
    distanceKm: 145,
    fastestTravelTime: '2 hr 45 min (Cab or Express Bus)',
    cheapestFareEstimate: '₹140 (Bus)',
    recommendedMode: 'road',
    recommendationSummary: 'Belagavi offers its own commercial airport (IXG) and rail connections. A 145 km smooth highway connects Belagavi to Badami via Yaragatti and Lokapur.',
    recommendationSummaryKn: 'ಬೆಳಗಾವಿಯ ವಿಮಾನ ನಿಲ್ದಾಣ (IXG) ಮತ್ತು ರೈಲು ನಿಲ್ದಾಣದಿಂದ ಕೇವಲ ೧೪೫ ಕಿ.ಮೀ. ಯರಗಟ್ಟಿ, ಲೋಕಾಪುರ ಮಾರ್ಗವಾಗಿ ಸುಗಮ ರಸ್ತೆ.',
    trains: [
      {
        trainNumber: 'Connecting via Londa / Hubballi',
        trainName: 'Belagavi - Badami connecting trains',
        trainNameKn: 'ಬೆಳಗಾವಿ - ಬಾದಾಮಿ ಸಂಪರ್ಕ ರೈಲುಗಳು',
        originStation: 'Belagavi (BGM)',
        destinationStation: 'Badami (BDM)',
        departureTime: 'Multiple connecting options',
        arrivalTime: '3h 30m connecting time',
        duration: '3h 30m',
        frequency: 'Daily',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['SL', '3A', 'GN'],
        fareRange: '₹120 - ₹450',
        proTip: 'Direct bus or taxi via Yaragatti is faster than train for Belagavi travelers.',
        proTipKn: 'ಬೆಳಗಾವಿಯಿಂದ ರೈಲಿಗಿಂತ ಬಸ್ ಅಥವಾ ಟ್ಯಾಕ್ಸಿ ಹೆಚ್ಚು ವೇಗವಾಗಿದೆ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'NWKRTC',
        busType: 'Express Sarige & Rajahamsa',
        busTypeKn: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಸಾರಿಗೆ ಮತ್ತು ರಾಜಹಂಸ',
        boardingPoints: ['Belagavi Central Bus Stand (CBT)'],
        droppingPoints: ['Badami Bus Stand'],
        departureTimes: 'Hourly from 06:00 AM to 19:30 PM',
        duration: '3h 00m - 3h 15m',
        fareRange: '₹145 - ₹195',
        amenities: ['Express transit', 'Regular frequency'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Buses run frequently via Bailhongal, Yaragatti, and Lokapur.',
        proTipKn: 'ಬೈಲಹೊಂಗಲ, ಯರಗಟ್ಟಿ ಮೂಲಕ ಪ್ರತಿ ಗಂಟೆಗೆ ಬಸ್ಸುಗಳು ಹೊರಡುತ್ತವೆ.',
      },
    ],
    flight: {
      nearestAirport: 'Belagavi Sambra Airport (IXG)',
      nearestAirportKn: 'ಬೆಳಗಾವಿ ಸಾಂಬ್ರಾ ವಿಮಾನ ನಿಲ್ದಾಣ (IXG)',
      airportCode: 'IXG',
      distanceToBadami: '145 km',
      driveTime: '2h 45m',
      flightDuration: 'Flights from Bengaluru, Mumbai, Pune, Hyderabad',
      airlines: ['IndiGo', 'Star Air'],
      connectingRoadTransit: {
        taxiFare: '₹2,800 - ₹3,500',
        taxiDuration: '2h 45m',
        busDetails: 'Take airport shuttle to Belagavi Central Bus Stand; take direct Badami bus.',
        busDetailsKn: 'ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ಬೆಳಗಾವಿ ಸೆಂಟ್ರಲ್ ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗಿ, ಅಲ್ಲಿಂದ ಬಾದಾಮಿ ಬಸ್ ಹತ್ತಿ.',
      },
      proTip: 'Belagavi Airport is an ideal gateway for travelers from Pune, Mumbai, and Delhi.',
      proTipKn: 'ಮಹಾರಾಷ್ಟ್ರ ಮತ್ತು ಉತ್ತರ ಭಾರತದ ಪ್ರವಾಸಿಗರಿಗೆ ಅನುಕೂಲಕರ ವಿಮಾನ ನಿಲ್ದಾಣ.',
    },
    road: {
      routeSummary: 'Belagavi -> Nesargi -> Yaragatti -> Lokapur -> Kulageri Cross -> Badami',
      routeSummaryKn: 'ಬೆಳಗಾವಿ -> ನೇಸರ್ಗಿ -> ಯರಗಟ್ಟಿ -> ಲೋಕಾಪುರ -> ಕುಲಗೇರಿ ಕ್ರಾಸ್ -> ಬಾದಾಮಿ',
      highways: 'SH 20 (Smooth asphalt 2-lane highway)',
      totalDistanceKm: 145,
      estimatedDrivingTime: '2h 45m - 3h 00m',
      tollEstimate: '₹0 (State Highway)',
      roadQuality: 'Good',
      scenicStops: ['Malaprabha river canals', 'Limestone quarries of Lokapur'],
      scenicStopsKn: ['ಮಲಪ್ರಭಾ ಕಾಲುವೆಗಳು', 'ಲೋಕಾಪುರದ ಸುಣ್ಣದ ಕಲ್ಲು ಗಣಿಗಳು'],
      recommendedPitStops: ['Yaragatti town restaurants', 'Kunda sweet shops of Belagavi before leaving'],
      cabFareEstimate: {
        hatchback: '₹2,500 - ₹3,000',
        sedan: '₹3,000 - ₹3,600',
        suv: '₹4,200 - ₹5,000',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Belagavi,+Karnataka/Badami,+Karnataka',
    },
  },
  {
    id: 'vijayapura',
    name: 'Vijayapura (Bijapur)',
    nameKn: 'ವಿಜಯಪುರ (ಬಿಜಾಪುರ)',
    state: 'Karnataka',
    distanceKm: 120,
    fastestTravelTime: '2 hr (Train or Car)',
    cheapestFareEstimate: '₹45 (Passenger Train)',
    recommendedMode: 'train',
    recommendationSummary: 'Ideal for combining the Adil Shahi Gol Gumbaz heritage tour with Chalukyan cave temples. Multiple daily trains and non-stop buses run directly between Vijayapura and Badami.',
    recommendationSummaryKn: 'ಆದಿಲ್ ಶಾಹಿ ಗೋಳಗುಮ್ಮಟ ಮತ್ತು ಚಾಲುಕ್ಯರ ಗುಹೆಗಳನ್ನು ಒಟ್ಟಿಗೆ ನೋಡಲು ಬಯಸುವವರಿಗೆ ಅತ್ಯುತ್ತಮ. ಕೇವಲ ೨ ಗಂಟೆಗಳ ನೇರ ಪ್ರಯಾಣ.',
    trains: [
      {
        trainNumber: '16536 / 17308 / 06919',
        trainName: 'Gol Gumbaz / Basava / Solapur Passenger',
        trainNameKn: 'ಗೋಳಗುಮ್ಮಟ / ಬಸವ / ಪ್ಯಾಸೆಂಜರ್ ರೈಲುಗಳು',
        originStation: 'Vijayapura (BJP)',
        destinationStation: 'Badami (BDM)',
        departureTime: '08:15 AM, 14:30 PM, 17:10 PM, 23:45 PM',
        arrivalTime: '2h journey time',
        duration: '1h 55m',
        frequency: 'Daily (5+ trains)',
        frequencyKn: 'ದಿನಕ್ಕೆ ೫ಕ್ಕೂ ಹೆಚ್ಚು ರೈಲುಗಳು',
        classes: ['2S', 'SL', '3A', 'GN'],
        fareRange: 'General: ₹45 | 2S: ₹70 | SL: ₹145 | 3A: ₹505',
        proTip: 'Very scenic and relaxed rail journey across the Almatti reservoir backwaters on Krishna river!',
        proTipKn: 'ಕೃಷ್ಣಾ ನದಿಯ ಆಲಮಟ್ಟಿ ಜಲಾಶಯದ ನೀರನ್ನು ದಾಟುವ ಅದ್ಭುತ ರೈಲು ಮಾರ್ಗ!',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'NWKRTC',
        busType: 'Express Sarige',
        busTypeKn: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಸಾರಿಗೆ',
        boardingPoints: ['Vijayapura Central Bus Stand'],
        droppingPoints: ['Badami Bus Stand / Bagalkot'],
        departureTimes: 'Every 20 minutes from 06:00 AM to 21:00 PM',
        duration: '2h 15m',
        fareRange: '₹120 - ₹145',
        amenities: ['Continuous service', 'Scenic route'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Passes directly across the massive Almatti Dam bridge.',
        proTipKn: 'ಆಲಮಟ್ಟಿ ಡ್ಯಾಂ ಸೇತುವೆಯ ಮೂಲಕ ಹಾದುಹೋಗುತ್ತದೆ.',
      },
    ],
    road: {
      routeSummary: 'Vijayapura -> Kolhar -> Almatti Dam -> Bagalkot -> Badami',
      routeSummaryKn: 'ವಿಜಯಪುರ -> ಕೋಲ್ಹಾರ -> ಆಲಮಟ್ಟಿ ಡ್ಯಾಂ -> ಬಾಗಲಕೋಟೆ -> ಬಾದಾಮಿ',
      highways: 'NH 50 4-lane expressway + SH 14',
      totalDistanceKm: 120,
      estimatedDrivingTime: '2h 00m',
      tollEstimate: '₹65',
      roadQuality: 'Excellent',
      scenicStops: ['Almatti Dam Mughal Gardens and Rock Fountain', 'Kolhar famous Yogurt/Curd Pots (ಕೊಲ್ಹಾರ ಮೊಸರು)'],
      scenicStopsKn: ['ಆಲಮಟ್ಟಿ ಡ್ಯಾಂ ಉದ್ಯಾನವನ', 'ಕೊಲ್ಹಾರದ ಜಗತ್ಪ್ರಸಿದ್ಧ ಗಡಿಗೆ ಮೊಸರು'],
      recommendedPitStops: ['Kolhar roadside curd stalls', 'Almatti Dam KSTDC Mayura restaurant'],
      cabFareEstimate: {
        hatchback: '₹2,000 - ₹2,400',
        sedan: '₹2,400 - ₹3,000',
        suv: '₹3,400 - ₹4,000',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Vijayapura,+Karnataka/Badami,+Karnataka',
    },
  },
  {
    id: 'chennai',
    name: 'Chennai',
    nameKn: 'ಚೆನ್ನೈ',
    state: 'Tamil Nadu',
    distanceKm: 780,
    fastestTravelTime: '4h 15m (Flight to Hubballi via BLR + Cab)',
    cheapestFareEstimate: '₹440 (Train via Bengaluru/Guntakal)',
    recommendedMode: 'train',
    recommendationSummary: 'Take the daily Chennai Central to Hubballi Express (22698) or take Shatabdi / Vande Bharat to Bengaluru, then overnight Gol Gumbaz Express directly to Badami.',
    recommendationSummaryKn: 'ಚೆನ್ನೈನಿಂದ ವಂದೇ ಭಾರತ್ ಮೂಲಕ ಬೆಂಗಳೂರಿಗೆ ಬಂದು, ಅಲ್ಲಿಂದ ರಾತ್ರಿಯ ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ನಲ್ಲಿ ಬಾದಾಮಿಗೆ ತಲುಪಿ.',
    trains: [
      {
        trainNumber: '22698 / 16535',
        trainName: 'Chennai Central - Hubballi Superfast / Gol Gumbaz Express',
        trainNameKn: 'ಚೆನ್ನೈ - ಹುಬ್ಬಳ್ಳಿ ಸೂಪರ್‌ಫಾಸ್ಟ್ / ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'MGR Chennai Central (MAS)',
        destinationStation: 'Badami (BDM)',
        departureTime: '15:00 PM (MAS) -> Connect to Badami',
        arrivalTime: 'Next morning',
        duration: '15h total',
        frequency: 'Daily / Weekly',
        frequencyKn: 'ದಿನಂಪ್ರತಿ / ವಾರಕ್ಕೊಮ್ಮೆ',
        classes: ['2A', '3A', 'SL'],
        fareRange: 'SL: ₹440 | 3A: ₹1,180 | 2A: ₹1,690',
        proTip: 'Smooth rail journey via Renigunta, Guntakal or Bengaluru SBC.',
        proTipKn: 'ಬೆಂಗಳೂರು ಅಥವಾ ಗುಂತಕಲ್ ಮೂಲಕ ಸುಗಮ ರೈಲು ಪ್ರಯಾಣ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'KSRTC / Private Multi-Axle Sleepers',
        busType: 'AC Sleeper via Bengaluru',
        busTypeKn: 'ಬೆಂಗಳೂರು ಮಾರ್ಗದ ಎಸಿ ಸ್ಲೀಪರ್',
        boardingPoints: ['Koyambedu (CMBT)', 'Guindy'],
        droppingPoints: ['Badami'],
        departureTimes: 'Multiple connecting options',
        duration: '14h - 16h',
        fareRange: '₹1,200 - ₹2,100',
        amenities: ['AC Sleeper', 'Charging ports'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Take overnight sleeper to Bengaluru Majestic; switch directly to morning Badami bus.',
        proTipKn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಬದಲಾವಣೆ ಮಾಡಿ ಸುಲಭವಾಗಿ ಪ್ರಯಾಣಿಸಿ.',
      },
    ],
    road: {
      routeSummary: 'Chennai -> Chittoor -> Bengaluru -> Chitradurga -> Hosapete -> Badami',
      routeSummaryKn: 'ಚೆನ್ನೈ -> ಚಿತ್ತೂರು -> ಬೆಂಗಳೂರು -> ಚಿತ್ರದುರ್ಗ -> ಹೊಸಪೇಟೆ -> ಬಾದಾಮಿ',
      highways: 'NH 48 + NH 50 (Full 4 to 6-lane expressways)',
      totalDistanceKm: 780,
      estimatedDrivingTime: '13h 00m - 14h 00m',
      tollEstimate: '₹850',
      roadQuality: 'Excellent',
      scenicStops: ['Hampi ruins stopover', 'Tungabhadra Dam reservoir'],
      scenicStopsKn: ['ಹಂಪಿ ಸ್ಮಾರಕಗಳು', 'ತುಂಗಭದ್ರಾ ಜಲಾಶಯ'],
      recommendedPitStops: ['Kolar Highway Dhabas', 'Paakashala Sira', 'Malligi Hosapete'],
      cabFareEstimate: {
        hatchback: '₹10,000 - ₹12,000',
        sedan: '₹12,500 - ₹14,500',
        suv: '₹16,000 - ₹19,000',
      },
      navigationUrl: 'https://www.google.com/maps/dir/Chennai,+Tamil+Nadu/Badami,+Karnataka',
    },
  },
  {
    id: 'delhi',
    name: 'Delhi / North India',
    nameKn: 'ದೆಹಲಿ / ಉತ್ತರ ಭಾರತ',
    state: 'Delhi NCR',
    distanceKm: 1650,
    fastestTravelTime: '2 hr 45 min Flight (Delhi to Hubballi via BOM/BLR) + 2 hr Cab',
    cheapestFareEstimate: '₹680 (Karnataka Express / Goa Express)',
    recommendedMode: 'flight',
    recommendationSummary: 'Fly from New Delhi (DEL) to Hubballi Airport (HBX) via IndiGo (direct or 1-stop via Mumbai/Bengaluru), followed by a 2-hour scenic taxi ride straight into Badami sandstone valley.',
    recommendationSummaryKn: 'ದೆಹಲಿಯಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ವಿಮಾನದಲ್ಲಿ ಬಂದು, ಅಲ್ಲಿಂದ ಕೇವಲ ೨ ಗಂಟೆಗಳಲ್ಲಿ ಟ್ಯಾಕ್ಸಿ ಮೂಲಕ ಬಾದಾಮಿ ತಲುಪಿ.',
    trains: [
      {
        trainNumber: '12628 / 12780',
        trainName: 'Karnataka Express / Goa Express',
        trainNameKn: 'ಕರ್ನಾಟಕ ಎಕ್ಸ್‌ಪ್ರೆಸ್ / ಗೋವಾ ಎಕ್ಸ್‌ಪ್ರೆಸ್',
        originStation: 'New Delhi (NDLS) / Hazrat Nizamuddin (NZM)',
        destinationStation: 'Solapur Jn (SUR) / Hubballi Jn (UBL)',
        departureTime: '21:15 (NDLS) / 15:15 (NZM)',
        arrivalTime: 'Next day evening',
        duration: '26h - 30h',
        frequency: 'Daily (ಪ್ರತಿದಿನ)',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['1A', '2A', '3A', 'SL'],
        fareRange: 'SL: ₹680 | 3A: ₹1,790 | 2A: ₹2,600 | 1A: ₹4,420',
        proTip: 'Alight at Solapur or Hubballi; direct connecting trains like Gol Gumbaz Express bring you right to Badami station.',
        proTipKn: 'ಸೊಲ್ಲಾಪುರ ಅಥವಾ ಹುಬ್ಬಳ್ಳಿಯಲ್ಲಿ ಇಳಿದು ಬಾದಾಮಿ ರೈಲು ಹತ್ತಿ.',
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'Connecting via Hubballi / Pune',
        busType: 'Overnight Inter-state Sleeper',
        busTypeKn: 'ಅಂತರರಾಜ್ಯ ಸ್ಲೀಪರ್ ಬಸ್',
        boardingPoints: ['Pune / Hubballi transit hubs'],
        droppingPoints: ['Badami'],
        departureTimes: 'Daily evenings',
        duration: 'Connecting',
        fareRange: '₹1,500 - ₹2,500',
        amenities: ['Sleeper Berths', 'Charging'],
        bookingUrl: 'https://ksrtc.in',
        proTip: 'Combine with Pune or Bengaluru train/flight for comfortable bus connection.',
        proTipKn: 'ವಿಮಾನ ಅಥವಾ ರೈಲಿನ ಜೊತೆ ಬಸ್ ಸಂಯೋಜಿಸಿ.',
      },
    ],
    flight: {
      nearestAirport: 'Hubballi Airport (HBX) / Belagavi (IXG)',
      nearestAirportKn: 'ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣ (HBX)',
      airportCode: 'HBX',
      distanceToBadami: '105 km',
      driveTime: '2h 15m',
      flightDuration: '2h 45m (connecting flight via BOM/BLR)',
      airlines: ['IndiGo', 'Air India', 'Star Air'],
      connectingRoadTransit: {
        taxiFare: '₹2,200 - ₹2,800',
        taxiDuration: '2h 15m',
        busDetails: 'Direct NWKRTC buses every 30 mins from Hubballi Hosur Bus Stand.',
        busDetailsKn: 'ಹುಬ್ಬಳ್ಳಿಯಿಂದ ಪ್ರತಿ ೩೦ ನಿಮಿಷಕ್ಕೆ ಸರ್ಕಾರಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್ಸುಗಳು.',
      },
      proTip: 'IndiGo provides seamless booking from Delhi to Hubballi with luggage checked straight through.',
      proTipKn: 'ದೆಹಲಿಯಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ಇಂಡಿಗೋ ವಿಮಾನ ಅತ್ಯಂತ ಪ್ರಶಸ್ತ.',
    },
    road: {
      routeSummary: 'Delhi -> Agra -> Gwalior -> Nagpur -> Hyderabad -> Bagalkot -> Badami',
      routeSummaryKn: 'ದೆಹಲಿ -> ಆಗ್ರಾ -> ನಾಗ್ಪುರ -> ಹೈದರಾಬಾದ್ -> ಬಾಗಲಕೋಟೆ -> ಬಾದಾಮಿ',
      highways: 'NH 44 North-South Corridor + NH 167',
      totalDistanceKm: 1650,
      estimatedDrivingTime: '28h driving time (Recommended 2-night stopover in Gwalior and Hyderabad)',
      tollEstimate: '₹2,100',
      roadQuality: 'Good',
      scenicStops: ['Deccan Plateau transition', 'Central India Vindhya & Satpura ranges'],
      scenicStopsKn: ['ಮಧ್ಯ ಭಾರತದ ಪರ್ವತ ಶ್ರೇಣಿಗಳು', 'ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ'],
      recommendedPitStops: ['Nagpur Highway Hubs', 'Hyderabad Outer Ring Road'],
      cabFareEstimate: {
        hatchback: '₹22,000+',
        sedan: '₹26,000+',
        suv: '₹34,000+',
      },
      navigationUrl: 'https://www.google.com/maps/dir/New+Delhi,+Delhi/Badami,+Karnataka',
    },
  },
];

export const LOCAL_TRANSIT_OPTIONS: LocalTransitOption[] = [
  {
    id: 'nwkrtc_shuttle',
    mode: 'bus',
    modeKn: 'ಬಸ್',
    icon: '🚌',
    title: 'NWKRTC Rural Heritage Red Buses (ಸರ್ಕಾರಿ ಕೆಂಪು ಬಸ್ಸುಗಳು)',
    titleKn: 'ವಾಯವ್ಯ ಸಾರಿಗೆ ಗ್ರಾಮೀಣ ಕೆಂಪು ಬಸ್ಸುಗಳು',
    coverage: 'Badami Bus Stand <-> Banashankari (5km) <-> Mahakuta Cross <-> Pattadakal (22km) <-> Aihole (34km)',
    coverageKn: 'ಬಾದಾಮಿ ಬಸ್ ನಿಲ್ದಾಣ <-> ಬನಶಂಕರಿ <-> ಮಹಾಕೂಟ <-> ಪಟ್ಟದಕಲ್ಲು <-> ಐಹೊಳೆ',
    timings: 'Every 25 to 40 minutes from 06:30 AM to 19:30 PM (Platform 3, Badami Bus Stand)',
    fareCard: 'Badami to Banashankari: ₹15 | Badami to Pattadakal: ₹28 | Badami to Aihole: ₹42',
    fareCardKn: 'ಬನಶಂಕರಿಗೆ: ₹೧೫ | ಪಟ್ಟದಕಲ್ಲಿಗೆ: ₹೨೮ | ಐಹೊಳೆಗೆ: ₹೪೨',
    bestFor: 'Solo travelers, backpackers, students, and budget explorers seeking genuine local immersion',
    bestForKn: 'ಏಕಾಂಗಿ ಪ್ರವಾಸಿಗರು, ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಬಜೆಟ್ ಯಾತ್ರಿಕರಿಗೆ ಅತ್ಯುತ್ತಮ',
    standLocation: 'Badami KSRTC Central Bus Stand (Platform 3) & Pattadakal Bus Shelter',
    standLocationKn: 'ಬಾದಾಮಿ ಕೇಂದ್ರ ಬಸ್ ನಿಲ್ದಾಣ (ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ೩)',
    helplineOrContact: 'NWKRTC Badami Depot Inquiry: 08357-220042',
    tips: [
      'Women residents of Karnataka travel free under the state Shakti Scheme upon presenting Aadhaar card.',
      'Last return bus from Aihole back to Badami departs at 18:15 PM. Do not miss it!',
      'Keep exact change (₹10, ₹20 notes) for conductor convenience.',
    ],
    tipsKn: [
      'ಕರ್ನಾಟಕದ ಮಹಿಳೆಯರಿಗೆ ಶಕ್ತಿ ಯೋಜನೆಯಡಿ ಉಚಿತ ಪ್ರಯಾಣ (ಆಧಾರ್ ಕಾರ್ಡ್ ತೋರಿಸಿ).',
      'ಐಹೊಳೆಯಿಂದ ಬಾದಾಮಿಗೆ ಕೊನೆಯ ಬಸ್ ಸಂಜೆ ೬:೧೫ಕ್ಕೆ ಹೊರಡುತ್ತದೆ.',
      'ಚಿಲ್ಲರೆ ಹಣವನ್ನು ನಿಮ್ಮ ಬಳಿ ಇಟ್ಟುಕೊಳ್ಳಿ.',
    ],
  },
  {
    id: 'auto_package',
    mode: 'auto',
    modeKn: 'ಆಟೋ',
    icon: '🛺',
    title: 'Authorized Golden Circuit Auto-Rickshaw Day Tour (ಆಟೋ ದಿನದ ಪ್ರವಾಸ)',
    titleKn: 'ಅಧಿಕೃತ ಚಾಲುಕ್ಯ ಸರ್ಕ್ಯೂಟ್ ಆಟೋ ದಿನದ ಪ್ರವಾಸ',
    coverage: 'Full-Day Door-to-Door Tour: Badami Caves + Bhootanatha + Banashankari + Mahakuta Spring + Pattadakal UNESCO + Aihole',
    coverageKn: 'ದಿನದ ಪೂರ್ಣ ಪ್ರವಾಸ: ಬಾದಾಮಿ ಗುಹೆಗಳು + ಭೂತನಾಥ + ಬನಶಂಕರಿ + ಮಹಾಕೂಟ + ಪಟ್ಟದಕಲ್ಲು + ಐಹೊಳೆ',
    timings: 'Flexible on-demand (Suggested start: 08:30 AM to catch cool morning sandstone light)',
    fareCard: 'Fixed Union Package: ₹1,400 - ₹1,800 for entire auto (up to 3-4 passengers, includes waiting at all monuments)',
    fareCardKn: 'ಯೂನಿಯನ್ ದರ: ಪೂರ್ಣ ಆಟೋಗೆ ₹೧,೪೦೦ - ₹೧,೮೦೦ (ಎಲ್ಲಾ ತಾಣಗಳ ಕಾಯುವಿಕೆ ಸೇರಿ)',
    bestFor: 'Couples, small families, photographers wanting flexibility to stop at sunflower fields & village pit stops',
    bestForKn: 'ದಂಪತಿಗಳು, ಸಣ್ಣ ಕುಟುಂಬಗಳು ಮತ್ತು ಛಾಯಾಗ್ರಾಹಕರಿಗೆ ಹೆಚ್ಚು ಅನುಕೂಲಕರ',
    standLocation: 'Badami Railway Station Circle & Bus Stand Auto Union Pre-paid Stand',
    standLocationKn: 'ಬಾದಾಮಿ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಸರ್ಕಲ್ ಮತ್ತು ಬಸ್ ನಿಲ್ದಾಣ ಆಟೋ ಸ್ಟಾಂಡ್',
    helplineOrContact: 'Badami Auto Drivers Welfare Union Stand: Station Road',
    tips: [
      'Agree on the all-inclusive rate before boarding; waiting charges at Pattadakal and Aihole are usually included.',
      'Ask the driver to stop at Mahakuta sacred pushkarani spring for a refreshing dip.',
      'Drivers know the best hidden Jolada Rotti lunch canteens along the rural highway.',
    ],
    tipsKn: [
      'ಹತ್ತುವ ಮುನ್ನವೇ ಎಲ್ಲಾ ತಾಣಗಳ ಕಾಯುವಿಕೆ ಸೇರಿದ ಮೊತ್ತವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      'ಮಹಾಕೂಟ ಪುಷ್ಕರಣಿಯಲ್ಲಿ ವಿಶ್ರಾಂತಿಗೆ ಆಟೋ ನಿಲ್ಲಿಸಲು ಚಾಲಕರಲ್ಲಿ ತಿಳಿಸಿ.',
      'ಸ್ಥಳೀಯ ಜೋಳದ ರೊಟ್ಟಿ ಊಟದ ಉತ್ತಮ ಹೋಟೆಲ್‌ಗಳನ್ನು ಚಾಲಕರು ತೋರಿಸುತ್ತಾರೆ.',
    ],
  },
  {
    id: 'taxi_cab',
    mode: 'cab',
    modeKn: 'ಟ್ಯಾಕ್ಸಿ',
    icon: '🚕',
    title: 'Private AC Tourist Taxi & Sedan Union (ಖಾಸಗಿ ಎಸಿ ಟೂರಿಸ್ಟ್ ಟ್ಯಾಕ್ಸಿ)',
    titleKn: 'ಖಾಸಗಿ ಹವಾನಿಯಂತ್ರಿತ ಪ್ರವಾಸಿ ಟ್ಯಾಕ್ಸಿ',
    coverage: 'All Circuit Monuments + Guledgudda Khana Weavers + Ilkal Saree Hub + Hotel Pickup & Drop',
    coverageKn: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ತಾಣಗಳು + ಗುಳೇದಗುಡ್ಡ ಖಣ ನೇಕಾರರು + ಇಳಕಲ್ ರೇಷ್ಮೆ ಸೀರೆ ತಾಣಗಳು',
    timings: 'Full Day 8 to 10 hours (Pickup from any hotel or railway station)',
    fareCard: 'Sedan (Dzire/Etios): ₹2,500 - ₹2,900 | SUV (Innova/Ertiga): ₹3,600 - ₹4,400 (Covers 100-120 km + driver allowance)',
    fareCardKn: 'ಸೆಡಾನ್: ₹೨,೫೦೦ - ₹೨,೯೦೦ | ಎಸ್‌ಯುವಿ (ಇನ್ನೋವಾ): ₹೩,೬೦೦ - ₹೪,೪೦೦',
    bestFor: 'Families with elderly travelers or kids, summer daytime visits, and rainy season comfort',
    bestForKn: 'ಹಿರಿಯ ನಾಗರಿಕರು, ಮಕ್ಕಳು ಇರುವ ಕುಟುಂಬಗಳಿಗೆ ಮತ್ತು ಬೇಸಿಗೆಯ ಬಿಸಿಲಿನಲ್ಲಿ ಎಸಿ ಆರಾಮ',
    standLocation: 'Badami Station Road, Hotel Mayura Chalukya Desk, and Bagalkot Hub',
    standLocationKn: 'ಬಾದಾಮಿ ಸ್ಟೇಷನ್ ರೋಡ್ ಮತ್ತು ಮಯೂರ ಚಾಲುಕ್ಯ ಡೆಸ್ಕ್',
    helplineOrContact: 'Badami Tourist Taxi Operators: 08357-220025',
    tips: [
      'Air-conditioned comfort protects against peak afternoon sun (30-36°C) between monuments.',
      'Includes ample trunk space for your backpacks, camera tripods, and Ilkal saree shopping bags.',
      'Can also arrange return drops to Hubballi Airport or Belagavi at end of your tour.',
    ],
    tipsKn: [
      'ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲಿನಲ್ಲಿ ಎಸಿ ವಾಹನ ಹೆಚ್ಚು ನೆಮ್ಮದಿ ನೀಡುತ್ತದೆ.',
      'ಶಾಪಿಂಗ್ ಬ್ಯಾಗ್‌ಗಳು ಮತ್ತು ಸಾಮಾನುಗಳನ್ನು ಇಡಲು ಸಾಕಷ್ಟು ಜಾಗವಿರುತ್ತದೆ.',
      'ಪ್ರವಾಸ ಮುಗಿದ ನಂತರ ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣಕ್ಕೂ ಡ್ರಾಪ್ ಪಡೆಯಬಹುದು.',
    ],
  },
  {
    id: 'bike_rental',
    mode: 'bike',
    modeKn: 'ಬೈಕ್ / ಸ್ಕೂಟರ್',
    icon: '🛵',
    title: 'Two-Wheeler & Scooter Self-Ride Rentals (ಸ್ಕೂಟರ್ / ಬೈಕ್ ಬಾಡಿಗೆ)',
    titleKn: 'ಸ್ಕೂಟರ್ ಮತ್ತು ಬೈಕ್ ಬಾಡಿಗೆ ಸೇವೆ',
    coverage: 'Freedom to explore offbeat canyon trails, Mahakuta, Banashankari, and Pattadakal at your own tempo',
    coverageKn: 'ಕಣಿವೆ ರಸ್ತೆಗಳು, ಸೂರ್ಯೋದಯ ಮತ್ತು ಸೂರ್ಯಾಸ್ತದ ತಾಣಗಳನ್ನು ನಿಮ್ಮದೇ ವೇಗದಲ್ಲಿ ಅನ್ವೇಷಿಸಿ',
    timings: '24-Hour Rental (08:00 AM to 08:00 AM next day)',
    fareCard: 'Gearless Scooter (Activa): ₹450 - ₹600/day | Geared Bike (Pulsar/Bullet): ₹700 - ₹1,100/day (+ fuel on actuals)',
    fareCardKn: 'ಸ್ಕೂಟರ್ (ಆಕ್ಟಿವಾ): ₹೪೫೦ - ₹೬೦೦/ದಿನ | ಬುಲೆಟ್/ಬೈಕ್: ₹೭೦೦ - ₹೧,೧೦೦/ದಿನ',
    bestFor: 'Young travelers, backpackers, and adventure couples who love open-air breezes and spontaneous stops',
    bestForKn: 'ಯುವಕರು, ಸಾಹಸಿಗಳು ಮತ್ತು ಮುಕ್ತ ಗಾಳಿಯಲ್ಲಿ ಸುತ್ತಾಡಲು ಬಯಸುವ ದಂಪತಿಗಳಿಗೆ',
    standLocation: 'Near Badami Railway Station & Main Bazaar Road',
    standLocationKn: 'ಬಾದಾಮಿ ರೈಲು ನಿಲ್ದಾಣದ ಸಮೀಪ ಮತ್ತು ಮುಖ್ಯ ಬಜಾರ್ ರಸ್ತೆ',
    tips: [
      'Valid driving license and original government ID deposit required.',
      'Helmet is mandatory on state highways (NH 218 & SH 14).',
      'Fill tank at Badami town fuel station before heading to Aihole, as rural petrol pumps are sparse.',
    ],
    tipsKn: [
      'ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್ ಮತ್ತು ಮೂಲ ಗುರುತಿನ ಚೀಟಿ ಅಗತ್ಯ.',
      'ಹೆಲ್ಮೆಟ್ ಧರಿಸುವುದು ಕಡ್ಡಾಯ.',
      'ಐಹೊಳೆಗೆ ಹೊರಡುವ ಮುನ್ನ ಬಾದಾಮಿಯಲ್ಲೇ ಪೆಟ್ರೋಲ್ ಹಾಕಿಸಿಕೊಳ್ಳಿ.',
    ],
  },
];

/**
 * Intelligent helper to calculate custom departure city recommendations
 */
export function calculateCustomCityTransit(userCity: string, language: 'en' | 'kn') {
  const city = userCity.trim();
  const lower = city.toLowerCase();

  // Check if matches known departure hubs directly
  const exact = DEPARTURE_HUBS.find(
    (h) =>
      h.name.toLowerCase().includes(lower) ||
      h.nameKn.includes(city) ||
      h.id.toLowerCase() === lower
  );
  if (exact) return { matchedHub: exact, isCustom: false };

  // Calculate intelligent multi-modal connection logic for any Indian/Global city
  let nearestMajorHub = 'Hubballi / Bengaluru';
  let nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ / ಬೆಂಗಳೂರು';
  let transitStrategy = 'Connect via Hubballi Junction (UBL) or Bengaluru SBC.';
  let transitStrategyKn = 'ಹುಬ್ಬಳ್ಳಿ ಜಂಕ್ಷನ್ ಅಥವಾ ಬೆಂಗಳೂರು ಮೆಜೆಸ್ಟಿಕ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.';
  let approxKm = 500;
  let estimatedTime = '8-12 hours';
  let primaryRecommendedMode: 'train' | 'flight' | 'bus' | 'road' = 'train';

  if (lower.includes('mysore') || lower.includes('mysuru') || lower.includes('ಮೈಸೂರು')) {
    nearestMajorHub = 'Bengaluru or Hubballi';
    nearestMajorHubKn = 'ಬೆಂಗಳೂರು ಅಥವಾ ಹುಬ್ಬಳ್ಳಿ';
    approxKm = 590;
    estimatedTime = '10h 30m';
    transitStrategy = 'Take direct Gol Gumbaz Express (16535) which starts directly from Mysuru Jn (MYS) at 15:30 PM, passing through Bengaluru at 18:30 and reaching Badami directly at 05:40 AM without any train changes!';
    transitStrategyKn = 'ಮೈಸೂರು ಜಂಕ್ಷನ್‌ನಿಂದ (MYS) ಮಧ್ಯಾಹ್ನ ೩:೩೦ಕ್ಕೆ ಹೊರಡುವ ಗೋಳಗುಮ್ಮಟ ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಕುಳಿತರೆ, ಬೆಂಗಳೂರು ಮಾರ್ಗವಾಗಿ ಬೆಳಿಗ್ಗೆ ೫:೪೦ಕ್ಕೆ ನೇರವಾಗಿ ಬಾದಾಮಿಯಲ್ಲೇ ಇಳಿಯಬಹುದು!';
    primaryRecommendedMode = 'train';
  } else if (lower.includes('mangalore') || lower.includes('mangaluru') || lower.includes('udupi') || lower.includes('ಮಂಗಳೂರು') || lower.includes('ಉಡುಪಿ')) {
    nearestMajorHub = 'Hubballi';
    nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ';
    approxKm = 420;
    estimatedTime = '8h 00m';
    transitStrategy = 'Take direct KSRTC/NWKRTC overnight sleeper bus from Mangaluru/Udupi to Hubballi/Badami via Sirsi & Kumta, or take train via Madgaon/Hubballi.';
    transitStrategyKn = 'ಮಂಗಳೂರು/ಉಡುಪಿಯಿಂದ ಶಿರಸಿ ಮಾರ್ಗವಾಗಿ ನೇರ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಸ್ಲೀಪರ್ ಬಸ್ ಲಭ್ಯ, ಅಥವಾ ಹುಬ್ಬಳ್ಳಿ ಮಾರ್ಗದ ರೈಲು ಪಡೆಯಿರಿ.';
    primaryRecommendedMode = 'bus';
  } else if (lower.includes('kolkata') || lower.includes('calcutta') || lower.includes('ಕೊಲ್ಕತ್ತಾ') || lower.includes('west bengal')) {
    nearestMajorHub = 'Hubballi / Hyderabad';
    nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ / ಹೈದರಾಬಾದ್';
    approxKm = 1750;
    estimatedTime = '2h 45m (Flight) + 2h Cab';
    transitStrategy = 'Fly from Kolkata (CCU) to Hubballi Airport (HBX) via Bengaluru or Mumbai, then 2-hour taxi directly to Badami. Alternatively, take Howrah-Vasco Amaravati Express to Hubballi.';
    transitStrategyKn = 'ಕೋಲ್ಕತ್ತಾದಿಂದ ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣಕ್ಕೆ (HBX) ವಿಮಾನದಲ್ಲಿ ಬಂದು, ಅಲ್ಲಿಂದ ಟ್ಯಾಕ್ಸಿ ಮೂಲಕ ಬಾದಾಮಿಗೆ ತಲುಪಿ.';
    primaryRecommendedMode = 'flight';
  } else if (lower.includes('ahmedabad') || lower.includes('surat') || lower.includes('gujarat') || lower.includes('ಅಹಮದಾಬಾದ್')) {
    nearestMajorHub = 'Hubballi / Solapur';
    nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ / ಸೊಲ್ಲಾಪುರ';
    approxKm = 980;
    estimatedTime = '16h (Train) or 1h 30m Flight to BOM + HBX';
    transitStrategy = 'Take Ahmedabad - Yesvantpur Express or Gandhidham - Bengaluru Express via Hubballi / Gadag, or fly from Ahmedabad to Hubballi via Star Air / IndiGo.';
    transitStrategyKn = 'ಅಹಮದಾಬಾದ್-ಯಶವಂತಪುರ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಅಥವಾ ಹುಬ್ಬಳ್ಳಿ ಮಾರ್ಗದ ವಿಮಾನ ಸಂಪರ್ಕ ಬಳಸಿ.';
    primaryRecommendedMode = 'train';
  } else if (lower.includes('davangere') || lower.includes('ದಾವಣಗೆರೆ') || lower.includes('shimoga') || lower.includes('shivamogga') || lower.includes('ಶಿವಮೊಗ್ಗ')) {
    nearestMajorHub = 'Hubballi / Gadag';
    nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ / ಗದಗ';
    approxKm = 210;
    estimatedTime = '3h 30m';
    transitStrategy = 'Board Gol Gumbaz Express or Basava Express at Davangere Railway Station directly to Badami (3h 45m train ride), or drive via Harihar and Ron.';
    transitStrategyKn = 'ದಾವಣಗೆರೆ ರೈಲು ನಿಲ್ದಾಣದಿಂದ ಗೋಳಗುಮ್ಮಟ ಅಥವಾ ಬಸವ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಹತ್ತಿ ಕೇವಲ ೩.೫ ಗಂಟೆಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬಾದಾಮಿ ತಲುಪಿ.';
    primaryRecommendedMode = 'train';
  } else if (lower.includes('kolhapur') || lower.includes('ಕೊಲ್ಹಾಪುರ') || lower.includes('sangli') || lower.includes('ಸ್ಯಾಂಗ್ಲಿ')) {
    nearestMajorHub = 'Belagavi / Bagalkot';
    nearestMajorHubKn = 'ಬೆಳಗಾವಿ / ಬಾಗಲಕೋಟೆ';
    approxKm = 215;
    estimatedTime = '4h 00m';
    transitStrategy = 'Drive via Nipani -> Sankeshwar -> Lokapur -> Badami (approx 4 hours), or take direct NWKRTC / MSRTC buses connecting via Belagavi.';
    transitStrategyKn = 'ಕೊಲ್ಹಾಪುರದಿಂದ ನಿಪಾಣಿ, ಸಂಕೇಶ್ವರ, ಲೋಕಾಪುರ ಮಾರ್ಗವಾಗಿ ೪ ಗಂಟೆಗಳ ರಸ್ತೆ ಪ್ರಯಾಣ.';
    primaryRecommendedMode = 'road';
  } else if (lower.includes('kochi') || lower.includes('cochin') || lower.includes('trivandrum') || lower.includes('kerala') || lower.includes('ಕೊಚ್ಚಿ')) {
    nearestMajorHub = 'Hubballi / Bengaluru';
    nearestMajorHubKn = 'ಹುಬ್ಬಳ್ಳಿ / ಬೆಂಗಳೂರು';
    approxKm = 880;
    estimatedTime = '1h 20m Flight to BLR + Train';
    transitStrategy = 'Fly from Kochi (COK) to Hubballi (HBX) via Bengaluru, or take train to Bengaluru SBC and connect to overnight Gol Gumbaz Express.';
    transitStrategyKn = 'ಕೊಚ್ಚಿಯಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ವಿಮಾನ ಅಥವಾ ಬೆಂಗಳೂರು ಮೂಲಕ ರಾತ್ರಿ ರೈಲು ಸಂಪರ್ಕ.';
    primaryRecommendedMode = 'flight';
  } else if (lower.includes('chennai') || lower.includes('coimbatore') || lower.includes('ಕೊಯಮತ್ತೂರು')) {
    nearestMajorHub = 'Bengaluru';
    nearestMajorHubKn = 'ಬೆಂಗಳೂರು';
    approxKm = 700;
    estimatedTime = '12h';
    transitStrategy = 'Connect via Bengaluru Majestic (SBC) using overnight Gol Gumbaz Express or KSRTC Airavat AC Sleeper.';
    transitStrategyKn = 'ಬೆಂಗಳೂರು ಮೆಜೆಸ್ಟಿಕ್ ಮೂಲಕ ಗೋಳಗುಮ್ಮಟ ರೈಲು ಅಥವಾ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಎಸಿ ಸ್ಲೀಪರ್ ಪಡೆಯಿರಿ.';
    primaryRecommendedMode = 'train';
  } else {
    // Generic fallback for any Indian / international city
    approxKm = 650;
    estimatedTime = 'Flexible';
    transitStrategy = `Travel from ${city} to the nearest major transit hub: Hubballi Junction (UBL - 105 km) or Bengaluru (SBC - 450 km). From Hubballi, trains run every 2 hours and NWKRTC express buses depart every 30 minutes directly into Badami.`;
    transitStrategyKn = `${city} ಯಿಂದ ಹುಬ್ಬಳ್ಳಿ ಜಂಕ್ಷನ್ (UBL - ೧೦೫ ಕಿ.ಮೀ) ಅಥವಾ ಬೆಂಗಳೂರಿಗೆ ಬನ್ನಿ. ಹುಬ್ಬಳ್ಳಿಯಿಂದ ಪ್ರತಿ ೩೦ ನಿಮಿಷಕ್ಕೆ ಬಾದಾಮಿಗೆ ನೇರ ಬಸ್ ಮತ್ತು ರೈಲುಗಳು ಲಭ್ಯ.`;
  }

  // Synthesize custom hub representation
  const customHub: DepartureHub = {
    id: `custom_${city.toLowerCase().replace(/\s+/g, '_')}`,
    name: city,
    nameKn: city,
    state: 'Your Origin',
    distanceKm: approxKm,
    fastestTravelTime: estimatedTime,
    cheapestFareEstimate: '₹350 - ₹650',
    recommendedMode: primaryRecommendedMode,
    recommendationSummary: transitStrategy,
    recommendationSummaryKn: transitStrategyKn,
    trains: [
      {
        trainNumber: '16535 / SWR Connect',
        trainName: `Connecting Train to Badami via ${nearestMajorHub}`,
        trainNameKn: `${nearestMajorHubKn} ಮೂಲಕ ಬಾದಾಮಿಗೆ ಸಂಪರ್ಕ ರೈಲು`,
        originStation: `${city} Station`,
        destinationStation: 'Badami (BDM)',
        departureTime: 'Multiple connecting schedules',
        arrivalTime: 'Morning arrival recommended',
        duration: estimatedTime,
        frequency: 'Daily',
        frequencyKn: 'ಪ್ರತಿದಿನ',
        classes: ['2A', '3A', 'SL'],
        fareRange: '₹350 - ₹1,400',
        proTip: `Book connecting ticket directly to Badami (Station Code: BDM). Major junction: Hubballi (UBL).`,
        proTipKn: `ಬಾದಾಮಿ ರೈಲು ನಿಲ್ದಾಣದ ಕೋಡ್: BDM. ಮುಖ್ಯ ಜಂಕ್ಷನ್: ಹುಬ್ಬಳ್ಳಿ (UBL).`,
        bookingUrl: 'https://www.irctc.co.in',
      },
    ],
    buses: [
      {
        operator: 'KSRTC / NWKRTC Inter-State Services',
        busType: 'Express / Sleeper Connecting Service',
        busTypeKn: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ / ಸ್ಲೀಪರ್ ಸಂಪರ್ಕ ಬಸ್',
        boardingPoints: [`${city} Central Bus Station`],
        droppingPoints: ['Badami Central Bus Stand'],
        departureTimes: 'Morning & Evening departures',
        duration: estimatedTime,
        fareRange: '₹450 - ₹1,250',
        amenities: ['Pushback seats / Sleeper bunks'],
        bookingUrl: 'https://ksrtc.in',
        proTip: `Take a direct bus to Hubballi or Bagalkot, then board the frequent 30-minute shuttle to Badami.`,
        proTipKn: `ಹುಬ್ಬಳ್ಳಿ ಅಥವಾ ಬಾಗಲಕೋಟೆಗೆ ಬಸ್ ಪಡೆದು, ಅಲ್ಲಿಂದ ಬಾದಾಮಿ ಬಸ್ ಹತ್ತಿ.`,
      },
    ],
    road: {
      routeSummary: `${city} -> ${nearestMajorHub} -> Badami`,
      routeSummaryKn: `${city} -> ${nearestMajorHubKn} -> ಬಾದಾಮಿ`,
      highways: 'National Highway corridor to Hubballi / Bagalkot + SH 14 to Badami',
      totalDistanceKm: approxKm,
      estimatedDrivingTime: estimatedTime,
      tollEstimate: 'Varies by route',
      roadQuality: 'Good',
      scenicStops: ['North Karnataka Deccan plateau', 'Malaprabha river valley'],
      scenicStopsKn: ['ಉತ್ತರ ಕರ್ನಾಟಕ ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ', 'ಮಲಪ್ರಭಾ ನದಿ ಕಣಿವೆ'],
      recommendedPitStops: ['Highway food plazas near major toll gates'],
      cabFareEstimate: {
        hatchback: `₹${approxKm * 11}`,
        sedan: `₹${approxKm * 14}`,
        suv: `₹${approxKm * 18}`,
      },
      navigationUrl: `https://www.google.com/maps/dir/${encodeURIComponent(city)}/Badami,+Karnataka`,
    },
  };

  return { matchedHub: customHub, isCustom: true };
}
