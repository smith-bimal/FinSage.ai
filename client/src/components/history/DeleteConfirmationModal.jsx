import { motion } from 'framer-motion';
import { AlertCircle, Loader, Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({ 
  simulationToDelete, 
  deleteLoading, 
  deleteError, 
  cancelDelete, 
  confirmDelete 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
      >
        <div className="flex items-center mb-4">
          <AlertCircle className="text-red-500 mr-3 h-6 w-6" />
          <h3 className="text-xl font-semibold text-white">Confirm Deletion</h3>
        </div>

        <p className="text-gray-300 mb-2">
          Are you sure you want to delete the following simulation?
        </p>

        {simulationToDelete && (
          <div className="bg-gray-800/50 p-3 rounded-lg mb-4 border border-gray-700">
            <p className="text-white font-medium">{simulationToDelete.name}</p>
            <p className="text-gray-400 text-sm">Created on: {new Date(simulationToDelete.date).toLocaleDateString()}</p>
          </div>
        )}

        <p className="text-red-400 text-sm mb-6">
          This action will permanently delete the simulation and all associated financial data. This cannot be undone.
        </p>

        {deleteError && (
          <div className="bg-red-900/30 border border-red-700/30 text-red-400 p-3 rounded-lg mb-4">
            {deleteError}
          </div>
        )}

        <div className="flex space-x-3 justify-end">
          <button
            onClick={cancelDelete}
            disabled={deleteLoading}
            className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={deleteLoading}
            className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors flex items-center"
          >
            {deleteLoading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmationModal;
