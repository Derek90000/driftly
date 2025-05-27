import React from 'react';
import { motion } from 'framer-motion';
import { Map, Sparkles, Calendar } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Select Destinations',
      description: 'Choose one or multiple destinations, dates, and preferences for your dream trip.',
      icon: <Map className="w-8 h-8 text-primary-500" />,
      delay: 0.2,
    },
    {
      id: 2,
      title: 'AI Generates Your Plan',
      description: 'Our advanced AI creates a personalized itinerary based on your preferences.',
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      delay: 0.4,
    },
    {
      id: 3,
      title: 'Customize & Enjoy',
      description: 'Edit your plan, add activities, and export your perfect itinerary.',
      icon: <Calendar className="w-8 h-8 text-primary-500" />,
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Driftly Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform makes travel planning effortless and personalized
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative bg-white rounded-xl p-8 shadow-card hover:shadow-hover transition-all duration-300"
            >
              <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">{step.id}</span>
              </div>
              
              <div className="pt-6 pb-2">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};