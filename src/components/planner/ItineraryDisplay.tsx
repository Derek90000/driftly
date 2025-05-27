import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { ItinerarySection } from './ItinerarySection';

interface ItineraryDisplayProps {
  day: number;
  location: string;
  sections: {
    morning: any[];
    afternoon: any[];
    evening: any[];
  };
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ day, location, sections }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center mr-3">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Day {day}</h2>
            <div className="flex items-center text-white/60 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ItinerarySection type="morning" activities={sections.morning} />
        <ItinerarySection type="afternoon" activities={sections.afternoon} />
        <ItinerarySection type="evening" activities={sections.evening} />
      </div>
    </motion.div>
  );
};