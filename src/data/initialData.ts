import { Destination, Booking, AdminSettings } from '../types';

import heroImg from '../assets/images/hero_tamilnadu_escape_1791553380713.jpg';
import regalHeroImg from '../assets/images/hero_tamilnadu_regal_1791555508088.jpg';
import twilightLakeImg from '../assets/images/tamilnadu_lake_twilight_1791555519273.jpg';
import maduraiImg from '../assets/images/tamilnadu_madurai_temple_1791553391332.jpg';
import ootyImg from '../assets/images/tamilnadu_ooty_nilgiri_1791553402855.jpg';
import mahabalipuramImg from '../assets/images/tamilnadu_mahabalipuram_shore_1791553413689.jpg';
import kodaikanalImg from '../assets/images/tamilnadu_kodaikanal_mist_1791553445547.jpg';
import kanyakumariImg from '../assets/images/tamilnadu_kanyakumari_ocean_1791553458336.jpg';

export { heroImg, regalHeroImg, twilightLakeImg, maduraiImg, ootyImg, mahabalipuramImg, kodaikanalImg, kanyakumariImg };

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-madurai-heritage',
    title: 'Madurai, Meenakshi Realm',
    district: 'Madurai',
    region: 'Vaigai River Basin',
    category: 'heritage_temple',
    tagline: 'Ancient temple architecture & night food trail',
    description: 'Immerse yourself in one of the oldest living cities on earth. Marvel at the soaring 50-meter gopurams of Meenakshi Amman Temple, admire Thirumalai Nayakkar Palace stucco art, and taste legendary Madurai Jigarthanda and Chettinad Kari Dosa.',
    pricePerPerson: 4999,
    durationDays: 3,
    durationNights: 2,
    imageUrl: maduraiImg,
    galleryImages: [maduraiImg, mahabalipuramImg, heroImg],
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    isActive: true,
    highlights: [
      'Guided Meenakshi Amman Temple morning architecture walk',
      'Thirumalai Nayakkar Palace evening sound & light spectacle',
      'Authentic Madurai night street food & culinary expedition',
      'Traditional handloom weaver village visit in Vilakkuthoon'
    ],
    inclusions: [
      '2 Nights luxury heritage stay with breakfast',
      'AC private transport for all city transfers',
      'VIP Temple Darshan entry passes',
      'Certified historian guide & heritage permits'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Meenakshi Amman Gopurams',
        details: 'Check-in to heritage boutique hotel. Sunset tour of the Golden Lotus Tank and Thousand Pillar Hall with certified scholar.'
      },
      {
        day: 2,
        title: 'Royal Nayakkar Palace & Culinary Trail',
        details: 'Explore Thirumalai Nayakkar Mahal italian-dravidian columns. Evening walking food trail tasting Kari Dosa and authentic Jigarthanda.'
      },
      {
        day: 3,
        title: 'Banana Market & Artisan Weavers',
        details: 'Early morning visit to Madurai flower & banana wholesale bazaars. Handloom souvenir shopping followed by departure.'
      }
    ],
    bestSeason: 'October – March',
    availableDates: ['2026-10-15', '2026-10-22', '2026-11-05', '2026-11-12', '2026-12-01']
  },
  {
    id: 'dest-ooty-nilgiri',
    title: 'Ooty & Coonoor, Nilgiri Blue',
    district: 'The Nilgiris',
    region: 'Western Ghats Biosphere',
    category: 'hill_station',
    tagline: 'Tea estates, heritage toy train & cool mist',
    description: 'Breathe the crisp eucalyptus-scented mountain air in the Queen of Hill Stations. Ride the UNESCO World Heritage Nilgiri Mountain Railway toy train, wander through lush tea plantations, and gaze over Dolphin’s Nose cliffs.',
    pricePerPerson: 6499,
    durationDays: 4,
    durationNights: 3,
    imageUrl: ootyImg,
    galleryImages: [ootyImg, kodaikanalImg, heroImg],
    rating: 4.85,
    reviewCount: 218,
    featured: true,
    isActive: true,
    highlights: [
      'Nilgiri Mountain Railway vintage steam locomotive journey',
      'Private tea plucking and artisanal estate factory tasting',
      'Pykara Lake speedboat cruise & pine forest walk',
      'Sunrise view from Doddabetta peak (2,637m)'
    ],
    inclusions: [
      '3 Nights hillside colonial estate stay',
      'Toy train heritage class confirmed tickets',
      'Daily organic mountain breakfast & high tea',
      'Private 4x4 mountain vehicle with driver'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nilgiri Ascent & Colonial Heritage',
        details: 'Scenic climb through 36 hairpin bends. Check-in to tea bungalow and visit St. Stephen’s historic colonial church.'
      },
      {
        day: 2,
        title: 'Heritage Toy Train to Coonoor',
        details: 'Board the historic steam locomotive across 250 bridges and tunnels to Coonoor. Visit Sim’s Park and Lamb’s Rock.'
      },
      {
        day: 3,
        title: 'Pykara Waterfalls & Tea Estate Walk',
        details: 'Stroll through whispering pine groves to Pykara lake. Afternoon guided tasting of single-origin Nilgiri frost teas.'
      },
      {
        day: 4,
        title: 'Botanical Sanctuary & Departure',
        details: 'Morning stroll through the 55-acre Government Botanical Garden. Artisan chocolate tasting before descent.'
      }
    ],
    bestSeason: 'September – May',
    availableDates: ['2026-10-18', '2026-10-25', '2026-11-08', '2026-11-15', '2026-12-10']
  },
  {
    id: 'dest-mahabalipuram-shore',
    title: 'Mahabalipuram, Coastal Monoliths',
    district: 'Chengalpattu',
    region: 'Coromandel Coast',
    category: 'coastal_beach',
    tagline: 'UNESCO Shore Temple, surf & granite rock art',
    description: 'Where crashing Bay of Bengal waves meet 7th-century rock-cut Pallava sanctuaries. Discover the ancient Shore Temple, the colossal relief of Arjuna’s Penance, balance on Krishna’s Butterball, and enjoy fresh coastal seafood.',
    pricePerPerson: 3899,
    durationDays: 2,
    durationNights: 1,
    imageUrl: mahabalipuramImg,
    galleryImages: [mahabalipuramImg, kanyakumariImg, heroImg],
    rating: 4.92,
    reviewCount: 96,
    featured: true,
    isActive: true,
    highlights: [
      'Sunset photography at the 8th-century granite Shore Temple',
      'Arjuna’s Penance & Pancha Rathas monolithic chariot rock art',
      'Beginner surf lesson or stand-up paddleboarding in Bay of Bengal',
      'Coastal seafood dining with beachside bonfire'
    ],
    inclusions: [
      '1 Night beachfront luxury resort stay',
      'UNESCO archaeological site entry permits',
      'Surf gear rental with certified ISA instructor',
      'Coromandel seafood buffet dinner'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Pallava Monoliths & Shore Sunset',
        details: 'Check-in to beach resort. Guided walking tour through Pancha Rathas and Arjuna’s Penance. Golden hour photography at the ocean Shore Temple.'
      },
      {
        day: 2,
        title: 'Morning Surf & Stone Carvers Village',
        details: 'Sunrise wave session with surf coach. Visit hereditary granite stone carver workshops in town before checkout.'
      }
    ],
    bestSeason: 'October – April',
    availableDates: ['2026-10-16', '2026-10-23', '2026-10-30', '2026-11-06', '2026-11-13']
  },
  {
    id: 'dest-kodaikanal-mist',
    title: 'Kodaikanal, Princess of Hills',
    district: 'Dindigul',
    region: 'Palani Hills',
    category: 'hill_station',
    tagline: 'Mist, pine forests, star lake & quiet waterfalls',
    description: 'Perched at 2,133 meters atop the granite Palani Hills, Kodaikanal offers dreamlike mist, peaceful star-shaped lakes, dense pine valleys, and dramatic cliff walks like Coaker’s Walk and Pillar Rocks.',
    pricePerPerson: 5800,
    durationDays: 3,
    durationNights: 2,
    imageUrl: kodaikanalImg,
    galleryImages: [kodaikanalImg, ootyImg, heroImg],
    rating: 4.78,
    reviewCount: 164,
    featured: false,
    isActive: true,
    highlights: [
      'Pine Forest meditation walk & forest canopy photography',
      'Row boating on the iconic star-shaped Kodaikanal Lake',
      'Panoramic cliff edge views from Pillar Rocks & Dolphin’s Nose',
      'Visit Kurinji Andavar Temple and hillside plum orchards'
    ],
    inclusions: [
      '2 Nights eco-chalet resort in pine woods',
      'Private mountain transfers from Kodai Road',
      'Boating passes and viewpoint entry fees',
      'Campfire night with homemade hot chocolate'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in the Clouds & Star Lake',
        details: 'Ascend the Palani ghats. Afternoon pedal-boating on the central lake and stroll along Coaker’s Walk cliff path.'
      },
      {
        day: 2,
        title: 'Pillar Rocks, Pine Woods & Guna Caves',
        details: 'Morning trek through the silent pine forests. Behold the 122m vertical granite Pillar Rocks rising through cloud cover.'
      },
      {
        day: 3,
        title: 'Silver Cascade & Orchard Visit',
        details: 'Visit Silver Cascade waterfall on descent. Stop by organic fruit orchards for fresh homemade preserves.'
      }
    ],
    bestSeason: 'September – June',
    availableDates: ['2026-10-20', '2026-10-27', '2026-11-10', '2026-11-17', '2026-12-05']
  },
  {
    id: 'dest-kanyakumari-cape',
    title: 'Kanyakumari, Lands End Confluence',
    district: 'Kanyakumari',
    region: 'Southernmost Tip of India',
    category: 'coastal_beach',
    tagline: 'Tricolor oceans, golden sunrise & rock memorial',
    description: 'Stand at the tip of the subcontinent where the Arabian Sea, Indian Ocean, and Bay of Bengal converge. Experience simultaneous sunsets and moonrises, ferry across to the Vivekananda Rock Memorial, and marvel at the 133-foot Thiruvalluvar Statue.',
    pricePerPerson: 5200,
    durationDays: 3,
    durationNights: 2,
    imageUrl: kanyakumariImg,
    galleryImages: [kanyakumariImg, mahabalipuramImg, maduraiImg],
    rating: 4.88,
    reviewCount: 112,
    featured: true,
    isActive: true,
    highlights: [
      'Sunrise over the triveni sangam of three oceans',
      'Ferry cruise to Vivekananda Rock Memorial & Thiruvalluvar Statue',
      'Padmanabhapuram Palace 16th-century wooden architecture',
      'Sunset at Gandhi Memorial & multihued sand beach'
    ],
    inclusions: [
      '2 Nights ocean-facing luxury hotel',
      'Express ferry passes for island monuments',
      'Sightseeing private sedan with local driver',
      'Traditional South Tamil breakfast buffet'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Lands End & Ocean Sunset',
        details: 'Check-in to oceanview hotel. Evening witness of sun dipping into the Arabian Sea while moon emerges over Bay of Bengal.'
      },
      {
        day: 2,
        title: 'Triveni Confluence & Vivekananda Rock',
        details: 'Morning ferry across turquoise waters to Vivekananda Rock Memorial. Afternoon tour of Padmanabhapuram wooden royal palace.'
      },
      {
        day: 3,
        title: 'Sunrise Viewpoint & Coastal Fort',
        details: 'Early sunrise view at Triveni Sangam. Visit 18th-century Vattakottai circular granite sea fort before departure.'
      }
    ],
    bestSeason: 'October – March',
    availableDates: ['2026-10-19', '2026-10-26', '2026-11-09', '2026-11-23', '2026-12-07']
  },
  {
    id: 'dest-thanjavur-chola',
    title: 'Thanjavur & Chettinad, Chola Splendour',
    district: 'Thanjavur & Sivaganga',
    region: 'Cauvery Delta & Chettinad',
    category: 'cultural_culinary',
    tagline: '1000-year Brihadisvara Temple & heritage palatial mansions',
    description: 'Journey through the golden age of the Chola dynasty and opulent Chettiar merchant aristocracy. Stand awestruck before the monolithic 80-tonne granite dome of the Big Temple, and dine in majestic teakwood mansions on handmade Athangudi tiles.',
    pricePerPerson: 6999,
    durationDays: 3,
    durationNights: 2,
    imageUrl: maduraiImg,
    galleryImages: [maduraiImg, mahabalipuramImg, heroImg],
    rating: 4.95,
    reviewCount: 88,
    featured: false,
    isActive: true,
    highlights: [
      'UNESCO Brihadisvara Great Living Chola Temple architectural masterclass',
      'Stay in authentic 100-room Chettinad heritage palatial mansion',
      'Artisanal Athangudi tile-making and handloom saree workshops',
      '18-course traditional banana leaf Chettinad royal feast'
    ],
    inclusions: [
      '2 Nights stay in restored Chettiar heritage mansion',
      'All meals including master chef Chettinad culinary masterclass',
      'Temple architecture historian escort',
      'Private chauffeur-driven air-conditioned vehicle'
    ],
    itinerary: [
      {
        day: 1,
        title: 'The Great Chola Monument',
        details: 'Arrival in Thanjavur. Comprehensive architectural breakdown of the 1,000-year-old Brihadisvara Temple and Maratha Palace.'
      },
      {
        day: 2,
        title: 'Chettinad Mansions & Athangudi Artisans',
        details: 'Drive to Kanadukathan village. Explore sprawling mansions built with Burmese teak and Belgian mirrors. Handmade tile workshop.'
      },
      {
        day: 3,
        title: 'Antique Markets & Culinary Finale',
        details: 'Browse Karaikudi brass and wood carving bazaars. Farewell multi-course traditional lunch on fresh banana leaf.'
      }
    ],
    bestSeason: 'November – March',
    availableDates: ['2026-10-21', '2026-10-28', '2026-11-11', '2026-11-25', '2026-12-15']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'TN-ROAM-849201',
    destinationId: 'dest-ooty-nilgiri',
    destinationTitle: 'Ooty & Coonoor, Nilgiri Blue',
    destinationDistrict: 'The Nilgiris',
    destinationImage: ootyImg,
    travelerName: 'Karthik Subramanian',
    travelerEmail: 'karthik.sub@gmail.com',
    travelerPhone: '+91 98401 23456',
    startDate: '2026-10-25',
    endDate: '2026-10-29',
    adultsCount: 2,
    childrenCount: 0,
    basePrice: 12998,
    addons: [
      { name: 'Heritage Toy Train 1st Class Pass', price: 1200 },
      { name: 'Private Mountain 4x4 Jeep', price: 1500 }
    ],
    taxesAndGst: 785,
    discount: 500,
    totalAmount: 15983,
    paymentMethod: 'upi',
    paymentTransactionId: 'UPI-HDFC-992018481',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    bookedAt: '2026-10-08T14:32:00Z',
    notes: 'Window seats requested on Toy Train journey.'
  },
  {
    id: 'TN-ROAM-712490',
    destinationId: 'dest-madurai-heritage',
    destinationTitle: 'Madurai, Meenakshi Realm',
    destinationDistrict: 'Madurai',
    destinationImage: maduraiImg,
    travelerName: 'Ananya Meenakshi',
    travelerEmail: 'ananya.m@outlook.com',
    travelerPhone: '+91 94440 98712',
    startDate: '2026-11-05',
    endDate: '2026-11-08',
    adultsCount: 2,
    childrenCount: 1,
    basePrice: 14997,
    addons: [
      { name: 'VIP Temple Darshan Protocol', price: 1000 },
      { name: 'Night Street Food Trail Host', price: 800 }
    ],
    taxesAndGst: 839,
    discount: 0,
    totalAmount: 16836,
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-CARD-492194812',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    bookedAt: '2026-10-07T09:15:00Z',
    notes: 'Vegetarian culinary preferences.'
  },
  {
    id: 'TN-ROAM-630114',
    destinationId: 'dest-mahabalipuram-shore',
    destinationTitle: 'Mahabalipuram, Coastal Monoliths',
    destinationDistrict: 'Chengalpattu',
    destinationImage: mahabalipuramImg,
    travelerName: 'Vijay Raghavan',
    travelerEmail: 'vijay.raghavan@techcorp.in',
    travelerPhone: '+91 97890 54321',
    startDate: '2026-10-16',
    endDate: '2026-10-18',
    adultsCount: 1,
    childrenCount: 0,
    basePrice: 3899,
    addons: [
      { name: 'Morning Surf Lesson Gear', price: 900 }
    ],
    taxesAndGst: 240,
    discount: 0,
    totalAmount: 5039,
    paymentMethod: 'netbanking',
    paymentTransactionId: 'NETB-SBI-819203112',
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    bookedAt: '2026-10-02T16:45:00Z'
  }
];

export const INITIAL_SETTINGS: AdminSettings = {
  platformName: 'Roamly Tamil Nadu',
  currencySymbol: '₹',
  currencyCode: 'INR',
  gstRatePercent: 5,
  convenienceFeeINR: 150,
  autoConfirmBookings: true,
  helplinePhone: '+91 44 2538 4444 (Tamil Nadu Tourism 24x7)',
  supportEmail: 'discover@roamly-tamilnadu.in',
  announcementBanner: 'Deepavali Festive Special: Get 10% complimentary credits on all Nilgiri & Chola heritage tours.',
  enableAnnouncement: true
};

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Dr. S. Narayanan',
    location: 'Chennai',
    rating: 5,
    date: '3 days ago',
    comment: 'The toy train journey through Nilgiris was utterly magical! The estate stay and tea tasting were top-notch. Roamly seamless booking and clear INR pricing made this effortless.'
  },
  {
    id: 'rev-2',
    author: 'Pooja Iyer',
    location: 'Bengaluru',
    rating: 5,
    date: '1 week ago',
    comment: 'Madurai night food walk and early morning Meenakshi temple darshan were unforgettable. The local historian was extraordinarily knowledgeable.'
  },
  {
    id: 'rev-3',
    author: 'Michael & Sarah',
    location: 'London, UK',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Mahabalipuram shore temple at sunset was a dream. The digital boarding ticket with QR code was accepted immediately at our resort.'
  }
];
