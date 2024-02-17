import React, { useState } from 'react';
import { FiltersProps } from '../models/interfaces';

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [filterBy, setFilterBy] = useState('');
  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setFilterBy(value);
    onFilter(value);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">Filter by:</span>
      <select
        value={filterBy}
        onChange={handleChange}
        className="border w-40 border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">None</option>
        <option value="Cakes">Cakes</option>
        <option value="Cookies">Cookies</option>
        <option value="Pies">Pies</option>
        <option value="Breads">Breads</option>
        <option value="Cupcakes">Cupcakes</option>
        <option value="Waffles">Waffles</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default Filters;
