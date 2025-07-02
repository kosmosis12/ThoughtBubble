import React from 'react';
import NoteItem from './NoteItem.jsx';

const NoteList = ({ notes, onToggleComplete, onDeleteNote, onUpdateNote, editingNoteId, setEditingNoteId }) => {
  if (notes.length === 0) {
    return <p className="text-center text-gray-500 py-8">No matching notes found.</p>;
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onToggleComplete={onToggleComplete}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
          editingNoteId={editingNoteId}
          setEditingNoteId={setEditingNoteId}
        />
      ))}
    </div>
  );
};

export default NoteList;