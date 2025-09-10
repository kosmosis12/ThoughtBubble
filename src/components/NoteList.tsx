import React from 'react';
import NoteItem from './NoteItem';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  onToggleComplete: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, newContent: string) => void;
  editingNoteId: string | null;
  setEditingNoteId: (id: string | null) => void;
  onOpenReminderModal: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onToggleComplete,
  onDeleteNote,
  onUpdateNote,
  editingNoteId,
  setEditingNoteId,
  onOpenReminderModal,
}) => {
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
          onOpenReminderModal={onOpenReminderModal}
        />
      ))}
    </div>
  );
};

export default NoteList;
