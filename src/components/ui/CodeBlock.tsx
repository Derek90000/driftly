import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 my-4">
      {language && (
        <div className="absolute top-0 right-0 px-3 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
          {language}
        </div>
      )}
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
};