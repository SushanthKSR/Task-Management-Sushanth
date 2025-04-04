import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { reorderTasks } from '../store/taskSlice';

const TaskList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter.status === 'all' 
      ? true 
      : filter.status === 'completed' 
        ? task.completed 
        : !task.completed;
    
    const matchesCategory = filter.category === 'all' || task.category === filter.category;
    const matchesSearch = task.title.toLowerCase().includes(filter.search.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex(task => task.id === active.id);
      const newIndex = filteredTasks.findIndex(task => task.id === over.id);
      
      const newTasks = [...tasks];
      const [movedTask] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedTask);
      
      dispatch(reorderTasks(newTasks));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;