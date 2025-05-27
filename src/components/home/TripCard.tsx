import React from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

interface TripCardProps {
  trip: {
    id: string;
    title: string;
    image: string;
    days: number;
    activities: number;
    budget: string;
  };
  className?: string;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, className = '' }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl w-64 h-80 bg-white shadow-card hover:shadow-hover transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">{trip.title}</h3>
        
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-accent-300" />
            <span>{trip.days} Days</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-accent-300" />
            <span>{trip.activities} Activities</span>
          </div>
          
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-accent-300" />
            <span>{trip.budget}</span>
          </div>
        </div>
        
        <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs">
          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-1.5"></span>
          AI Generated
        </div>
      </div>
    </div>
  );
};