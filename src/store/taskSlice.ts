import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Priority, Category } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: {
    status: 'all' | 'completed' | 'incomplete';
    category: Category | 'all';
    search: string;
  };
}

const initialState: TaskState = {
  tasks: [],
  filter: {
    status: 'all',
    category: 'all',
    search: '',
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    updateTaskCategory: (state, action: PayloadAction<{ id: string; category: Category }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.category = action.payload.category;
      }
    },
    updateTaskDueDate: (state, action: PayloadAction<{ id: string; dueDate: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.dueDate = action.payload.dueDate;
      }
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<TaskState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleTask,
  updateTaskPriority,
  updateTaskCategory,
  updateTaskDueDate,
  reorderTasks,
  setFilter,
} = taskSlice.actions;

export default taskSlice.reducer;