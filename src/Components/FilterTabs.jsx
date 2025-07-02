import React from 'react';
import { CheckSquare, Lightbulb, FileText } from 'lucide-react';
import { categories } from '../config.js';

const FilterTabs = ({ activeFilter, onSetFilter, noteCount }) => {
  return (
    <div className="flex items-center space-x-2 px-4 pb-4">
      <button
        onClick={() => onSetFilter('all')}
        className={`px-4 py-2 rounded-lg transition-all ${
          activeFilter === 'all' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        All ({noteCount})
      </button>
      {categories.map(cat => (
        <button
          key={cat.type}
          onClick={() => onSetFilter(cat.type)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeFilter === cat.type
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          {React.createElement(
            { CheckSquare, Lightbulb, FileText }[cat.icon], 
            { size: 16 }
          )}
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;