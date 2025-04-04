import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { addTask } from '../store/taskSlice';
import { Priority, Category } from '../types/task';
import { RootState } from '../store/store';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    }));

    setTitle('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 p-6 rounded-lg shadow-sm ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="groceries">Groceries</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />

        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;