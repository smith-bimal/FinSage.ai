import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, paginate, goToNextPage, goToPreviousPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <motion.div
      className="flex justify-center my-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <button
          className={`w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} transition-colors`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {pageNumbers.length <= 5 ? (
          pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${currentPage === number
                  ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                } transition-colors`}
            >
              {number}
            </button>
          ))
        ) : (
          <>
            <button
              onClick={() => paginate(1)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${currentPage === 1
                  ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                } transition-colors`}
            >
              1
            </button>

            {currentPage > 3 && <span className="text-gray-400">...</span>}

            {pageNumbers
              .filter(number => number !== 1 && number !== totalPages &&
                (Math.abs(number - currentPage) < 2 ||
                  (number === 2 && currentPage === 1) ||
                  (number === totalPages - 1 && currentPage === totalPages)))
              .map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg ${currentPage === number
                      ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                    } transition-colors`}
                >
                  {number}
                </button>
              ))}

            {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}

            <button
              onClick={() => paginate(totalPages)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${currentPage === totalPages
                  ? 'border-0 text-white bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'border border-gray-800 text-gray-400 bg-white/5 hover:bg-white/10'
                } transition-colors`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`w-9 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-gray-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} transition-colors`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </motion.div>
  );
};

export default Pagination;
