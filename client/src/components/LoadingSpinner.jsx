export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-500"></div>
      <span className="ml-3 text-gray-400">Calculating your future...</span>
    </div>
  );
}