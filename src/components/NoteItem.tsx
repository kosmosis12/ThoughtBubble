import React, { useState } from 'react';
import { Clock, CheckSquare, Lightbulb, FileText, Trash2, Pencil } from 'lucide-react';
import { categories } from '../config';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
  onToggleComplete: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, newContent: string) => void;
  editingNoteId: string | null;
  setEditingNoteId: (id: string | null) => void;
  onOpenReminderModal: (note: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onToggleComplete,
  onDeleteNote,
  onUpdateNote,
  editingNoteId,
  setEditingNoteId,
  onOpenReminderModal,
}) => {
  const [editedContent, setEditedContent] = useState(note.content);

  const isEditing = editingNoteId === note.id;

  const categoryDetails = categories.find((c) => c.name === note.category);
  const CategoryIcon = categoryDetails
    ? { CheckSquare, Lightbulb, FileText }[
        categoryDetails.icon as 'CheckSquare' | 'Lightbulb' | 'FileText'
      ]
    : FileText;

  const handleSave = () => {
    if (editedContent.trim()) {
      onUpdateNote(note.id, editedContent);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-gray-700 rounded-lg p-4 ring-2 ring-blue-500">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full bg-transparent resize-none focus:outline-none text-gray-200"
          rows={3}
          autoFocus
        />
        <div className="flex items-center justify-end space-x-2 mt-2">
          <button
            onClick={() => setEditingNoteId(null)}
            className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 group hover:bg-gray-700 transition-colors">
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggleComplete(note.id)}
          role="checkbox"
          aria-checked={note.completed}
          aria-label={`Mark note as ${note.completed ? 'incomplete' : 'complete'}`}
          className={`mt-1 flex-shrink-0 transition-opacity ${
            note.completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
              note.completed
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-600 hover:border-gray-500'
            } transition-colors`}
          >
            {note.completed ? (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            )}
          </div>
        </button>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <CategoryIcon size={14} className={categoryDetails?.color || 'text-gray-400'} />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {note.category}
            </span>
            {note.reminder && (
              <>
                <Clock size={12} className="text-yellow-500" />
                <span className="text-xs text-yellow-500">{note.reminder}</span>
              </>
            )}
          </div>

          <p className={note.completed ? 'line-through text-gray-500' : 'text-gray-300'}>
            {note.content}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {new Date(note.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onOpenReminderModal(note)}
            className="text-gray-600 hover:text-yellow-400"
            aria-label="Set reminder"
          >
            <Clock size={16} />
          </button>
          <button
            onClick={() => setEditingNoteId(note.id)}
            className="text-gray-600 hover:text-blue-400"
            aria-label="Edit note"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDeleteNote(note.id)}
            className="text-gray-600 hover:text-red-500"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
