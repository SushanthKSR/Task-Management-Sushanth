import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { store } from './store/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { CheckCircle, Sun, Moon } from 'lucide-react';
import { RootState } from './store/store';
import { toggleTheme } from './store/themeSlice';

function TaskApp() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkDueDates = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
          const dueDate = new Date(task.dueDate);
          const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
          
          if (diffHours <= 24 && diffHours > 0) {
            toast.custom((t) => (
              <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-yellow-500 text-white px-6 py-4 shadow-lg rounded-lg`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6" />
                  <p>Task "{task.title}" is due in less than 24 hours!</p>
                </div>
              </div>
            ));
          }
        }
      });
    };

    const interval = setInterval(checkDueDates, 1000 * 60 * 60);
    checkDueDates();

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        <header className="text-center relative">
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`absolute right-0 top-0 p-2 rounded-full ${
              isDark ? 'bg-gray-800 text-yellow-500' : 'bg-yellow-100 text-yellow-600'
            } hover:scale-110 transition-transform`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <h1 className="text-4xl font-bold">Task Manager</h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Organize your tasks efficiently
          </p>
        </header>

        <TaskForm />
        <TaskFilters />
        <TaskList />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TaskApp />
    </Provider>
  );
}

export default App;