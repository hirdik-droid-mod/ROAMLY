export type CategoryType = 'all' | 'hill_station' | 'heritage_temple' | 'coastal_beach' | 'wildlife_nature' | 'cultural_culinary';

export interface PlaceToVisit {
  id: string;
  name: string;
  city: string;
  category: 'temple' | 'nature' | 'monument' | 'culinary' | 'viewpoint';
  lat: number;
  lng: number;
  description: string;
  timings: string;
  entryFeeINR: number;
  bestTimeToVisit: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  location?: string;
}

export interface Destination {
  id: string;
  title: string;
  district: string;
  region: string;
  category: CategoryType;
  tagline: string;
  description: string;
  pricePerPerson: number; // in INR ₹
  durationDays: number;
  durationNights: number;
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  isActive: boolean;
  highlights: string[];
  inclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  bestSeason: string;
  availableDates: string[];
}

export interface Booking {
  id: string;
  destinationId: string;
  destinationTitle: string;
  destinationDistrict: string;
  destinationImage: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  startDate: string;
  endDate: string;
  adultsCount: number;
  childrenCount: number;
  basePrice: number;
  addons: {
    name: string;
    price: number;
  }[];
  taxesAndGst: number;
  discount: number;
  totalAmount: number; // in INR ₹
  paymentMethod: 'upi' | 'card' | 'netbanking';
  paymentTransactionId: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  bookingStatus: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
  notes?: string;
}

export interface AdminSettings {
  platformName: string;
  currencySymbol: string;
  currencyCode: string;
  gstRatePercent: number;
  convenienceFeeINR: number;
  autoConfirmBookings: boolean;
  helplinePhone: string;
  supportEmail: string;
  announcementBanner: string;
  enableAnnouncement: boolean;
}

export interface SearchFilterState {
  searchQuery: string;
  district: string;
  category: CategoryType;
  maxPrice: number;
  duration: 'all' | '1-2' | '3-4' | '5+';
  minRating: number;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'duration';
  dateRange: {
    checkIn: string;
    checkOut: string;
  };
  guests: number;
}

export type TravelStyle = 'heritage_spiritual' | 'slow_nature' | 'culinary_culture' | 'coastal_adventure' | 'royal_luxury';
export type TravelPace = 'relaxed' | 'balanced' | 'fast_paced';
export type TravelCompanions = 'solo' | 'couple' | 'family' | 'friends';

export interface TravelPersonalisation {
  style: TravelStyle;
  pace: TravelPace;
  companions: TravelCompanions;
  durationDays: number;
  interests: string[];
}

export interface CulinaryItem {
  id: string;
  name: string;
  tamilName: string;
  region: string;
  type: 'vegetarian' | 'non_veg' | 'dessert' | 'beverage';
  description: string;
  signatureIngredients: string[];
  mustTrySpot: string;
}

export interface CircuitRoute {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  totalDistanceKm: number;
  drivingTimeHours: number;
  cities: string[];
  stops: {
    name: string;
    durationMinutes: number;
    highlight: string;
  }[];
  idealSeason: string;
}

export interface WeatherAdvisory {
  city: string;
  district: string;
  temperatureC: number;
  condition: string;
  iconType: 'sunny' | 'mist' | 'rain' | 'breeze';
  bestMonths: string;
  clothingTips: string[];
}
