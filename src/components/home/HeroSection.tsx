import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useWallet } from '../../contexts/WalletContext';
import { TripCard } from './TripCard';

export const HeroSection = () => {
  const { isConnected, connectWallet } = useWallet();
  const navigate = useNavigate();

  // Sample trip cards for the display
  const tripCards = [
    {
      id: '1',
      title: 'Tokyo Adventure',
      image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg',
      days: 7,
      activities: 14,
      budget: '$2,000',
    },
    {
      id: '2',
      title: 'Paris Romance',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      days: 5,
      activities: 10,
      budget: '$1,800',
    },
    {
      id: '3',
      title: 'Bali Retreat',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
      days: 10,
      activities: 12,
      budget: '$1,500',
    },
  ];

  return (
    <section className="pt-24 pb-16 bg-hero-pattern min-h-[90vh] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-6 h-6 bg-white/30 rounded-full blur-sm animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full blur-sm animate-float-slow" />
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-white/20 rounded-full blur-sm animate-float-fast" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Dream Trip.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-300">
                Powered by $DRIFT.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-lg">
              Experience travel like never before with our AI-powered itineraries, personalized recommendations, and seamless planning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => navigate('/planner')}
              >
                Plan Your Trip
              </Button>
              
              {!isConnected && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
            
            <div className="mt-6 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg inline-flex items-center">
              <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
              <p className="text-sm text-white/90">
                <span className="font-semibold">Pro features unlock</span> with 10,000+ $DRIFT
              </p>
            </div>
          </motion.div>
          
          {/* Right Column - Floating Cards */}
          <div className="relative h-[500px]">
            {tripCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2 + (index * 0.1),
                }}
                className="absolute"
                style={{
                  top: `${index * 15}%`,
                  right: `${index * 5}%`,
                  zIndex: tripCards.length - index,
                }}
              >
                <TripCard trip={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,165.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};