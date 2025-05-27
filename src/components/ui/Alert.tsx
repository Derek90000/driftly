import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ type, children }) => {
  const styles = {
    info: 'bg-primary-50 text-primary-800 border-primary-200',
    success: 'bg-success-50 text-success-800 border-success-200',
    warning: 'bg-warning-50 text-warning-800 border-warning-200',
    error: 'bg-error-50 text-error-800 border-error-200',
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
  };

  return (
    <div className={`flex items-start p-4 rounded-lg border ${styles[type]}`}>
      <div className="flex-shrink-0 mr-3">{icons[type]}</div>
      <div>{children}</div>
    </div>
  );
};