export type Language = 'en' | 'kn';

export interface Monument {
  id: string;
  name: string;
  nameKn: string;
  cluster: 'Badami' | 'Pattadakal' | 'Aihole' | 'Mahakuta' | 'Banashankari' | 'Kudalasangama';
  clusterKn: string;
  tagline: string;
  taglineKn: string;
  century: string;
  dynasty: string;
  dynastyKn: string;
  architecturalStyle: string;
  architecturalStyleKn: string;
  image: string;
  gallery: string[];
  operationalTimings: string;
  operationalTimingsKn: string;
  entryFee: {
    indian: number;
    foreigner: number;
    camera?: number;
  };
  distanceFromBadamiKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  audioDurationSeconds: number;
  audioSnippetEn: string;
  audioSnippetKn: string;
  audioFileEn?: string;
  audioFileKn?: string;
  descriptionEn: string;
  descriptionKn: string;
  keyFeaturesEn: string[];
  keyFeaturesKn: string[];
  visitorTipsEn: string[];
  visitorTipsKn: string[];
  isUnesco?: boolean;
}

export interface ArtisanCooperative {
  id: string;
  name: string;
  nameKn: string;
  location: string;
  locationKn: string;
  established: string;
  artisanCount: number;
  specialty: string;
  specialtyKn: string;
  descriptionEn: string;
  descriptionKn: string;
  image: string;
  priceRange: string;
  phone: string;
  address: string;
  giTagCertified: boolean;
  masterWeaver: {
    name: string;
    nameKn: string;
    experienceYears: number;
    quoteEn: string;
    quoteKn: string;
  };
}

export interface LocalDish {
  id: string;
  name: string;
  nameKn: string;
  type: 'Meal' | 'Snack' | 'Sweet' | 'Condiment';
  descriptionEn: string;
  descriptionKn: string;
  image: string;
  bestPlaceToTryEn: string;
  bestPlaceToTryKn: string;
  dietary: 'Vegetarian' | 'Vegan' | 'Gluten-Free';
}

export interface Homestay {
  id: string;
  name: string;
  nameKn: string;
  location: string;
  locationKn: string;
  pricePerNight: string;
  rating: number;
  hostName: string;
  descriptionEn: string;
  descriptionKn: string;
  image: string;
  highlightsEn: string[];
  highlightsKn: string[];
  contact: string;
}

export interface AudioGuideState {
  isPlaying: boolean;
  activeMonument: Monument | null;
  currentTime: number;
  duration: number;
  playbackRate: number;
  language: Language;
}

export interface MonumentScanResult {
  monumentName: string;
  monumentNameKn: string;
  location: string;
  century: string;
  dynasty: string;
  architecturalStyle: string;
  confidence: number;
  keyHighlights: string[];
  historicalSignificance: string;
  historicalSignificanceKn: string;
  visitorTip: string;
  audioSnippetEn: string;
  audioSnippetKn: string;
  sourceImage?: string;
}

export interface ItineraryActivity {
  id?: string;
  time: string;
  title: string;
  titleKn: string;
  location: string;
  description: string;
  descriptionKn: string;
  insiderTip: string;
  photoSpotTip?: string;
  crowdLevel?: 'Low & Serene' | 'Moderate' | 'Golden Hour Peak';
  difficulty?: 'Easy Stroll' | 'Moderate Steps' | 'Uphill Scramble';
  durationMins?: number;
  monumentId?: string;
  alternativeOptions?: {
    id: string;
    title: string;
    titleKn: string;
    description: string;
    descriptionKn: string;
    location: string;
    insiderTip?: string;
    monumentId?: string;
  }[];
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  themeKn: string;
  activities: ItineraryActivity[];
  recommendedMeal: {
    place: string;
    dish: string;
    dishKn: string;
  };
}

export interface ItineraryPlan {
  title: string;
  titleKn: string;
  summary: string;
  summaryKn: string;
  totalDistanceKm: number;
  recommendedTransport: string;
  days: ItineraryDay[];
  proTips: string[];
  archetypeId?: string;
}
