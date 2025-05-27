import React from 'react';
import { motion } from 'framer-motion';

interface FormattedResponseProps {
  children: React.ReactNode;
  className?: string;
}

export const FormattedResponse: React.FC<FormattedResponseProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-card p-6 ${className}`}
    >
      <div className="prose max-w-none">
        {children}
      </div>
    </motion.div>
  );
};