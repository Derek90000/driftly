import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Edit, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWallet } from '../../contexts/WalletContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ItineraryResultProps {
  itinerary: string;
  onBack: () => void;
  onStartOver: () => void;
}

export const ItineraryResult: React.FC<ItineraryResultProps> = ({ itinerary, onBack, onStartOver }) => {
  const { isConnected } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white flex items-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Summary
        </button>
        
        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button variant="glass\" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="glass" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="primary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={onStartOver}>
              Start Over
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <ReactMarkdown 
          className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-white/90 prose-strong:text-white prose-em:text-white/70 prose-li:text-white/90"
          remarkPlugins={[remarkGfm]}
        >
          {itinerary}
        </ReactMarkdown>
      </div>

      <div className="pt-8 border-t border-white/10">
        <Button variant="primary" className="w-full" onClick={onStartOver}>
          Plan Another Trip
        </Button>
      </div>
    </motion.div>
  );
};