import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Coffee, Utensils, Dumbbell, ChevronLeft, ChevronRight, ExternalLink, Calendar, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useWallet } from '../contexts/WalletContext';

export const HotelDetailPage = () => {
  const { id } = useParams();
  const { isConnected } = useWallet();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${hotel.name} - Driftly`;
  }, []);

  // Mock data for the hotel detail
  const hotel = {
    id,
    name: 'Grand Sakura Hotel',
    location: 'Tokyo, Japan',
    description: 'Experience luxury in the heart of Tokyo with stunning city views, exceptional service, and world-class amenities. Our elegant rooms blend modern design with traditional Japanese elements for a unique stay experience.',
    price: '$220',
    rating: 4.8,
    reviewCount: 246,
    distance: '0.8 miles from center',
    amenities: [
      { name: 'Free WiFi', icon: <Wifi className="w-4 h-4" /> },
      { name: 'Breakfast Included', icon: <Coffee className="w-4 h-4" /> },
      { name: 'Restaurant', icon: <Utensils className="w-4 h-4" /> },
      { name: 'Fitness Center', icon: <Dumbbell className="w-4 h-4" /> },
      { name: 'Room Service', icon: <Utensils className="w-4 h-4" /> },
      { name: 'Swimming Pool', icon: <Swim className="w-4 h-4" /> },
      { name: 'Spa Services', icon: <Spa className="w-4 h-4" /> },
      { name: 'Conference Rooms', icon: <Meeting className="w-4 h-4" /> },
    ],
    images: [
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    ],
    coordinates: { lat: 35.6895, lng: 139.6917 },
    roomTypes: [
      { name: 'Standard Room', price: '$220', beds: '1 Queen Bed', capacity: '2 Guests', availability: true },
      { name: 'Deluxe Room', price: '$280', beds: '1 King Bed', capacity: '2 Guests', availability: true },
      { name: 'Suite', price: '$350', beds: '1 King Bed + Sofa', capacity: '3 Guests', availability: false },
    ],
    reviews: [
      { id: '1', author: 'Sarah M.', rating: 5, comment: 'Beautiful hotel with exceptional service. The staff went above and beyond to make our stay memorable.', date: '2 months ago' },
      { id: '2', author: 'John D.', rating: 4, comment: 'Great location and comfortable rooms. The breakfast buffet was amazing with many traditional Japanese options.', date: '3 months ago' },
      { id: '3', author: 'Emily L.', rating: 5, comment: 'Perfect stay! The views from our room were breathtaking, and the hotel amenities were top-notch.', date: '1 month ago' },
    ],
    highlights: [
      'Best for digital nomads',
      'Great for romantic getaways',
      'Close to major attractions',
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <a href="/hotels" className="hover:text-primary-600">Hotels</a>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{hotel.name}</span>
            </div>

            {/* Hotel Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center text-sm text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.location}
                  <span className="mx-2">•</span>
                  <span>{hotel.distance}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-lg mr-3">
                  <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                  <span className="font-medium">{hotel.rating}</span>
                  <span className="text-gray-500 ml-1">({hotel.reviewCount} reviews)</span>
                </div>
                <span className="text-xl font-semibold">{hotel.price}<span className="text-sm font-normal text-gray-500"> / night</span></span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative rounded-xl overflow-hidden mb-8 h-96">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={hotel.images[currentImageIndex]}
                alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center focus:outline-none hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center focus:outline-none hover:bg-white"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {hotel.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">About {hotel.name}</h2>
                  <p className="text-gray-700 mb-6">{hotel.description}</p>
                  
                  {/* Amenities */}
                  <h3 className="text-lg font-medium mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mr-2">
                          {amenity.icon}
                        </div>
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Types */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Room Options</h2>
                  <div className="space-y-4">
                    {hotel.roomTypes.map((room, index) => (
                      <div 
                        key={index}
                        className={`border rounded-lg p-4 ${
                          room.availability ? 'border-gray-200' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="font-medium">{room.name}</h3>
                            <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                              <span className="mr-3">{room.beds}</span>
                              <span>{room.capacity}</span>
                            </div>
                          </div>
                          <div className="mt-3 sm:mt-0 text-right">
                            <div className="font-semibold">{room.price}<span className="text-sm font-normal text-gray-500"> / night</span></div>
                            <Button
                              variant={room.availability ? "primary" : "outlineDark"}
                              size="sm"
                              className="mt-2"
                              disabled={!room.availability}
                            >
                              {room.availability ? 'Book Now' : 'Sold Out'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Guest Reviews</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-current text-yellow-400 mr-1" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-gray-500 ml-1">({hotel.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {hotel.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">{review.author}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-current text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outlineDark"
                    size="sm"
                  >
                    View All Reviews
                  </Button>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1">
                {/* Booking Widget */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    className="w-full mb-4"
                  >
                    Check Availability
                  </Button>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>From {hotel.price} / night</span>
                    <a href="#" className="text-primary-600 hover:underline flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Official Website
                    </a>
                  </div>
                </div>

                {/* AI Highlights */}
                <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                      <Sparkles className="w-4 h-4 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-800">AI Highlights</h3>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {hotel.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        <span className="text-primary-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {!isConnected && (
                    <div className="flex items-center text-sm text-gray-600 mt-4 pt-4 border-t border-primary-200">
                      <Lock className="w-4 h-4 mr-1 text-gray-500" />
                      <span>Unlock more insights with $DRIFT</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Additional icons used in this component
const Swim = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M4 11a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M12 11a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M20 11a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M4 19a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M12 19a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M20 19a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    <path d="M2 5h5v4" />
    <path d="M3 9l3-3" />
    <path d="M17 3v6" />
    <path d="M14 6h6" />
  </svg>
);

const Spa = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M18 9c0 4-6 9-6 9s-6-5-6-9a6 6 0 0 1 12 0Z" />
  </svg>
);

const Meeting = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

const Sparkles = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);