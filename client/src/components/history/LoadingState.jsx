import { Loader } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="h-10 w-10 text-purple-500 animate-spin mb-4" />
      <p className="text-gray-400">Loading simulation history...</p>
    </div>
  );
};

export default LoadingState;
