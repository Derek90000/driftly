import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { Calendar, MapPin, Compass, DollarSign, Sun, Coffee, Users, Accessibility, ChevronRight, Lock, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { generateItinerary } from '../services/apiService';
import { useItineraryStore } from '../store/itineraryStore';

export const PlannerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Trip Planner - Driftly';
  }, []);

  const { isConnected } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { itinerary, setItinerary } = useItineraryStore();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [formData, setFormData] = useState({
    destinations: [],
    dateType: 'flexible',
    startDate: '',
    endDate: '',
    interests: [],
    budget: 1500,
    weatherPreference: '',
    pace: 'balanced',
    tripType: '',
    accessibility: false,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate form data
      if (formData.destinations.length === 0) {
        throw new Error('Please select at least one destination');
      }
      
      if (formData.dateType === 'fixed' && (!formData.startDate || !formData.endDate)) {
        throw new Error('Please select both start and end dates');
      }
      
      if (formData.interests.length === 0) {
        throw new Error('Please select at least one interest');
      }

      // Generate itinerary
      const result = await generateItinerary(formData);
      setItinerary(result);
      
      // Navigate to results section
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  // Sample data for selectable options
  const destinations = [
    'Tokyo, Japan', 'Paris, France', 'New York, USA', 'Barcelona, Spain',
    'Bali, Indonesia', 'Sydney, Australia', 'Rome, Italy', 'Cancun, Mexico',
  ];
  
  const interests = [
    { id: 'hiking', name: 'Hiking', icon: <Compass size={16} /> },
    { id: 'food', name: 'Food Tours', icon: <Coffee size={16} /> },
    { id: 'museums', name: 'Museums', icon: <MapPin size={16} /> },
    { id: 'beaches', name: 'Beaches', icon: <Sun size={16} /> },
    { id: 'nightlife', name: 'Nightlife', icon: <Moon size={16} /> },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBag size={16} /> },
    { id: 'historical', name: 'Historical Sites', icon: <Landmark size={16} /> },
    { id: 'adventure', name: 'Adventure', icon: <Mountain size={16} /> },
  ];

  const weatherOptions = ['Warm', 'Moderate', 'Cold', 'Any'];
  const paceOptions = ['Relaxed', 'Balanced', 'Fast'];
  const tripTypes = ['Solo', 'Couple', 'Family', 'Friends'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 pt-24 pb-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl animate-float-fast" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Create Your Perfect Trip</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Tell us about your dream vacation and let our AI craft the perfect itinerary
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-white/10" />
              <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-primary-500" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }} />
              {Array.from({ length: totalSteps }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
                    index + 1 <= currentStep 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  <span className="font-medium">{index + 1}</span>
                  {index + 1 <= currentStep && (
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-white/80">
              <span className="text-sm font-medium">Destinations</span>
              <span className="text-sm font-medium">Dates</span>
              <span className="text-sm font-medium">Preferences</span>
              <span className="text-sm font-medium">Finalize</span>
            </div>
          </div>

          {/* Form Steps */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-glass p-8 border border-white/20"
          >
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Where do you want to go?</h2>
                
                <div className="mb-6">
                  <label className="block text-white/90 mb-2">Select Destinations</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {/* Selected destinations */}
                    {formData.destinations.map((destination) => (
                      <div 
                        key={destination}
                        className="p-3 rounded-lg border border-primary-500 bg-primary-500/20 text-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                            <span className="text-sm">{destination}</span>
                          </div>
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                destinations: formData.destinations.filter(d => d !== destination)
                              });
                            }}
                            className="text-white/60 hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Available preset destinations */}
                    {destinations.map((destination) => (
                      !formData.destinations.includes(destination) && (
                        <div 
                          key={destination}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              destinations: [...formData.destinations, destination]
                            });
                          }}
                          className="cursor-pointer p-3 rounded-lg border border-white/20 hover:border-primary-300 text-white/80"
                        >
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-white/60" />
                            <span className="text-sm">{destination}</span>
                          </div>
                        </div>
                      )
                    ))}
                    
                    {/* Custom location input */}
                    {showCustomInput ? (
                      <div className="p-3 rounded-lg border border-white/20 bg-white/5">
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                            placeholder="Enter location..."
                            className="flex-1 bg-transparent border-none text-white placeholder-white/60 text-sm focus:outline-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && customLocation.trim()) {
                                setFormData({
                                  ...formData,
                                  destinations: [...formData.destinations, customLocation.trim()]
                                });
                                setCustomLocation('');
                                setShowCustomInput(false);
                              }
                            }}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (customLocation.trim()) {
                                  setFormData({
                                    ...formData,
                                    destinations: [...formData.destinations, customLocation.trim()]
                                  });
                                  setCustomLocation('');
                                  setShowCustomInput(false);
                                }
                              }}
                              className="text-xs text-white/80 hover:text-white px-2 py-1 rounded bg-primary-500/20 hover:bg-primary-500/30"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => {
                                setShowCustomInput(false);
                                setCustomLocation('');
                              }}
                              className="text-xs text-white/80 hover:text-white px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => setShowCustomInput(true)}
                        className="cursor-pointer p-3 rounded-lg border border-dashed border-white/20 hover:border-primary-300 text-white/80 flex items-center justify-center"
                      >
                        <span className="text-sm">+ Add Custom Location</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-white/60 italic mb-6">
                  Pro Tip: Select multiple destinations for a multi-city journey
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">When are you planning to travel?</h2>
                
                <div className="mb-6">
                  <label className="block text-white/90 mb-2">Date Flexibility</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div 
                      onClick={() => setFormData({ ...formData, dateType: 'fixed' })}
                      className={`cursor-pointer p-4 rounded-lg border transition-all ${
                        formData.dateType === 'fixed'
                          ? 'border-primary-500 bg-primary-500/20 text-white'
                          : 'border-white/20 hover:border-primary-300 text-white/80'
                      }`}
                    >
                      <div className="flex items-center">
                        <Calendar className={`w-5 h-5 mr-3 ${
                          formData.dateType === 'fixed' ? 'text-primary-400' : 'text-white/60'
                        }`} />
                        <div>
                          <span className="font-medium">Fixed Dates</span>
                          <p className="text-sm text-white/60 mt-1">I know exactly when I'm traveling</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => setFormData({ ...formData, dateType: 'flexible' })}
                      className={`cursor-pointer p-4 rounded-lg border transition-all ${
                        formData.dateType === 'flexible'
                          ? 'border-primary-500 bg-primary-500/20 text-white'
                          : 'border-white/20 hover:border-primary-300 text-white/80'
                      }`}
                    >
                      <div className="flex items-center">
                        <Calendar className={`w-5 h-5 mr-3 ${
                          formData.dateType === 'flexible' ? 'text-primary-400' : 'text-white/60'
                        }`} />
                        <div>
                          <span className="font-medium">Flexible Dates</span>
                          <p className="text-sm text-white/60 mt-1">I'm open to date recommendations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {formData.dateType === 'fixed' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/90 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-white"
                      />
                    </div>
                  </div>
                )}
                
                {formData.dateType === 'flexible' && (
                  <div className="mb-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white/90">
                        Our AI will suggest the best times to visit your selected destinations based on:
                      </p>
                      <ul className="mt-2 space-y-1 text-white/80">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          Weather conditions
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          Avoiding peak tourist seasons
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          Better pricing for accommodations
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          Local events and festivals
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">What are your preferences?</h2>
                
                <div className="mb-6">
                  <label className="block text-white/90 mb-2">Interests & Activities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {interests.map((interest) => (
                      <div 
                        key={interest.id}
                        onClick={() => {
                          const newInterests = formData.interests.includes(interest.id)
                            ? formData.interests.filter(i => i !== interest.id)
                            : [...formData.interests, interest.id];
                          setFormData({ ...formData, interests: newInterests });
                        }}
                        className={`cursor-pointer p-3 rounded-lg border transition-all ${
                          formData.interests.includes(interest.id)
                            ? 'border-primary-500 bg-primary-500/20 text-white'
                            : 'border-white/20 hover:border-primary-300 text-white/80'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            formData.interests.includes(interest.id) 
                              ? 'bg-primary-500/20 text-primary-400' 
                              : 'bg-white/10 text-white/60'
                          }`}>
                            {interest.icon}
                          </div>
                          <span className="text-sm">{interest.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-white/90 mb-2">Budget (per person)</label>
                  <div className="flex items-center gap-4">
                    <DollarSign className="w-5 h-5 text-white/60" />
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <span className="min-w-[80px] text-right font-medium text-white">${formData.budget}</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>Budget</span>
                    <span>Luxury</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white/90 mb-2">Weather Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {weatherOptions.map((option) => (
                        <div 
                          key={option}
                          onClick={() => setFormData({ ...formData, weatherPreference: option })}
                          className={`cursor-pointer p-2 rounded-lg border text-center transition-all ${
                            formData.weatherPreference === option
                              ? 'border-primary-500 bg-primary-500/20 text-white'
                              : 'border-white/20 hover:border-primary-300 text-white/80'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/90 mb-2">Travel Pace</label>
                    <div className="grid grid-cols-3 gap-2">
                      {paceOptions.map((option) => (
                        <div 
                          key={option}
                          onClick={() => setFormData({ ...formData, pace: option.toLowerCase() })}
                          className={`cursor-pointer p-2 rounded-lg border text-center transition-all ${
                            formData.pace === option.toLowerCase()
                              ? 'border-primary-500 bg-primary-500/20 text-white'
                              : 'border-white/20 hover:border-primary-300 text-white/80'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white/90 mb-2">Trip Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {tripTypes.map((option) => (
                        <div 
                          key={option}
                          onClick={() => setFormData({ ...formData, tripType: option.toLowerCase() })}
                          className={`cursor-pointer p-2 rounded-lg border text-center transition-all ${
                            formData.tripType === option.toLowerCase()
                              ? 'border-primary-500 bg-primary-500/20 text-white'
                              : 'border-white/20 hover:border-primary-300 text-white/80'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/90 mb-2">Accessibility Needs</label>
                    <div 
                      onClick={() => setFormData({ ...formData, accessibility: !formData.accessibility })}
                      className={`cursor-pointer p-3 rounded-lg border transition-all ${
                        formData.accessibility
                          ? 'border-primary-500 bg-primary-500/20 text-white'
                          : 'border-white/20 hover:border-primary-300 text-white/80'
                      }`}
                    >
                      <div className="flex items-center">
                        <Accessibility className={`w-5 h-5 mr-2 ${
                          formData.accessibility ? 'text-primary-400' : 'text-white/60'
                        }`} />
                        <span>I need wheelchair-accessible options</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Ready to generate your itinerary</h2>
                
                <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                  <h3 className="font-medium text-lg mb-4 text-white">Trip Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-32 text-white/60">Destinations:</div>
                      <div className="flex-1 font-medium text-white">
                        {formData.destinations.length > 0 
                          ? formData.destinations.join(', ') 
                          : 'No destinations selected'}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-32 text-white/60">Dates:</div>
                      <div className="flex-1 font-medium text-white">
                        {formData.dateType === 'flexible' 
                          ? 'Flexible (AI will recommend)' 
                          : formData.startDate && formData.endDate 
                            ? `${formData.startDate} to ${formData.endDate}`
                            : 'No dates selected'}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-32 text-white/60">Budget:</div>
                      <div className="flex-1 font-medium text-white">${formData.budget} per person</div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-32 text-white/60">Interests:</div>
                      <div className="flex-1 font-medium text-white">
                        {formData.interests.length > 0 
                          ? formData.interests.map(id => interests.find(i => i.id === id)?.name).join(', ')
                          : 'No interests selected'}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-32 text-white/60">Preferences:</div>
                      <div className="flex-1 font-medium text-white">
                        <span className="inline-block mr-2">
                          {formData.weatherPreference || 'Any weather'}
                        </span>
                        <span className="inline-block mr-2">
                          {formData.pace.charAt(0).toUpperCase() + formData.pace.slice(1) || 'Balanced'} pace
                        </span>
                        <span className="inline-block">
                          {formData.tripType 
                            ? formData.tripType.charAt(0).toUpperCase() + formData.tripType.slice(1) + ' trip'
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-500/10 border border-primary-400/20 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Sparkles className="w-5 h-5 text-primary-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-white">AI Trip Generation</h3>
                      <p className="text-white/80 text-sm mt-1">
                        Our AI will analyze your preferences to create a personalized day-by-day itinerary with:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-white/90">
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 text-primary-400" />
                          Curated activities based on your interests
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 text-primary-400" />
                          Restaurant recommendations for each day
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 text-primary-400" />
                          Optimized routes to minimize travel time
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 text-primary-400" />
                          Accommodation suggestions within your budget
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Token gating notice */}
                {!isConnected && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 flex items-center">
                    <Lock className="w-5 h-5 text-white/60 mr-3" />
                    <div>
                      <p className="text-white/80 text-sm">
                        Connect your wallet to unlock premium features like advanced AI edits and itinerary exports
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Your Personalized Itinerary</h2>
                
                {error ? (
                  <div className="bg-error-500/10 border border-error-500/20 rounded-lg p-4 mb-6">
                    <p className="text-white/90">{error}</p>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setCurrentStep(4)}
                      className="mt-4"
                    >
                      Go Back
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <pre className="whitespace-pre-wrap text-white/90 font-sans">
                        {itinerary}
                      </pre>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="primary"
                        onClick={() => {
                          // Add export functionality here
                          alert('Export feature coming soon!');
                        }}
                        disabled={!isConnected}
                      >
                        {isConnected ? 'Export Itinerary' : 'Connect Wallet to Export'}
                      </Button>
                      
                      <Button
                        variant="glass"
                        onClick={() => {
                          setCurrentStep(1);
                          setItinerary(null);
                          setFormData({
                            destinations: [],
                            dateType: 'flexible',
                            startDate: '',
                            endDate: '',
                            interests: [],
                            budget: 1500,
                            weatherPreference: '',
                            pace: 'balanced',
                            tripType: '',
                            accessibility: false,
                          });
                        }}
                      >
                        Plan Another Trip
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="glass"
                onClick={handlePrev}
                disabled={currentStep === 1 || isLoading}
              >
                Back
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Itinerary'
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Pro Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-accent-400 mr-2" />
              <h3 className="text-white font-medium">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2" />
                Select multiple destinations for a multi-city journey
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2" />
                Choose flexible dates to let AI find the best travel times
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2" />
                Add specific interests to get personalized recommendations
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Additional icons used in this component
const Moon = (props) => (
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
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const ShoppingBag = (props) => (
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const Landmark = (props) => (
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
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const Mountain = (props) => (
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
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);