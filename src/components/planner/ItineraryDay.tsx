import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ItineraryDayProps {
  day: number;
  content: string;
  onGenerateNext: () => void;
  isLastDay: boolean;
  isLoading: boolean;
}

export const ItineraryDay: React.FC<ItineraryDayProps> = ({
  day,
  content,
  onGenerateNext,
  isLastDay,
  isLoading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6"
    >
      <div className="flex items-center mb-4">
        <Calendar className="w-5 h-5 text-primary-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">Day {day}</h3>
      </div>

      <div className="markdown-content text-white">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4 text-white/90">{children}</p>,
            ul: ({ children }) => <ul className="mb-4 space-y-2">{children}</ul>,
            li: ({ children }) => (
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2" />
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="text-white/80 italic">{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary-500 pl-4 my-4 italic opacity-80">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-white/10 rounded px-1.5 py-0.5 text-sm">{children}</code>
            ),
            pre: ({ children }) => (
              <pre className="bg-white/10 rounded-lg p-4 mb-4 overflow-x-auto">{children}</pre>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {!isLastDay && (
        <Button
          variant="primary"
          onClick={onGenerateNext}
          disabled={isLoading}
          className="w-full mt-6"
        >
          {isLoading ? (
            <>Generating Day {day + 1}...</>
          ) : (
            <>
              Generate Day {day + 1}
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
};