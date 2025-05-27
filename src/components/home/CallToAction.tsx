import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react';

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">AI-Powered Travel Planning</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-2xl mx-auto">
              Ready to Transform Your Travel Experience?
            </h2>
            
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of travelers who have discovered the power of AI-enhanced travel planning. Your dream trip is just a few clicks away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => navigate('/planner')}
              >
                Plan Your Trip
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Explore Features
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};