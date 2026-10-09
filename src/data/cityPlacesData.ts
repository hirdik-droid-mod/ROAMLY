import { PlaceToVisit } from '../types';

export interface CityInfo {
  id: string;
  name: string;
  district: string;
  center: { lat: number; lng: number };
  zoom: number;
  tagline: string;
  description: string;
  places: PlaceToVisit[];
}

export const TAMIL_NADU_CITIES: CityInfo[] = [
  {
    id: 'madurai',
    name: 'Madurai',
    district: 'Madurai',
    center: { lat: 9.9195, lng: 78.1193 },
    zoom: 13,
    tagline: 'The Athens of the East & Temple Heartland',
    description: 'A 2,500-year-old living ancient city situated on the banks of the Vaigai river, dominated by the majestic Meenakshi Sundareswarar temple complex and bustling spice bazaars.',
    places: [
      {
        id: 'place-meenakshi',
        name: 'Meenakshi Amman Temple',
        city: 'Madurai',
        category: 'temple',
        lat: 9.9195,
        lng: 78.1193,
        description: 'Iconic 14-gopuram Dravidian temple with over 33,000 carved sculptures and the legendary Hall of a Thousand Pillars.',
        timings: '5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM',
        entryFeeINR: 50,
        bestTimeToVisit: 'Early morning during sunrise darshan or evening aarti',
        tags: ['UNESCO Tentative', 'Dravidian Architecture', 'Ancient Heritage']
      },
      {
        id: 'place-nayakkar-palace',
        name: 'Thirumalai Nayakkar Mahal',
        city: 'Madurai',
        category: 'monument',
        lat: 9.9149,
        lng: 78.1238,
        description: '17th-century Italian-Rajput-Dravidian royal palace famed for its massive 82-foot columns and nightly light-and-sound shows.',
        timings: '9:00 AM – 5:00 PM (Light & Sound: 6:45 PM)',
        entryFeeINR: 20,
        bestTimeToVisit: 'Late afternoon before the evening light show',
        tags: ['Royal Palace', 'Stucco Art', 'Colonnades']
      },
      {
        id: 'place-alagar-kovil',
        name: 'Alagar Kovil (Kallazhagar Temple)',
        city: 'Madurai',
        category: 'temple',
        lat: 10.0768,
        lng: 78.2144,
        description: 'Foot-hill forest temple dedicated to Lord Vishnu amidst lush greenery, with natural sacred springs and peacocks.',
        timings: '6:00 AM – 12:30 PM, 3:30 PM – 8:00 PM',
        entryFeeINR: 0,
        bestTimeToVisit: 'Morning hours',
        tags: ['Forest Sanctuary', 'Sacred Spring', 'Peaceful']
      },
      {
        id: 'place-gandhi-museum',
        name: 'Gandhi Memorial Museum',
        city: 'Madurai',
        category: 'monument',
        lat: 9.9304,
        lng: 78.1402,
        description: 'Housed in the historic Tamukkam Palace, it preserves the blood-stained garment worn by Mahatma Gandhi and India freedom artifacts.',
        timings: '10:00 AM – 1:00 PM, 2:00 PM – 5:45 PM',
        entryFeeINR: 10,
        bestTimeToVisit: 'Midday',
        tags: ['History', 'Palace Grounds', 'Freedom Movement']
      },
      {
        id: 'place-madurai-food',
        name: 'Vilakkuthoon & Famous Jigarthanda Trail',
        city: 'Madurai',
        category: 'culinary',
        lat: 9.9168,
        lng: 78.1251,
        description: 'Vibrant historic street food bazaar near the 1840 Lamp Post serving legendary royal cold beverage Jigarthanda and spicy Kari Dosa.',
        timings: '6:00 PM – 11:30 PM',
        entryFeeINR: 0,
        bestTimeToVisit: 'Post 7:00 PM dinner walk',
        tags: ['Street Food', 'Authentic Taste', 'Night Life']
      }
    ]
  },
  {
    id: 'ooty',
    name: 'The Nilgiris (Ooty & Coonoor)',
    district: 'The Nilgiris',
    center: { lat: 11.4064, lng: 76.7029 },
    zoom: 12,
    tagline: 'Queen of Hill Stations & Western Ghats Biosphere',
    description: 'Emerald green rolling tea gardens, eucalyptus plantations, and the UNESCO World Heritage mountain steam railway high above the clouds.',
    places: [
      {
        id: 'place-toy-train',
        name: 'Nilgiri Mountain Railway (Toy Train)',
        city: 'The Nilgiris (Ooty & Coonoor)',
        category: 'monument',
        lat: 11.4064,
        lng: 76.7029,
        description: 'UNESCO World Heritage rack-and-pinion vintage steam train traversing 250 viaducts and 16 tunnels through Nilgiri valleys.',
        timings: 'Runs daily between Mettupalayam, Coonoor, and Ooty',
        entryFeeINR: 205,
        bestTimeToVisit: 'Morning departures for cloud-free gorge views',
        tags: ['UNESCO World Heritage', 'Steam Train', 'Scenic Mountain']
      },
      {
        id: 'place-doddabetta',
        name: 'Doddabetta Peak',
        city: 'The Nilgiris (Ooty & Coonoor)',
        category: 'viewpoint',
        lat: 11.4007,
        lng: 76.7364,
        description: 'Highest mountain in the Nilgiri hills (2,637 m / 8,650 ft) with an observatory telescope house overlooking the Western Ghats.',
        timings: '9:00 AM – 6:00 PM',
        entryFeeINR: 30,
        bestTimeToVisit: 'Early morning to catch valleys bathed in morning mist',
        tags: ['Highest Peak', 'Telescope House', 'Panoramic Horizon']
      },
      {
        id: 'place-pykara',
        name: 'Pykara Lake & Waterfalls',
        city: 'The Nilgiris (Ooty & Coonoor)',
        category: 'nature',
        lat: 11.4589,
        lng: 76.6022,
        description: 'Sacred river of the indigenous Toda tribe featuring tiered waterfalls and pristine motorboat rides nestled inside pine forests.',
        timings: '8:30 AM – 5:30 PM',
        entryFeeINR: 50,
        bestTimeToVisit: 'Midday for lake boating',
        tags: ['Speed Boating', 'Pine Woods', 'Waterfalls']
      },
      {
        id: 'place-botanical-garden',
        name: 'Government Botanical Garden',
        city: 'The Nilgiris (Ooty & Coonoor)',
        category: 'nature',
        lat: 11.4178,
        lng: 76.7118,
        description: 'Founded in 1848, this 55-acre terraced sanctuary features 1,000+ exotic floral species and a 20-million-year-old fossilized tree trunk.',
        timings: '7:00 AM – 6:30 PM',
        entryFeeINR: 40,
        bestTimeToVisit: 'Morning or late afternoon',
        tags: ['Exotic Flora', 'Historic Conservatory', 'Picnic Lawns']
      },
      {
        id: 'place-sims-park',
        name: "Sim's Park & Tea Plantations (Coonoor)",
        city: 'The Nilgiris (Ooty & Coonoor)',
        category: 'nature',
        lat: 11.3533,
        lng: 76.7958,
        description: 'Japanese-style landscape garden surrounded by century-old silver oaks and private artisan high-grown tea tasting rooms.',
        timings: '9:00 AM – 6:00 PM',
        entryFeeINR: 30,
        bestTimeToVisit: 'Afternoon tea tasting session',
        tags: ['Tea Tasting', 'Japanese Garden', 'Cool Breeze']
      }
    ]
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    district: 'Chengalpattu',
    center: { lat: 12.6166, lng: 80.1989 },
    zoom: 14,
    tagline: '7th-Century Pallava Rock Sanctuary by the Ocean',
    description: 'An open-air museum of granite monolithic rock-cut shrines, the famous ocean Shore Temple, and lively beginner surf breaks on the Coromandel Coast.',
    places: [
      {
        id: 'place-shore-temple',
        name: 'The Shore Temple',
        city: 'Mahabalipuram',
        category: 'temple',
        lat: 12.6166,
        lng: 80.1989,
        description: '7th-century Dravidian structural temple built from carved granite blocks directly touching the crashing waves of the Bay of Bengal.',
        timings: '6:00 AM – 6:00 PM',
        entryFeeINR: 40,
        bestTimeToVisit: 'Sunrise or golden hour sunset',
        tags: ['UNESCO World Heritage', 'Ocean Front', 'Granite Art']
      },
      {
        id: 'place-pancha-rathas',
        name: 'Pancha Rathas (Five Monolithic Chariots)',
        city: 'Mahabalipuram',
        category: 'monument',
        lat: 12.6098,
        lng: 80.1932,
        description: 'Five free-standing monumental monolithic temples carved out of a single continuous whale-backed granite outcrop.',
        timings: '6:00 AM – 6:00 PM',
        entryFeeINR: 40,
        bestTimeToVisit: 'Morning',
        tags: ['Monolithic Carving', 'Pallava Dynasty', 'UNESCO Site']
      },
      {
        id: 'place-krishna-butterball',
        name: "Krishna's Butterball",
        city: 'Mahabalipuram',
        category: 'nature',
        lat: 12.6179,
        lng: 80.1929,
        description: 'A 250-tonne, 6-meter-high granite boulder precariously perched on a steep 45-degree slope, defying gravity for over 1,200 years.',
        timings: 'Open all day in the archaeological park',
        entryFeeINR: 0,
        bestTimeToVisit: 'Late afternoon',
        tags: ['Geological Wonder', 'Fun Photos', 'Sculpture Park']
      },
      {
        id: 'place-arjuna-penance',
        name: "Arjuna's Penance / Descent of the Ganges",
        city: 'Mahabalipuram',
        category: 'monument',
        lat: 12.6186,
        lng: 80.1935,
        description: 'One of the largest open-air stone bas-reliefs in the world (27m x 9m), depicting celestial beings, elephants, and rivers.',
        timings: 'Open daylight hours',
        entryFeeINR: 0,
        bestTimeToVisit: 'Morning light highlights the carvings',
        tags: ['Massive Relief', 'Mythological Art', 'Sculpture']
      }
    ]
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    district: 'Dindigul',
    center: { lat: 10.2381, lng: 77.4892 },
    zoom: 13,
    tagline: 'Princess of Hill Stations & Dense Pine Forests',
    description: 'Set at 2,133 meters atop the granite Palani Hills, blessed with a star-shaped lake, mysterious pine groves, and cliff-edge trails in the mist.',
    places: [
      {
        id: 'place-kodai-lake',
        name: 'Kodaikanal Star Lake',
        city: 'Kodaikanal',
        category: 'nature',
        lat: 10.2381,
        lng: 77.4892,
        description: 'Man-made star-shaped 60-acre lake built in 1863, offering peaceful pedal-boating, cycling, and horse riding around its perimeter.',
        timings: '6:00 AM – 6:30 PM',
        entryFeeINR: 80,
        bestTimeToVisit: 'Morning for misty reflections or 4:00 PM sunset',
        tags: ['Boating', 'Cycling Promenade', 'Star Shaped']
      },
      {
        id: 'place-pillar-rocks',
        name: 'Pillar Rocks',
        city: 'Kodaikanal',
        category: 'viewpoint',
        lat: 10.2173,
        lng: 77.4674,
        description: 'Three vertically standing giant granite boulders rising 122 meters (400 ft) into the sky, often shrouded in dramatic swirling mist.',
        timings: '9:00 AM – 5:00 PM',
        entryFeeINR: 20,
        bestTimeToVisit: 'Morning when fog parts for cliff views',
        tags: ['Granite Pillars', 'Cloud Canopy', 'Valley Depth']
      },
      {
        id: 'place-coakers-walk',
        name: "Coaker's Walk",
        city: 'Kodaikanal',
        category: 'viewpoint',
        lat: 10.2325,
        lng: 77.4947,
        description: '1-kilometer pedestrian paved cliff path offering breathtaking bird-eye views of the plains, Dolphin’s Nose, and cloud forests.',
        timings: '7:00 AM – 7:00 PM',
        entryFeeINR: 30,
        bestTimeToVisit: 'Early morning to catch the Brocken Spectre phenomenon',
        tags: ['Cliff Walk', 'Panoramic Plains', 'Telescope House']
      },
      {
        id: 'place-pine-forest',
        name: 'Silent Pine Forest',
        city: 'Kodaikanal',
        category: 'nature',
        lat: 10.2223,
        lng: 77.4721,
        description: 'Hundred-year-old pine plantation with towering slender trunks planted by Mr. Bryant in 1906, creating a fairytale forest trail.',
        timings: '9:00 AM – 5:30 PM',
        entryFeeINR: 10,
        bestTimeToVisit: 'Late morning sun rays filter through trunks',
        tags: ['Forest Bathing', 'Pine Scent', 'Cinema Shooting']
      }
    ]
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur & Chettinad',
    district: 'Thanjavur & Sivaganga',
    center: { lat: 10.7828, lng: 79.1318 },
    zoom: 12,
    tagline: 'Chola Dynasty Golden Age & Palatial Mansions',
    description: 'The granary of Tamil Nadu with the 1,000-year-old Brihadisvara Temple, classical Carnatic music traditions, and opulent 100-room Chettiar palaces.',
    places: [
      {
        id: 'place-brihadisvara',
        name: 'Brihadisvara Temple (The Big Temple)',
        city: 'Thanjavur & Chettinad',
        category: 'temple',
        lat: 10.7828,
        lng: 79.1318,
        description: 'Built in 1010 CE by Emperor Raja Raja Chola I; its soaring 66m vimana is crowned by an 80-tonne single granite capstone.',
        timings: '6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM',
        entryFeeINR: 0,
        bestTimeToVisit: 'Sunset when golden sandstone glows in twilight',
        tags: ['UNESCO World Heritage', 'Chola Marvel', 'Shadow Mystery']
      },
      {
        id: 'place-maratha-palace',
        name: 'Thanjavur Maratha Palace & Art Gallery',
        city: 'Thanjavur & Chettinad',
        category: 'monument',
        lat: 10.7922,
        lng: 79.1367,
        description: 'Sprawling palace complex with Seven-Story Bell Tower and a world-renowned bronze gallery housing rare Chola Nataraja sculptures.',
        timings: '9:00 AM – 1:00 PM, 2:00 PM – 6:00 PM',
        entryFeeINR: 50,
        bestTimeToVisit: 'Morning',
        tags: ['Chola Bronzes', 'Maratha Durbar', 'Royal Gallery']
      },
      {
        id: 'place-kanadukathan',
        name: 'Kanadukathan Chettinad Heritage Mansions',
        city: 'Thanjavur & Chettinad',
        category: 'monument',
        lat: 10.1742,
        lng: 78.7845,
        description: 'Palatial merchant homes with Burma teakwood pillars, Italian marble, and Belgian chandeliers crafted in the late 19th century.',
        timings: '10:00 AM – 5:00 PM',
        entryFeeINR: 100,
        bestTimeToVisit: 'Afternoon heritage walk',
        tags: ['Chettiar Mansions', 'Burma Teak', 'Heritage Architecture']
      },
      {
        id: 'place-athangudi-tiles',
        name: 'Athangudi Handmade Tile Workshops',
        city: 'Thanjavur & Chettinad',
        category: 'culinary',
        lat: 10.1583,
        lng: 78.8471,
        description: 'Watch artisan masters pour vibrant colored cement by hand onto glass plates to create iconic geometric patterns.',
        timings: '9:00 AM – 5:00 PM',
        entryFeeINR: 0,
        bestTimeToVisit: 'Morning work sessions',
        tags: ['Handmade Crafts', 'Artisan Village', 'Cultural Heritage']
      }
    ]
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    district: 'Kanyakumari',
    center: { lat: 8.0781, lng: 77.5552 },
    zoom: 14,
    tagline: 'Lands End Triveni Sangam of Three Oceans',
    description: 'The southernmost tip of mainland India where the Arabian Sea, Gulf of Mannar, and Indian Ocean merge, crowned by offshore stone monuments.',
    places: [
      {
        id: 'place-vivekananda-rock',
        name: 'Vivekananda Rock Memorial',
        city: 'Kanyakumari',
        category: 'monument',
        lat: 8.0781,
        lng: 77.5552,
        description: 'Built on two rocky islands 500 meters offshore where Swami Vivekananda meditated in 1892. Reached by scenic sea ferry.',
        timings: '8:00 AM – 4:00 PM',
        entryFeeINR: 50,
        bestTimeToVisit: 'Morning ferry cruise to avoid coastal heat',
        tags: ['Ocean Memorial', 'Ferry Ride', 'Spiritual Landmark']
      },
      {
        id: 'place-thiruvalluvar-statue',
        name: 'Thiruvalluvar Statue (133-Foot)',
        city: 'Kanyakumari',
        category: 'monument',
        lat: 8.0778,
        lng: 77.5540,
        description: 'Monumental 40.5-meter granite stone statue of the ancient Tamil philosopher and poet, author of the Tirukkural.',
        timings: '8:00 AM – 4:00 PM (Viewable from shore 24/7)',
        entryFeeINR: 0,
        bestTimeToVisit: 'Sunrise horizon',
        tags: ['Tamil Icon', 'Colossal Sculpture', 'Ocean Sentinel']
      },
      {
        id: 'place-triveni-sangam',
        name: 'Triveni Sangam & Sunset Point',
        city: 'Kanyakumari',
        category: 'nature',
        lat: 8.0805,
        lng: 77.5512,
        description: 'Confluence point of three seas with multihued sand beaches. Watch the sun dip into the sea while the full moon rises.',
        timings: 'Open 24/7 (Sunset: ~6:15 PM)',
        entryFeeINR: 0,
        bestTimeToVisit: 'Sunset or Full Moon evenings',
        tags: ['Tricolor Seas', 'Simultaneous Sunrise & Moonrise']
      },
      {
        id: 'place-padmanabhapuram',
        name: 'Padmanabhapuram Wooden Palace',
        city: 'Kanyakumari',
        category: 'monument',
        lat: 8.2508,
        lng: 77.3275,
        description: 'Magnificent 16th-century wooden palace of the Travancore Maharajas with carved rosewood ceilings and Belgian mirrors.',
        timings: '9:00 AM – 4:30 PM (Closed Mondays)',
        entryFeeINR: 50,
        bestTimeToVisit: 'Late morning',
        tags: ['Wooden Architecture', 'Travancore Royalty', 'Carved Ceilings']
      }
    ]
  }
];
