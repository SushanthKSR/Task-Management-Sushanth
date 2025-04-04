export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'groceries' | 'other';
export type TaskStatus = 'all' | 'completed' | 'incomplete';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
}