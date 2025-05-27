import React from 'react';
import { Plane } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <Plane className="w-6 h-6" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-500 rounded-full" />
    </div>
  );
};