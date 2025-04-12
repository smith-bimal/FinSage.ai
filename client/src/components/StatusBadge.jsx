import React from 'react';
import { AlertTriangle, ThumbsDown, Minus, ThumbsUp, TrendingUp } from 'lucide-react';

const StatusBadge = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Extreme Fear':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Fear':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Neutral':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Greed':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'Extreme Greed':
        return 'bg-green-600/20 text-green-400 border-green-600/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Extreme Fear':
        return AlertTriangle;
      case 'Fear':
        return ThumbsDown;
      case 'Neutral':
        return Minus;
      case 'Greed':
        return ThumbsUp;
      case 'Extreme Greed':
        return TrendingUp;
      default:
        return Minus;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusStyles()} ${className || ''}`}>
      <StatusIcon className="h-3 w-3" />
      {status}
    </span>
  );
};

export default StatusBadge;
