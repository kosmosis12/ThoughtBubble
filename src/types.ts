export interface Note {
  id: string;
  type: string;
  content: string;
  category: string;
  reminder: string | null;
  reminderTimestamp: number | null;
  completed: boolean;
  timestamp: string;
}

export interface Category {
  name: string;
  type: string;
  icon: 'CheckSquare' | 'Lightbulb' | 'FileText';
  color: string;
}
