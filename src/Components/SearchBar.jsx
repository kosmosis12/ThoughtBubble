import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ query, onSearch }) => {
  return (
    <div className="p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBar;