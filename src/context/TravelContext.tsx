import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Destination, 
  Booking, 
  AdminSettings, 
  SearchFilterState, 
  CategoryType 
} from '../types';
import { 
  INITIAL_DESTINATIONS, 
  INITIAL_BOOKINGS, 
  INITIAL_SETTINGS 
} from '../data/initialData';

interface TravelContextType {
  destinations: Destination[];
  bookings: Booking[];
  adminSettings: AdminSettings;
  searchFilters: SearchFilterState;
  selectedDestination: Destination | null;
  bookingTargetDestination: Destination | null;
  completedBookingTicket: Booking | null;
  activeView: 'home' | 'my-bookings' | 'admin-dashboard' | 'about';
  wishlist: string[];
  
  // Actions
  setActiveView: (view: 'home' | 'my-bookings' | 'admin-dashboard' | 'about') => void;
  setSelectedDestination: (dest: Destination | null) => void;
  setBookingTargetDestination: (dest: Destination | null) => void;
  setCompletedBookingTicket: (booking: Booking | null) => void;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  resetFilters: () => void;
  toggleWishlist: (destId: string) => void;
  
  // Booking operations
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookedAt' | 'bookingStatus' | 'paymentStatus' | 'paymentTransactionId'> & { paymentMethod: 'upi' | 'card' | 'netbanking' }) => Booking;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newStartDate: string, newEndDate: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['bookingStatus']) => void;
  
  // Admin Destination CRUD
  addDestination: (destination: Omit<Destination, 'id'>) => void;
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  toggleDestinationActive: (id: string) => void;
  toggleDestinationFeatured: (id: string) => void;
  
  // Admin Settings
  updateAdminSettings: (newSettings: Partial<AdminSettings>) => void;
  resetToDefaults: () => void;
  
  // Computed helpers
  filteredDestinations: Destination[];
  formatCurrency: (amount: number) => string;
}

const DEFAULT_FILTERS: SearchFilterState = {
  searchQuery: '',
  district: 'all',
  category: 'all',
  maxPrice: 10000,
  duration: 'all',
  minRating: 0,
  sortBy: 'featured',
  dateRange: {
    checkIn: '',
    checkOut: ''
  },
  guests: 2
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem('roamly_tn_destinations');
      return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
    } catch {
      return INITIAL_DESTINATIONS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('roamly_tn_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('roamly_tn_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('roamly_tn_wishlist');
      return saved ? JSON.parse(saved) : ['dest-madurai-heritage', 'dest-ooty-nilgiri'];
    } catch {
      return [];
    }
  });

  const [searchFilters, setSearchFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [bookingTargetDestination, setBookingTargetDestination] = useState<Destination | null>(null);
  const [completedBookingTicket, setCompletedBookingTicket] = useState<Booking | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'my-bookings' | 'admin-dashboard' | 'about'>('home');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('roamly_tn_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('roamly_tn_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('roamly_tn_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  useEffect(() => {
    localStorage.setItem('roamly_tn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const resetFilters = () => {
    setSearchFilters(DEFAULT_FILTERS);
  };

  const toggleWishlist = (destId: string) => {
    setWishlist(prev => 
      prev.includes(destId) ? prev.filter(id => id !== destId) : [...prev, destId]
    );
  };

  const formatCurrency = (amount: number): string => {
    const symbol = adminSettings.currencySymbol || '₹';
    return `${symbol}${amount.toLocaleString('en-IN')}`;
  };

  // Booking operations
  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'bookedAt' | 'bookingStatus' | 'paymentStatus' | 'paymentTransactionId'> & { paymentMethod: 'upi' | 'card' | 'netbanking' }
  ): Booking => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      ...bookingData,
      id: `TN-ROAM-${randomSuffix}`,
      paymentTransactionId: `TXN-${bookingData.paymentMethod.toUpperCase()}-${Date.now().toString().slice(-8)}`,
      paymentStatus: 'paid',
      bookingStatus: adminSettings.autoConfirmBookings ? 'confirmed' : 'confirmed',
      bookedAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    setCompletedBookingTicket(newBooking);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, bookingStatus: 'cancelled' as const, paymentStatus: 'refunded' as const } : b)
    );
  };

  const rescheduleBooking = (bookingId: string, newStartDate: string, newEndDate: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, startDate: newStartDate, endDate: newEndDate } : b)
    );
  };

  const updateBookingStatus = (bookingId: string, status: Booking['bookingStatus']) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, bookingStatus: status } : b)
    );
  };

  // Admin Destination CRUD
  const addDestination = (destinationData: Omit<Destination, 'id'>) => {
    const newId = `dest-${Date.now()}`;
    const newDest: Destination = {
      ...destinationData,
      id: newId
    };
    setDestinations(prev => [newDest, ...prev]);
  };

  const updateDestination = (id: string, updatedFields: Partial<Destination>) => {
    setDestinations(prev => 
      prev.map(d => d.id === id ? { ...d, ...updatedFields } : d)
    );
  };

  const deleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const toggleDestinationActive = (id: string) => {
    setDestinations(prev => 
      prev.map(d => d.id === id ? { ...d, isActive: !d.isActive } : d)
    );
  };

  const toggleDestinationFeatured = (id: string) => {
    setDestinations(prev => 
      prev.map(d => d.id === id ? { ...d, featured: !d.featured } : d)
    );
  };

  const updateAdminSettings = (newSettings: Partial<AdminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setDestinations(INITIAL_DESTINATIONS);
    setBookings(INITIAL_BOOKINGS);
    setAdminSettings(INITIAL_SETTINGS);
    localStorage.removeItem('roamly_tn_destinations');
    localStorage.removeItem('roamly_tn_bookings');
    localStorage.removeItem('roamly_tn_settings');
  };

  // Filtered destinations calculation
  const filteredDestinations = destinations.filter(item => {
    if (!item.isActive && activeView !== 'admin-dashboard') return false;

    // Search query
    if (searchFilters.searchQuery.trim()) {
      const q = searchFilters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDistrict = item.district.toLowerCase().includes(q);
      const matchTagline = item.tagline.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDistrict && !matchTagline && !matchDesc) return false;
    }

    // District filter
    if (searchFilters.district && searchFilters.district !== 'all') {
      if (!item.district.toLowerCase().includes(searchFilters.district.toLowerCase())) {
        return false;
      }
    }

    // Category filter
    if (searchFilters.category && searchFilters.category !== 'all') {
      if (item.category !== searchFilters.category) {
        return false;
      }
    }

    // Max Price filter
    if (item.pricePerPerson > searchFilters.maxPrice) {
      return false;
    }

    // Rating filter
    if (searchFilters.minRating > 0 && item.rating < searchFilters.minRating) {
      return false;
    }

    // Duration filter
    if (searchFilters.duration !== 'all') {
      if (searchFilters.duration === '1-2' && (item.durationDays < 1 || item.durationDays > 2)) return false;
      if (searchFilters.duration === '3-4' && (item.durationDays < 3 || item.durationDays > 4)) return false;
      if (searchFilters.duration === '5+' && item.durationDays < 5) return false;
    }

    return true;
  }).sort((a, b) => {
    if (searchFilters.sortBy === 'price_low') return a.pricePerPerson - b.pricePerPerson;
    if (searchFilters.sortBy === 'price_high') return b.pricePerPerson - a.pricePerPerson;
    if (searchFilters.sortBy === 'rating') return b.rating - a.rating;
    if (searchFilters.sortBy === 'duration') return a.durationDays - b.durationDays;
    // default 'featured'
    if (a.featured === b.featured) return b.rating - a.rating;
    return a.featured ? -1 : 1;
  });

  return (
    <TravelContext.Provider
      value={{
        destinations,
        bookings,
        adminSettings,
        searchFilters,
        selectedDestination,
        bookingTargetDestination,
        completedBookingTicket,
        activeView,
        wishlist,
        setActiveView,
        setSelectedDestination,
        setBookingTargetDestination,
        setCompletedBookingTicket,
        setSearchFilters,
        resetFilters,
        toggleWishlist,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        updateBookingStatus,
        addDestination,
        updateDestination,
        deleteDestination,
        toggleDestinationActive,
        toggleDestinationFeatured,
        updateAdminSettings,
        resetToDefaults,
        filteredDestinations,
        formatCurrency,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
