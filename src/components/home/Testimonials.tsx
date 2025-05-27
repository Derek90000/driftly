import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  const testimonials = [
    {
      id: '1',
      name: 'Sarah J.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      location: 'Tokyo, Japan',
      text: 'Driftly transformed our trip to Japan. The AI suggested places we never would have found otherwise, and the itinerary was perfectly balanced. Worth every $DRIFT token!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michael R.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      location: 'Barcelona, Spain',
      text: 'As a solo traveler, Driftly gave me confidence to explore Barcelona. The day-by-day planning and AI chat helped me navigate the city like a local. Amazing experience!',
      rating: 5,
    },
    {
      id: '3',
      name: 'Emily & David',
      avatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
      location: 'Bali, Indonesia',
      text: 'Our honeymoon in Bali was absolute perfection thanks to Driftly. The AI understood exactly what we wanted - romantic but adventurous. The hotel recommendations were spot on!',
      rating: 4,
    },
  ];

  const handlePrev = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Driftly has transformed travel experiences for our users
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-card p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                  />
                </div>
                
                <div>
                  <div className="flex mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-800 text-lg md:text-xl italic mb-6">
                    "{testimonials[current].text}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[current].name}</p>
                    <p className="text-gray-500">Trip to {testimonials[current].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-6 md:-translate-x-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-6 md:translate-x-12">
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                current === index ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};