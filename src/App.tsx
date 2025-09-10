import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

import NoteList from './components/NoteList';
import NewNoteForm from './components/NewNoteForm';
import FilterTabs from './components/FilterTabs';
import ReminderModal from './components/ReminderModal';
import { categories } from './config';
import { Note } from './types';

const API_URL = 'http://localhost:3001/api';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteForReminder, setNoteForReminder] = useState<Note | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(
        data.data.map((n: any) => ({
          ...n,
          completed: Boolean(n.completed),
        }))
      );
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (noteContent: string, categoryName: string) => {
    const categoryDetails = categories.find((c) => c.name === categoryName);
    const newNote = {
      id: crypto.randomUUID(),
      type: categoryDetails?.type ?? 'todo',
      content: noteContent,
      category: categoryName,
      reminder: null,
      reminderTimestamp: null,
      completed: 0,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) throw new Error('Failed to add note');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNoteOnServer = async (
    id: string,
    updatedFields: Record<string, unknown>
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error('Failed to update note');
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  };

  const toggleNoteCompletion = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const success = await updateNoteOnServer(id, {
      completed: note.completed ? 0 : 1,
    });
    if (success) {
      setNotes(notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n)));
    }
  };

  const handleUpdateNote = async (id: string, newContent: string) => {
    const success = await updateNoteOnServer(id, { content: newContent });
    if (success) {
      setNotes(notes.map((note) => (note.id === id ? { ...note, content: newContent } : note)));
    }
    setEditingNoteId(null);
  };

  const handleSetReminder = async (noteId: string, minutes: number) => {
    const reminderTime = new Date(Date.now() + minutes * 60 * 1000);
    const success = await updateNoteOnServer(noteId, {
      reminder: `${minutes}m`,
      reminderTimestamp: reminderTime.getTime(),
    });
    if (success) {
      setNotes(
        notes.map((note) =>
          note.id === noteId
            ? { ...note, reminder: `${minutes}m`, reminderTimestamp: reminderTime.getTime() }
            : note
        )
      );
    }
    setNoteForReminder(null);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || note.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden">
        <div className="relative flex justify-center items-center p-4 border-b border-gray-800">
          <h1 className="text-2xl font-light tracking-wider text-gray-100">ThoughtBubble</h1>
          <button
            aria-label="Close"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onSetFilter={setActiveFilter}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          noteCount={notes.length}
        />
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
              onOpenReminderModal={(note) => setNoteForReminder(note)}
            />
          )}
        </div>
      </div>

      {noteForReminder && (
        <ReminderModal
          note={noteForReminder}
          onSetReminder={handleSetReminder}
          onClose={() => setNoteForReminder(null)}
        />
      )}
    </>
  );
};

export default App;
