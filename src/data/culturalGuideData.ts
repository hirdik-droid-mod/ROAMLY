import { CulinaryItem, CircuitRoute, WeatherAdvisory } from '../types';

export const CULINARY_DELICACIES: CulinaryItem[] = [
  {
    id: 'madurai-kari-dosa',
    name: 'Madurai Mutton Kari Dosa',
    tamilName: 'மதுரை கறி தோசை',
    region: 'Madurai',
    type: 'non_veg',
    description: 'A decadent multi-layered thick parotta-style dosa smothered in seasoned minced meat, beaten country eggs, and fragrant Chettinad spices.',
    signatureIngredients: ['Minced mutton chukka', 'Country eggs', 'Black pepper', 'Curry leaves'],
    mustTrySpot: 'Simmakkal Konar Mess & Amma Mess, Madurai'
  },
  {
    id: 'madurai-jigarthanda',
    name: 'Famous Royal Jigarthanda',
    tamilName: 'ஜிகர்தண்டா',
    region: 'Madurai',
    type: 'dessert',
    description: 'Literally "cool the heart" — a royal dessert drink introduced during Nayakkar reign, prepared with reduced almond gum (badam pisin), nannari root syrup, condensed milk, and basundi ice cream.',
    signatureIngredients: ['Badam Pisin (Almond Gum)', 'Nannari Sharbat', 'Reduced Milk', 'Palgova Ice Cream'],
    mustTrySpot: 'Famous Jigarthanda Shop (East Marret Street), Madurai'
  },
  {
    id: 'chettinad-kavuni-arisi',
    name: 'Chettinad Kavuni Arisi (Black Rice Sweet)',
    tamilName: 'கவுனி அரிசி',
    region: 'Chettinad & Sivaganga',
    type: 'vegetarian',
    description: 'An ancient aromatic black rice delicacy brought by seafaring Chettiar merchants from Burma in the 19th century, slow-steamed with fresh grated coconut, cardamom, and pure jaggery.',
    signatureIngredients: ['Forbidden Black Rice', 'Pure Ghee', 'Fresh Grated Coconut', 'Organic Jaggery'],
    mustTrySpot: 'The Bangala, Karaikudi & Kanadukathan'
  },
  {
    id: 'kumbakonam-degree-coffee',
    name: 'Kumbakonam Degree Filter Coffee',
    tamilName: 'கும்பகோணம் டிகிரி காபி',
    region: 'Thanjavur & Cauvery Delta',
    type: 'beverage',
    description: 'Brewed from first-decoction plantation peaberry and chicory beans using pure unadulterated cow milk, served frothing in traditional brass dabarah and tumbler.',
    signatureIngredients: ['First Decoction Peaberry', 'Chicory blend', 'Unboiled Cow Milk', 'Cane Sugar'],
    mustTrySpot: 'Kumbakonam Highway Coffee Stalls, Thanjavur Circuit'
  },
  {
    id: 'nilgiri-frost-tea',
    name: 'Nilgiri Winter Frost Orthodox Tea',
    tamilName: 'நீலகிரி பனி தேநீர்',
    region: 'The Nilgiris (Ooty & Coonoor)',
    type: 'beverage',
    description: 'Cultivated at 6,500 feet during cold December mornings when frost coats the leaves, yielding a luminous amber liquor with sweet floral and passionfruit notes.',
    signatureIngredients: ['Single-estate orthodox tea tips', 'Spring mountain water'],
    mustTrySpot: 'Highfield Tea Factory, Coonoor & Glenmorgan Estate'
  },
  {
    id: 'chettinad-vellai-paniyaram',
    name: 'Chettinad Vellai Paniyaram & Milagai Chutney',
    tamilName: 'வெள்ளை பணியாரம்',
    region: 'Chettinad',
    type: 'vegetarian',
    description: 'Crisp-edged, melt-in-the-mouth white rice dumplings flash-fried in pure groundnut oil, served with fiery raw red chili and shallot chutney.',
    signatureIngredients: ['Raw rice batter', 'Urad dal', 'Small shallots', 'Guntur red chilies'],
    mustTrySpot: 'Visalam Heritage Mansion, Kanadukathan'
  }
];

export const CIRCUIT_ROUTES: CircuitRoute[] = [
  {
    id: 'royal-heritage-circuit',
    title: 'The Great Chola & Pandya Royal Circuit',
    subtitle: 'Chennai → Mahabalipuram → Thanjavur → Chettinad → Madurai',
    duration: '5 Days / 4 Nights',
    totalDistanceKm: 485,
    drivingTimeHours: 9.5,
    cities: ['Mahabalipuram', 'Thanjavur', 'Chettinad', 'Madurai'],
    stops: [
      { name: 'Shore Temple Sunrise Walk', durationMinutes: 90, highlight: '7th-century Pallava monolithic rock art' },
      { name: 'Brihadisvara Big Temple', durationMinutes: 120, highlight: '1,000-year Chola 80-tonne granite dome' },
      { name: 'Athangudi Tile Studio', durationMinutes: 60, highlight: 'Artisanal handmade floral tile pouring' },
      { name: 'Meenakshi Temple Sunset Aarti', durationMinutes: 150, highlight: 'Golden lotus pond & thousand pillar hall' }
    ],
    idealSeason: 'October to March'
  },
  {
    id: 'cloud-forest-highlands',
    title: 'Western Ghats Cloud Mist & Tea Trail',
    subtitle: 'Coimbatore → Coonoor → Ooty → Pykara → Mudumalai',
    duration: '4 Days / 3 Nights',
    totalDistanceKm: 210,
    drivingTimeHours: 5.5,
    cities: ['Coonoor', 'Ooty', 'Pykara'],
    stops: [
      { name: 'Nilgiri Heritage Toy Train', durationMinutes: 180, highlight: 'UNESCO rack railway steam locomotive' },
      { name: 'Doddabetta Peak Viewpoint', durationMinutes: 60, highlight: '8,650 ft panoramic Western Ghats horizon' },
      { name: 'Pykara Pine Forest Lake', durationMinutes: 90, highlight: 'Quiet speedboat cruise in Toda territory' }
    ],
    idealSeason: 'September to May'
  },
  {
    id: 'lands-end-coastal',
    title: 'Triveni Sangam & Southern Cape Odyssey',
    subtitle: 'Madurai → Tirunelveli → Kanyakumari → Padmanabhapuram',
    duration: '3 Days / 2 Nights',
    totalDistanceKm: 250,
    drivingTimeHours: 4.8,
    cities: ['Madurai', 'Tirunelveli', 'Kanyakumari'],
    stops: [
      { name: 'Tirunelveli Nellaiyappar Temple', durationMinutes: 90, highlight: 'Musical stone pillars that chime notes' },
      { name: 'Vivekananda Rock Memorial Ferry', durationMinutes: 120, highlight: 'Offshore granite sanctuary on sea islands' },
      { name: 'Padmanabhapuram Wooden Palace', durationMinutes: 90, highlight: '16th-century carved rosewood Travancore halls' }
    ],
    idealSeason: 'October to February'
  }
];

export const WEATHER_ADVISORIES: WeatherAdvisory[] = [
  {
    city: 'Ooty & Nilgiris',
    district: 'The Nilgiris',
    temperatureC: 16,
    condition: 'Crisp morning mist with sunny afternoons',
    iconType: 'mist',
    bestMonths: 'October – May',
    clothingTips: ['Light woolens & cardigans for evenings', 'Sturdy walking shoes for tea trails', 'Rain windcheater']
  },
  {
    city: 'Madurai Heritage',
    district: 'Madurai',
    temperatureC: 28,
    condition: 'Pleasant mornings & warm cultural evenings',
    iconType: 'sunny',
    bestMonths: 'November – March',
    clothingTips: ['Breathable cotton kurtas / shirts', 'Traditional dhoti/veshti or saree for temple darshan', 'Slip-on footwear']
  },
  {
    city: 'Mahabalipuram Coast',
    district: 'Chengalpattu',
    temperatureC: 27,
    condition: 'Gentle sea breeze & golden sunshine',
    iconType: 'breeze',
    bestMonths: 'October – April',
    clothingTips: ['Light linen attire', 'Sun protection hat & sunglasses', 'Beachwear / surf shorts']
  },
  {
    city: 'Kodaikanal Pines',
    district: 'Dindigul',
    temperatureC: 17,
    condition: 'Gentle breeze in pine woods with passing fog',
    iconType: 'mist',
    bestMonths: 'September – June',
    clothingTips: ['Medium fleece jacket', 'Comfortable trekking pants', 'Thermos flask for mountain walks']
  },
  {
    city: 'Kanyakumari Lands End',
    district: 'Kanyakumari',
    temperatureC: 29,
    condition: 'Continuous ocean breeze with clear horizon',
    iconType: 'breeze',
    bestMonths: 'October – March',
    clothingTips: ['Light cotton garments', 'Camera strap for offshore wind', 'Comfortable sandals']
  }
];

export const TEMPLE_ETIQUETTE_RULES = [
  {
    rule: 'Sacred Attire (Dress Code)',
    description: 'Traditional Indian clothing is mandatory for inner sanctums. Men wear Dhoti/Veshti with shirt or Angavastram (or bare chest where specified). Women wear Saree, Half-saree, or Churidar with Dupatta.',
    status: 'Mandatory'
  },
  {
    rule: 'Barefoot Sanctity',
    description: 'Footwear must be deposited at designated temple footwear stalls before stepping onto stone praharams. Free socks are helpful during midday granite heat.',
    status: 'Mandatory'
  },
  {
    rule: 'Photography Protocol',
    description: 'Photography is permitted in outer courtyards and sculpture corridors, but strictly prohibited inside the Moolasthanam (inner sanctum). Mobiles must remain silent or secured in lockers.',
    status: 'Strictly Enforced'
  },
  {
    rule: 'Circumambulation (Pradakshina)',
    description: 'Always walk around sanctums in a clockwise direction with reverence. Avoid touching sculpted deities unless receiving holy prasadam from temple priests.',
    status: 'Cultural Custom'
  }
];
