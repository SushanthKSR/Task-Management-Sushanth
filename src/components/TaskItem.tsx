import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { Check, Trash2, GripVertical } from 'lucide-react';
import { Task, Priority, Category } from '../types/task';
import { toggleTask, removeTask, updateTaskPriority, updateTaskCategory } from '../store/taskSlice';
import { RootState } from '../store/store';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 rounded-lg shadow-sm transition-colors ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className={`cursor-grab hover:text-yellow-500 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        <GripVertical size={20} />
      </button>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        className="h-5 w-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
      />

      <div className="flex-1">
        <h3 className={`text-lg ${
          task.completed 
            ? 'line-through text-gray-500' 
            : isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        
        <div className="flex gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          
          <span className={`px-2 py-1 rounded-full text-sm ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            {task.category}
          </span>

          {task.dueDate && (
            <span className="px-2 py-1 bg-blue-100 rounded-full text-sm text-blue-800">
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>

      <select
        value={task.priority}
        onChange={(e) => dispatch(updateTaskPriority({ id: task.id, priority: e.target.value as Priority }))}
        className={`px-2 py-1 rounded border ${
          isDark 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={task.category}
        onChange={(e) => dispatch(updateTaskCategory({ id: task.id, category: e.target.value as Category }))}
        className={`px-2 py-1 rounded border ${
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

      <button
        onClick={() => dispatch(removeTask(task.id))}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default TaskItem;