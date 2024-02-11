import React, { useState } from 'react';
import { SearchProps } from '../models/interfaces';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <form className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="border border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none focus:border-yellow-700 active:border-yellow-700"
      />
      {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Search
      </button> */}
    </form>
  );
};

export default Search;
