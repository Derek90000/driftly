import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Beach', 'Mountain', 'City', 'Cultural', 'Adventure'];
  
  const destinations = [
    {
      id: '1',
      name: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      category: 'Beach',
    },
    {
      id: '2',
      name: 'Kyoto, Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
      category: 'Cultural',
    },
    {
      id: '3',
      name: 'Swiss Alps',
      image: 'https://images.pexels.com/photos/290466/pexels-photo-290466.jpeg',
      category: 'Mountain',
    },
    {
      id: '4',
      name: 'New York, USA',
      image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
      category: 'City',
    },
    {
      id: '5',
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
      category: 'Beach',
    },
    {
      id: '6',
      name: 'Machu Picchu, Peru',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
      category: 'Adventure',
    },
    {
      id: '7',
      name: 'Barcelona, Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
      category: 'City',
    },
    {
      id: '8',
      name: 'Banff, Canada',
      image: 'https://images.pexels.com/photos/572688/pexels-photo-572688.jpeg',
      category: 'Mountain',
    },
  ];
  
  const filteredDestinations = activeCategory === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore these breathtaking locations with AI-powered trip planning
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "primary" : "outlineDark"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">{destination.name}</h3>
                  <span className="inline-block px-2 py-1 bg-primary-500 text-white text-xs rounded-full mt-2">
                    {destination.category}
                  </span>
                </div>
              </div>
              <div className="bg-white p-4 flex justify-between items-center">
                <Button
                  variant="link"
                  className="text-primary-600 p-0"
                  onClick={() => window.location.href = '/planner'}
                >
                  Plan a trip
                </Button>
                <span className="text-sm text-gray-500">View details →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};