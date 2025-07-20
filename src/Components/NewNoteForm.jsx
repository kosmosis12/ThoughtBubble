import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, CheckSquare, Lightbulb, FileText } from 'lucide-react';
import { categories } from '../config.js';

const NewNoteForm = ({ onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const textareaRef = useRef(null);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote, selectedCategory);
      setNewNote('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newNote]);

  const SelectedIcon = { CheckSquare, Lightbulb, FileText }[categories.find(c => c.name === selectedCategory)?.icon];

  return (
    <div className="px-4 pb-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <textarea
          ref={textareaRef}
          placeholder="What's on your mind?"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full bg-transparent resize-none focus:outline-none text-gray-300 placeholder-gray-500"
          rows="2"
        />
        
        <div className="flex items-center justify-between mt-3">
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <SelectedIcon size={16} className={categories.find(c => c.name === selectedCategory)?.color} />
              <span className="text-xs font-semibold tracking-wider uppercase">{selectedCategory}</span>
              <ChevronDown size={16} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-10">
                {categories.map((category) => {
                  const Icon = { CheckSquare, Lightbulb, FileText }[category.icon];
                  return (
                    <button
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setShowCategoryDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Icon size={16} className={category.color} />
                      <span className="text-sm font-semibold uppercase tracking-wider">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddNote}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Send size={16} className="text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNoteForm;