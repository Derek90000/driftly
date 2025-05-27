import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Coffee, Utensils, Dumbbell, Search, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HotelsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Hotels - Driftly';
  }, []);

  const [activeFilters, setActiveFilters] = useState({
    price: '',
    distance: '',
    rating: '',
    amenities: [],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for hotels
  const hotels = [
    {
      id: '1',
      name: 'Grand Sakura Hotel',
      location: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      price: '$220',
      rating: 4.8,
      distance: '0.8 miles from center',
      amenities: ['wifi', 'breakfast', 'restaurant', 'gym'],
    },
    {
      id: '2',
      name: 'Le Petit Château',
      location: 'Paris, France',
      image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg',
      price: '$310',
      rating: 4.9,
      distance: '0.3 miles from center',
      amenities: ['wifi', 'breakfast', 'restaurant'],
    },
    {
      id: '3',
      name: 'Manhattan Skyline',
      location: 'New York, USA',
      image: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
      price: '$290',
      rating: 4.7,
      distance: '1.2 miles from center',
      amenities: ['wifi', 'gym', 'restaurant'],
    },
    {
      id: '4',
      name: 'Bali Tranquil Resort',
      location: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      price: '$180',
      rating: 4.6,
      distance: '2.5 miles from center',
      amenities: ['wifi', 'breakfast', 'restaurant', 'gym'],
    },
    {
      id: '5',
      name: 'Barcelona Seaside',
      location: 'Barcelona, Spain',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      price: '$240',
      rating: 4.5,
      distance: '0.5 miles from center',
      amenities: ['wifi', 'breakfast'],
    },
    {
      id: '6',
      name: 'Alpine Lodge',
      location: 'Zurich, Switzerland',
      image: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
      price: '$280',
      rating: 4.8,
      distance: '1.8 miles from center',
      amenities: ['wifi', 'breakfast', 'restaurant', 'gym'],
    },
    {
      id: '7',
      name: 'Kyoto Garden Inn',
      location: 'Kyoto, Japan',
      image: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg',
      price: '$190',
      rating: 4.4,
      distance: '1.0 miles from center',
      amenities: ['wifi', 'breakfast'],
    },
    {
      id: '8',
      name: 'Santorini Blue View',
      location: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
      price: '$350',
      rating: 4.9,
      distance: '0.6 miles from center',
      amenities: ['wifi', 'breakfast', 'restaurant'],
    },
  ];

  const priceRanges = [
    { label: 'Any Price', value: '' },
    { label: 'Under $200', value: 'under-200' },
    { label: '$200 - $300', value: '200-300' },
    { label: 'Over $300', value: 'over-300' },
  ];

  const distanceRanges = [
    { label: 'Any Distance', value: '' },
    { label: 'Less than 0.5 miles', value: 'under-0.5' },
    { label: '0.5 - 1 mile', value: '0.5-1' },
    { label: 'Over 1 mile', value: 'over-1' },
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: '' },
    { label: '4.5+', value: '4.5' },
    { label: '4.0+', value: '4.0' },
    { label: '3.5+', value: '3.5' },
  ];

  const amenityOptions = [
    { label: 'WiFi', value: 'wifi', icon: <Wifi className="w-4 h-4" /> },
    { label: 'Breakfast', value: 'breakfast', icon: <Coffee className="w-4 h-4" /> },
    { label: 'Restaurant', value: 'restaurant', icon: <Utensils className="w-4 h-4" /> },
    { label: 'Gym', value: 'gym', icon: <Dumbbell className="w-4 h-4" /> },
  ];

  const toggleAmenityFilter = (amenity) => {
    setActiveFilters({
      ...activeFilters,
      amenities: activeFilters.amenities.includes(amenity)
        ? activeFilters.amenities.filter(a => a !== amenity)
        : [...activeFilters.amenities, amenity]
    });
  };

  // Filter hotels based on active filters
  const filteredHotels = hotels.filter(hotel => {
    // Price filter
    if (activeFilters.price === 'under-200' && parseInt(hotel.price.replace('$', '')) >= 200) return false;
    if (activeFilters.price === '200-300' && (parseInt(hotel.price.replace('$', '')) < 200 || parseInt(hotel.price.replace('$', '')) > 300)) return false;
    if (activeFilters.price === 'over-300' && parseInt(hotel.price.replace('$', '')) <= 300) return false;
    
    // Distance filter
    const hotelDistance = parseFloat(hotel.distance.split(' ')[0]);
    if (activeFilters.distance === 'under-0.5' && hotelDistance >= 0.5) return false;
    if (activeFilters.distance === '0.5-1' && (hotelDistance < 0.5 || hotelDistance > 1)) return false;
    if (activeFilters.distance === 'over-1' && hotelDistance <= 1) return false;
    
    // Rating filter
    if (activeFilters.rating === '4.5' && hotel.rating < 4.5) return false;
    if (activeFilters.rating === '4.0' && hotel.rating < 4.0) return false;
    if (activeFilters.rating === '3.5' && hotel.rating < 3.5) return false;
    
    // Amenities filter
    if (activeFilters.amenities.length > 0) {
      for (const amenity of activeFilters.amenities) {
        if (!hotel.amenities.includes(amenity)) return false;
      }
    }
    
    return true;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Hotels Explorer</h1>
            <p className="text-gray-600">
              Discover the perfect accommodations for your journey
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by hotel name or location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <Button
                  variant="outlineDark"
                  className="md:w-auto"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <div className="flex items-center">
                    <span>Filters</span>
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Button>
              </div>

              {/* Filters */}
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <select
                        value={activeFilters.price}
                        onChange={(e) => setActiveFilters({ ...activeFilters, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      >
                        {priceRanges.map(range => (
                          <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Distance */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Distance from Center</label>
                      <select
                        value={activeFilters.distance}
                        onChange={(e) => setActiveFilters({ ...activeFilters, distance: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      >
                        {distanceRanges.map(range => (
                          <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select
                        value={activeFilters.rating}
                        onChange={(e) => setActiveFilters({ ...activeFilters, rating: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      >
                        {ratingOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {amenityOptions.map(amenity => (
                          <button
                            key={amenity.value}
                            onClick={() => toggleAmenityFilter(amenity.value)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              activeFilters.amenities.includes(amenity.value)
                                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                            }`}
                          >
                            {amenity.icon}
                            <span className="ml-1">{amenity.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveFilters({ price: '', distance: '', rating: '', amenities: [] })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hotel Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium">
                    {hotel.price} / night
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-yellow-400 mr-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-gray-800 font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{hotel.distance}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.map((amenity) => {
                      const amenityOption = amenityOptions.find(a => a.value === amenity);
                      return (
                        <div key={amenity} className="bg-gray-100 rounded-full px-2 py-1 text-xs flex items-center">
                          {amenityOption?.icon}
                          <span className="ml-1">{amenityOption?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => window.location.href = `/hotels/${hotel.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredHotels.length === 0 && (
            <div className="bg-white rounded-xl shadow-card p-8 text-center mt-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hotels match your filters</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria to find more options
              </p>
              <Button
                variant="primary"
                onClick={() => setActiveFilters({ price: '', distance: '', rating: '', amenities: [] })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};