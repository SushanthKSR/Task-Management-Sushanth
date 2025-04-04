import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { setFilter } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Category, TaskStatus } from '../types/task';

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className={`space-y-4 p-6 rounded-lg shadow-sm ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            placeholder="Search tasks..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <select
          value={filter.status}
          onChange={(e) => dispatch(setFilter({ status: e.target.value as TaskStatus }))}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => dispatch(setFilter({ category: e.target.value as Category | 'all' }))}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="groceries">Groceries</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;