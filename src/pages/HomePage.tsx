import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { TokenFeatures } from '../components/home/TokenFeatures';
import { Destinations } from '../components/home/Destinations';
import { Testimonials } from '../components/home/Testimonials';
import { CallToAction } from '../components/home/CallToAction';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Driftly - AI-Powered Travel Planner';
  }, []);

  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <TokenFeatures />
      <Destinations />
      <Testimonials />
      <CallToAction />
    </div>
  );
};