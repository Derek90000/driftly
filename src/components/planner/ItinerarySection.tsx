import React from 'react';
import { Sun, Sunset, Moon, Clock, MapPin, DollarSign, Coffee, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  title: string;
  description?: string;
  location?: string;
  time?: string;
  cost?: string;
  tip?: string;
}

interface ItinerarySectionProps {
  type: 'morning' | 'afternoon' | 'evening';
  activities: Activity[];
}

export const ItinerarySection: React.FC<ItinerarySectionProps> = ({ type, activities }) => {
  const sectionConfig = {
    morning: {
      icon: <Sun className="w-5 h-5" />,
      title: 'Morning',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconBg: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    afternoon: {
      icon: <Sunset className="w-5 h-5" />,
      title: 'Afternoon',
      gradient: 'from-orange-500/20 to-red-500/20',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
    },
    evening: {
      icon: <Moon className="w-5 h-5" />,
      title: 'Evening',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
  };

  const { icon, title, gradient, iconBg, iconColor } = sectionConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden backdrop-blur-sm bg-gradient-to-r ${gradient} border border-white/10 mb-4`}
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full ${iconBg} ${iconColor} flex items-center justify-center mr-3`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium">{activity.title}</h4>
                {activity.time && (
                  <div className="flex items-center text-white/60 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.time}
                  </div>
                )}
              </div>

              {activity.description && (
                <p className="text-white/80 text-sm mb-3">{activity.description}</p>
              )}

              <div className="flex flex-wrap gap-3 text-sm">
                {activity.location && (
                  <div className="flex items-center text-white/60">
                    <MapPin className="w-4 h-4 mr-1" />
                    {activity.location}
                  </div>
                )}
                
                {activity.cost && (
                  <div className="flex items-center text-white/60">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {activity.cost}
                  </div>
                )}
              </div>

              {activity.tip && (
                <div className="mt-3 bg-white/10 rounded-lg p-3 text-sm text-white/70 italic">
                  {activity.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};