import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import NoteList from './NoteList.jsx';
import NewNoteForm from './NewNoteForm.jsx';
import FilterTabs from './FilterTabs.jsx';
import SearchBar from './SearchBar.jsx';
import { categories } from './config.js'; // <-- Changed

const ThoughtBubble = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = () => {
      const initialNotes = [
        { id: '1a2b3c4d', type: 'todo', content: 'Prep Q3 board slides - need to finalize revenue projections and competitive analysis', category: 'Personal To-Do', reminder: '0m', timestamp: '07:49 AM', completed: false },
        { id: '5e6f7g8h', type: 'idea', content: 'New mobile app feature idea: voice notes integration with AI transcription', category: 'Project Idea', timestamp: '06:49 AM', completed: false },
        { id: '9i0j1k2l', type: 'meeting', content: 'Follow up with Alex about design system implementation for Q4', category: 'Meeting Note', reminder: '29m', timestamp: '06:32 AM', completed: false }
      ];
      setNotes(initialNotes);
      setIsLoading(false);
    };
    setTimeout(fetchNotes, 1000);
  }, []);

  const handleAddNote = (noteContent, categoryName) => {
    const categoryDetails = categories.find(c => c.name === categoryName);
    const newNote = {
      id: crypto.randomUUID(),
      type: categoryDetails.type,
      content: noteContent,
      category: categoryName,
      reminder: categoryName === 'Personal To-Do' ? '0m' : null,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      completed: false
    };
    setNotes([newNote, ...notes]);
  };

  const toggleNoteCompletion = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleUpdateNote = (id, newContent) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    ));
    setEditingNoteId(null);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || note.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">TB</div>
          <div>
            <h1 className="text-xl font-semibold">ThoughtBubble</h1>
            <p className="text-sm text-gray-400">Capture thoughts instantly</p>
          </div>
        </div>
        <button aria-label="Close" className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
      </div>

      <SearchBar query={searchQuery} onSearch={setSearchQuery} />
      <FilterTabs activeFilter={activeFilter} onSetFilter={setActiveFilter} noteCount={notes.length} />
      <NewNoteForm onAddNote={handleAddNote} />

      <div className="px-4 pb-4 max-h-96 overflow-y-auto">
        {isLoading ? (
          <p className="text-center text-gray-400 py-8">Loading thoughts...</p>
        ) : (
          <NoteList
            notes={filteredNotes}
            onToggleComplete={toggleNoteCompletion}
            onDeleteNote={handleDeleteNote}
            onUpdateNote={handleUpdateNote}
            editingNoteId={editingNoteId}
            setEditingNoteId={setEditingNoteId}
          />
        )}
      </div>
    </div>
  );
};

export default ThoughtBubble;