import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Calendar, Map, Trash2, Edit, Clock, MessageSquare, Download, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';

export const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Trip Dashboard - Driftly';
  }, []);

  const [activeTab, setActiveTab] = useState('trips');
  const { isConnected } = useWallet();

  // Mock data for saved trips
  const savedTrips = [
    {
      id: '1',
      title: 'Tokyo Adventure',
      image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg',
      dates: 'Jun 15 - Jun 22, 2025',
      duration: '7 days',
    },
    {
      id: '2',
      title: 'Paris Romance',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      dates: 'Aug 10 - Aug 15, 2025',
      duration: '5 days',
    },
    {
      id: '3',
      title: 'Bali Retreat',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
      dates: 'Sep 5 - Sep 15, 2025',
      duration: '10 days',
    },
  ];

  // Mock data for AI suggestions
  const aiSuggestions = [
    {
      id: '1',
      title: 'Add sunset point to Day 3?',
      trip: 'Tokyo Adventure',
      type: 'activity',
      description: 'There\'s a beautiful sunset viewpoint near your hotel that would be perfect for Day 3 evening.',
    },
    {
      id: '2',
      title: 'Swap museum for a wine tour nearby?',
      trip: 'Paris Romance',
      type: 'substitution',
      description: 'Based on your preferences, you might enjoy a wine tasting tour instead of the Modern Art Museum.',
    },
    {
      id: '3',
      title: 'Weather alert for Day 2 in Bali',
      trip: 'Bali Retreat',
      type: 'weather',
      description: 'Forecasts show rain on Day 2. Consider moving indoor activities to this day.',
    },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Trip Dashboard</h1>
            <p className="text-gray-600">
              Manage your planned trips and view AI-powered suggestions
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('trips')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'trips'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                My Trips
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'timeline'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                Timeline Editor
              </button>
              <button
                onClick={() => setActiveTab('sharing')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'sharing'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Map className="w-5 h-5 mr-2" />
                Sharing
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'suggestions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Suggestions
                <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="mb-8">
            {activeTab === 'trips' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-xl font-semibold">{trip.title}</h3>
                          <p className="text-white/80 text-sm flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {trip.dates}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                            {trip.duration}
                          </div>
                          {isConnected ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {}}
                              className="text-gray-500"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Export
                            </Button>
                          ) : (
                            <div className="flex items-center text-gray-400 text-sm">
                              <Lock className="w-3 h-3 mr-1" />
                              Pro
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {}}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outlineDark"
                            size="sm"
                            onClick={() => {}}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button
                    variant="outlineDark"
                    onClick={() => window.location.href = '/planner'}
                  >
                    Create New Trip
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'suggestions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 p-6"
                    >
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          suggestion.type === 'activity' 
                            ? 'bg-primary-100 text-primary-600' 
                            : suggestion.type === 'substitution'
                              ? 'bg-accent-100 text-accent-600'
                              : 'bg-warning-100 text-warning-600'
                        }`}>
                          {suggestion.type === 'activity' && <Calendar className="w-5 h-5" />}
                          {suggestion.type === 'substitution' && <Edit className="w-5 h-5" />}
                          {suggestion.type === 'weather' && <Cloud className="w-5 h-5" />}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">For: {suggestion.trip}</p>
                          <p className="mt-2 text-gray-600">{suggestion.description}</p>
                          <div className="mt-4 flex space-x-3">
                            <Button
                              variant={isConnected ? "primary" : "outlineDark"}
                              size="sm"
                              disabled={!isConnected}
                            >
                              {isConnected ? 'Apply' : (
                                <div className="flex items-center">
                                  <Lock className="w-3 h-3 mr-1" />
                                  $DRIFT required
                                </div>
                              )}
                            </Button>
                            <Button
                              variant="outlineDark"
                              size="sm"
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === 'timeline' || activeTab === 'sharing') && (
              <div className="bg-white rounded-xl shadow-card p-8 text-center">
                <div className="max-w-md mx-auto">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === 'timeline' 
                      ? 'The Timeline Editor allows you to drag and drop activities, add custom events, and fine-tune your itinerary.' 
                      : 'Share your trips with friends and family, allowing them to view or collaborate on your itinerary.'}
                  </p>
                  <p className="text-sm text-primary-600 mb-4">
                    Unlock with 5,000+ $DRIFT tokens
                  </p>
                  <Button
                    variant="primary"
                    disabled={isConnected}
                  >
                    {isConnected ? 'Coming Soon' : 'Connect Wallet'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional icon used in this component
const Cloud = (props) => (
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
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);