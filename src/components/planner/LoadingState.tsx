import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export const LoadingState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [-10, 10, -10]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Plane className="w-12 h-12 text-primary-400" />
        </motion.div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Crafting Your Perfect Itinerary
      </h3>
      
      <p className="text-white/80 mb-6">
        Our AI is analyzing your preferences and creating a personalized travel plan...
      </p>
      
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="h-2 bg-primary-500/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
        
        <div className="text-sm text-white/60">
          This may take a minute...
        </div>
      </div>
    </motion.div>
  );
};