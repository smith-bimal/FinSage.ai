import { DownloadCloud } from 'lucide-react';

const ExportPanel = () => {
  return (
    <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 relative overflow-hidden border border-gray-800/50 shadow-lg shadow-purple-900/10 mt-6">
      <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-500/10 blur-xl rounded-full"></div>

      <div className="flex items-center mb-4">
        <DownloadCloud className="h-4 w-4 mr-2 text-purple-400" />
        <h3 className="font-semibold text-white">Export Data</h3>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        Export your simulation history in multiple formats for further analysis or reporting.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
          <span>CSV</span>
        </button>
        <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
          <span>PDF</span>
        </button>
        <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
          <span>Excel</span>
        </button>
        <button className="text-xs py-1.5 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 transition-colors flex items-center justify-center">
          <span>JSON</span>
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;
