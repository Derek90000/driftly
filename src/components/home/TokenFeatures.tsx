import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Unlock, Key, Zap, Settings, Plane, Gift, Ticket, Sparkles } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

export const TokenFeatures = () => {
  const { isConnected, connectWallet } = useWallet();

  const features = [
    {
      id: '1',
      title: 'Advanced AI Edits',
      description: 'Full access to AI itinerary editing and real-time customization features',
      icon: <Zap className="w-8 h-8 text-white" />,
      tokens: '5,000 $DRIFT',
    },
    {
      id: '2',
      title: 'Premium Exports',
      description: 'Export itineraries to Google Calendar, Notion, or download as PDF',
      icon: <Settings className="w-8 h-8 text-white" />,
      tokens: '2,500 $DRIFT',
    },
    {
      id: '3',
      title: 'Exclusive Events',
      description: 'Access to token-gated events and experiences not available to the public',
      icon: <Key className="w-8 h-8 text-white" />,
      tokens: '10,000 $DRIFT',
    },
  ];

  const partnerDeals = [
    {
      name: 'Skyscanner',
      discount: 'Up to 15% off',
      requirement: '2,500 $DRIFT',
      icon: <Plane className="w-6 h-6" />,
    },
    {
      name: 'CheapOair',
      discount: 'Up to 20% off',
      requirement: '5,000 $DRIFT',
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      name: 'KAYAK',
      discount: 'Up to 12% off',
      requirement: '3,000 $DRIFT',
      icon: <Plane className="w-6 h-6" />,
    },
  ];

  const giveaways = [
    'Monthly luxury hotel stays',
    'First-class flight upgrades',
    'VIP travel experiences',
    'Exclusive resort packages'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl animate-float-fast" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-sm font-medium">Exclusive Benefits</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Premium Features with $DRIFT
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hold $DRIFT tokens to access exclusive features, partner discounts, and enter monthly giveaways
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70 mb-4">{feature.description}</p>
              
              <div className="flex items-center mt-auto">
                <Unlock className="w-5 h-5 mr-2 text-primary-300" />
                <span className="text-primary-200 font-medium">{feature.tokens}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Deals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Exclusive Partner Discounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerDeals.map((deal, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mr-4">
                    {deal.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{deal.name}</h4>
                    <p className="text-primary-300">{deal.discount}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-white/60">
                  <Key className="w-4 h-4 mr-2" />
                  <span>Required: {deal.requirement}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Giveaways Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-12"
        >
          <div className="flex items-center mb-6">
            <Gift className="w-8 h-8 text-accent-400 mr-3" />
            <h3 className="text-2xl font-semibold">Monthly Giveaways</h3>
          </div>
          <p className="text-white/80 mb-6">
            Hold at least 1,000 $DRIFT tokens to automatically enter our monthly travel giveaways
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {giveaways.map((giveaway, index) => (
              <div 
                key={index}
                className="bg-white/10 rounded-lg p-4 text-center"
              >
                <span className="text-sm">{giveaway}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
          {isConnected ? (
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-lg px-6 py-3">
              <span className="text-white mr-2">You currently hold:</span>
              <span className="font-bold">0 $DRIFT</span>
            </div>
          ) : (
            <Button 
              variant="glass" 
              size="lg"
              onClick={connectWallet}
            >
              Connect Wallet to Access Benefits
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};