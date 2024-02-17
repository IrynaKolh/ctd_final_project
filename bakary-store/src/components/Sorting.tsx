import React, { useState } from 'react';
import { SortProps } from '../models/interfaces';

const Sorting: React.FC<SortProps> = ({ onSort }) => {
  const [sortBy, setSortBy] = useState('');

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">Sort by:</span>
      <select
        value={sortBy}
        onChange={handleChange}
        className="border w-40 border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">None</option>
        <option value="price">Price</option>
        <option value="createdAt">Date</option>
      </select>
    </div>
  );
};

export default Sorting;
