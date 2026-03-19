'use client';

import { Task } from '../services/api';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
  onTaskClick: (task: Task) => void;
  loading: boolean;
}

export default function TaskList({ tasks, onUpdate, onTaskClick, loading }: TaskListProps) {
  const columns = [
    { id: 'PENDING', name: 'Pending', dotColor: 'bg-zinc-300' },
    { id: 'IN_PROGRESS', name: 'In Progress', dotColor: 'bg-indigo-500' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-3 w-24 bg-zinc-100 rounded-full" />
            <div className="h-48 bg-zinc-50 rounded-2xl border border-zinc-100" />
            <div className="h-48 bg-zinc-50 rounded-2xl border border-zinc-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-20">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div key={column.id} className="space-y-4">
            <header className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                <h2 className="text-sm font-semibold text-zinc-600">{column.name}</h2>
              </div>
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-xs font-semibold">
                {columnTasks.length}
              </span>
            </header>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                  onClick={onTaskClick}
                />
              ))}

              {columnTasks.length === 0 && (
                <div className="py-16 border-2 border-dashed border-zinc-100 rounded-2xl flex flex-col items-center justify-center text-center">
                  <p className="text-zinc-300 text-sm font-medium">No tasks here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
