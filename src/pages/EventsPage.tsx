import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Search, Filter, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Events - Driftly';
  }, []);

  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for events
  const events = [
    {
      id: '1',
      title: 'Tokyo Cherry Blossom Festival',
      image: 'https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg',
      location: 'Ueno Park, Tokyo',
      date: 'Mar 25 - Apr 5, 2025',
      time: '9:00 AM - 8:00 PM',
      category: 'festival',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Paris Wine & Cheese Tasting',
      image: 'https://images.pexels.com/photos/1395318/pexels-photo-1395318.jpeg',
      location: 'Le Marais District, Paris',
      date: 'Aug 15, 2025',
      time: '6:00 PM - 9:00 PM',
      category: 'food',
      isFeatured: true,
    },
    {
      id: '3',
      title: 'Barcelona Street Music Festival',
      image: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
      location: 'Gothic Quarter, Barcelona',
      date: 'Jul 8 - Jul 10, 2025',
      time: '3:00 PM - 11:00 PM',
      category: 'music',
      isFeatured: false,
    },
    {
      id: '4',
      title: 'Hidden Gems Walking Tour',
      image: 'https://images.pexels.com/photos/13740197/pexels-photo-13740197.jpeg',
      location: 'Greenwich Village, New York',
      date: 'Jun 22, 2025',
      time: '10:00 AM - 1:00 PM',
      category: 'tour',
      isFeatured: false,
    },
    {
      id: '5',
      title: 'Traditional Balinese Dance',
      image: 'https://images.pexels.com/photos/5490100/pexels-photo-5490100.jpeg',
      location: 'Ubud Palace, Bali',
      date: 'Sep 12, 2025',
      time: '7:00 PM - 9:00 PM',
      category: 'cultural',
      isFeatured: true,
    },
    {
      id: '6',
      title: 'Swiss Chocolate Workshop',
      image: 'https://images.pexels.com/photos/5702541/pexels-photo-5702541.jpeg',
      location: 'Old Town, Zurich',
      date: 'Oct 5, 2025',
      time: '2:00 PM - 5:00 PM',
      category: 'food',
      isFeatured: false,
    },
    {
      id: '7',
      title: 'Kyoto Lantern Festival',
      image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg',
      location: 'Gion District, Kyoto',
      date: 'Jul 16 - Jul 17, 2025',
      time: '7:00 PM - 11:00 PM',
      category: 'festival',
      isFeatured: true,
    },
    {
      id: '8',
      title: 'Santorini Sunset Cruise',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
      location: 'Ammoudi Port, Santorini',
      date: 'Aug 8, 2025',
      time: '5:30 PM - 9:30 PM',
      category: 'tour',
      isFeatured: false,
    },
  ];

  const filters = [
    { label: 'All Events', value: 'all' },
    { label: 'Festivals', value: 'festival' },
    { label: 'Food & Drink', value: 'food' },
    { label: 'Music', value: 'music' },
    { label: 'Tours', value: 'tour' },
    { label: 'Cultural', value: 'cultural' },
  ];

  // Filter events based on active category
  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  // Featured events at the top
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);
  const regularEvents = filteredEvents.filter(event => !event.isFeatured);

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
            <h1 className="text-3xl font-bold mb-2">Discover Local Events</h1>
            <p className="text-gray-600">
              Explore authentic cultural experiences and hidden gems
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events by name or location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Tag className="w-5 h-5 text-primary-500 mr-2" />
                Featured Events
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 h-48 md:h-auto">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-3">
                          {filters.find(f => f.value === event.category)?.label}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                          {event.time}
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => window.location.href = `/events/${event.id}`}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outlineDark"
                            size="sm"
                          >
                            Add to Trip
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Events */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                      {filters.find(f => f.value === event.category)?.label}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                      {event.time}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.location.href = `/events/${event.id}`}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlineDark"
                        size="sm"
                        className="flex-1"
                      >
                        Add to Trip
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* No Results Message */}
          {filteredEvents.length === 0 && (
            <div className="bg-white rounded-xl shadow-card p-8 text-center mt-8">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events match your filter</h3>
              <p className="text-gray-600 mb-6">
                Try selecting a different category to find more events
              </p>
              <Button
                variant="primary"
                onClick={() => setActiveFilter('all')}
              >
                Show All Events
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};