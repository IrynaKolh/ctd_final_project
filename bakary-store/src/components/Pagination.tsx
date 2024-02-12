import React from 'react';
// import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { PaginatioProps } from '../models/interfaces';

const Pagination: React.FC<PaginatioProps> = ({ currentPage, totalPages, onPageChange }) => {
  const range = (from = 1, to = totalPages, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer"
      >
        Previous
      </button>

      {range(1, totalPages).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-3 py-2 ${
            currentPage === page
              ? 'bg-blue-500 text-white rounded-md cursor-pointer'
              : 'bg-gray-200 text-gray-700 rounded-md cursor-pointer'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
