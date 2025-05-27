import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, Users, Ticket, PlusCircle, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useWallet } from '../contexts/WalletContext';

export const EventDetailPage = () => {
  const { id } = useParams();
  const { isConnected } = useWallet();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${event.title} - Driftly`;
  }, []);

  // Mock data for the event detail
  const event = {
    id,
    title: 'Tokyo Cherry Blossom Festival',
    image: 'https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg',
    location: 'Ueno Park, Tokyo',
    address: '5-20 Uenokoen, Taito City, Tokyo 110-0007, Japan',
    date: 'Mar 25 - Apr 5, 2025',
    time: '9:00 AM - 8:00 PM',
    category: 'Cultural Festival',
    description: `
      Experience one of Japan's most iconic seasonal events - the blooming of the cherry blossoms (sakura) at Ueno Park. 
      This annual festival celebrates the ephemeral beauty of sakura with over 800 cherry trees bursting into pink and white blossoms.
      
      Visitors can enjoy traditional Japanese food stalls, cultural performances, and the centuries-old tradition of hanami (flower viewing) 
      under the illuminated trees. The festival is particularly magical in the evening when lanterns light up the park.
      
      The exact blooming dates may vary each year depending on weather conditions, but the festival activities run throughout the period.
    `,
    activities: [
      'Hanami picnics under cherry trees',
      'Traditional Japanese food stalls',
      'Cultural performances and music',
      'Evening illuminations',
      'Boat rides on Shinobazu Pond',
      'Photography sessions',
    ],
    ticketInfo: {
      price: 'Free admission to the park',
      specialEvents: 'Some performances may require tickets (¥500-2000)',
    },
    coordinates: { lat: 35.7142, lng: 139.7714 },
    attendance: '500,000+ visitors during the festival period',
    tipsAndInfo: [
      'Arrive early in the morning or late afternoon to avoid the largest crowds',
      'Bring a picnic blanket if you plan to join in hanami',
      'The best photo opportunities are during sunrise and sunset',
      'Check the cherry blossom forecast before planning your visit',
      'Many food vendors only accept cash',
    ],
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <a href="/events" className="hover:text-primary-600 flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Events
              </a>
            </div>

            {/* Event Header */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
              <div className="relative h-72">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-3 py-1 bg-primary-500 text-white text-sm rounded-full mb-3">
                    {event.category}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                  <div className="flex flex-wrap gap-y-2">
                    <div className="flex items-center mr-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                  <p className="text-gray-700 whitespace-pre-line mb-6">{event.description}</p>
                  
                  {/* Activities */}
                  <h3 className="text-lg font-medium mb-3">What to Expect</h3>
                  <ul className="space-y-2 mb-6">
                    {event.activities.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Tips and Info */}
                  <h3 className="text-lg font-medium mb-3">Tips & Information</h3>
                  <ul className="space-y-2">
                    {event.tipsAndInfo.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1">
                {/* Action Widget */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-6 sticky top-24">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Ticket className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium">Ticket Price</span>
                      </div>
                      <span className="text-right">{event.ticketInfo.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium">Date</span>
                      </div>
                      <span className="text-right">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium">Time</span>
                      </div>
                      <span className="text-right">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium">Attendance</span>
                      </div>
                      <span className="text-right">{event.attendance}</span>
                    </div>
                    
                    <div className="pt-2 text-sm text-gray-500">
                      <div className="font-medium mb-1">Note:</div>
                      <p>{event.ticketInfo.specialEvents}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    className="w-full mb-3"
                    onClick={() => {}}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add to Trip
                  </Button>
                  
                  <Button
                    variant={isConnected ? "outlineDark" : "outlineDark"}
                    className="w-full"
                    disabled={!isConnected}
                  >
                    {isConnected ? (
                      <>Visit Official Website</>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="w-3 h-3 mr-1" />
                        $DRIFT required
                      </div>
                    )}
                  </Button>
                </div>

                {/* Location */}
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <div className="rounded-lg overflow-hidden mb-4 h-48 bg-gray-200">
                    {/* This would be a map component in a real app */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <MapPin className="w-6 h-6 mr-2" />
                      Interactive Map
                    </div>
                  </div>
                  <div className="text-gray-700 mb-4">
                    <div className="font-medium mb-1">Address:</div>
                    <p>{event.address}</p>
                  </div>
                  <Button
                    variant="outlineDark"
                    size="sm"
                    className="w-full"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};