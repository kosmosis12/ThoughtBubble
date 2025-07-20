import React, { useState } from 'react';
import { X } from 'lucide-react';

const ReminderModal = ({ note, onSetReminder, onClose }) => {
  const [customMinutes, setCustomMinutes] = useState('');

  if (!note) return null;

  const handleSetCustom = () => {
    const minutes = parseInt(customMinutes, 10);
    if (minutes > 0) {
      onSetReminder(note.id, minutes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Set Reminder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">For: "{note.content}"</p>

        <div className="space-y-2">
          {[
            { label: 'In 20 minutes', minutes: 20 },
            { label: 'In 1 hour', minutes: 60 },
            { label: 'In 3 hours', minutes: 180 },
            { label: 'Tomorrow', minutes: 1440 },
            { label: 'Next week', minutes: 10080 },
          ].map(({ label, minutes }) => (
            <button
              key={label}
              onClick={() => onSetReminder(note.id, minutes)}
              className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              {label}
            </button>
          ))}
          
          <div className="pt-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                placeholder="Or custom minutes..."
                className="flex-grow px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSetCustom} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold transition-colors">
                Set Custom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;