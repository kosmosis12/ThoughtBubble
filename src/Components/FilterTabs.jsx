import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { categories } from '../config.js';

const FilterTabs = ({ activeFilter, onSetFilter, searchQuery, onSearch, noteCount }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleFilterClick = (filter) => {
    if (filter === 'search') {
      setShowSearch(!showSearch);
      setShowCategories(false);
      onSetFilter('all'); 
    } else if (filter === 'category') {
      setShowCategories(!showCategories);
      setShowSearch(false);
    } else {
      onSetFilter(filter);
      setShowSearch(false);
      setShowCategories(false);
      onSearch('');
    }
  };

  return (
    <div className="px-4 py-3 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleFilterClick('all')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              activeFilter === 'all' && !showSearch && !showCategories ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            All ({noteCount})
          </button>
          <div className="relative">
            <button
              onClick={() => handleFilterClick('category')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                showCategories || (activeFilter !== 'all' && activeFilter !== 'search') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span>Category</span>
              <ChevronDown size={14} />
            </button>
            {showCategories && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-10">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      onSetFilter(cat.type);
                      setShowCategories(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => handleFilterClick('search')}
            className={`p-2 rounded-full transition-colors ${
              showSearch ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Search size={18} />
          </button>
        </div>
      </div>
      {showSearch && (
        <div className="mt-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default FilterTabs;