'use client';

import { useState } from 'react';
import { Task, taskApi } from '../services/api';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onClick: (task: Task) => void;
}

export default function TaskCard({ task, onUpdate, onClick }: TaskCardProps) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await taskApi.toggleTask(task.id);
      onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const priorityConfig = {
    LOW:    { label: 'Low',    className: 'bg-zinc-100 text-zinc-500' },
    MEDIUM: { label: 'Medium', className: 'bg-indigo-50 text-indigo-600' },
    HIGH:   { label: 'High',   className: 'bg-rose-50 text-rose-600' },
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      onClick={() => onClick(task)}
      className="group bg-white border border-zinc-100 p-5 rounded-2xl transition-all hover:shadow-md hover:border-zinc-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${priority.className}`}>
          {priority.label}
        </span>
        <div className="relative group/tooltip">
          <button
            onClick={handleStatusChange}
            disabled={loading}
            aria-label={task.status === 'COMPLETED' ? 'Mark as incomplete' : 'Mark as complete'}
            className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center flex-shrink-0 ${
              task.status === 'COMPLETED'
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 text-transparent'
            }`}
          >
            {loading ? (
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span className="absolute -top-10 right-0 invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-all bg-[#0a0a0b] text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-xl whitespace-nowrap shadow-2xl translate-y-2 group-hover/tooltip:translate-y-0 pointer-events-none z-10">
            {task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
          </span>
        </div>
      </div>

      <h3 className={`text-sm font-semibold leading-snug mb-2 transition-colors ${task.status === 'COMPLETED' ? 'text-zinc-400 line-through' : 'text-[#0a0a0b] group-hover:text-indigo-600'}`}>
        {task.title}
      </h3>
      {task.description && (
        <p className="text-zinc-400 text-xs font-medium line-clamp-2 leading-relaxed mb-4">
          {task.description}
        </p>
      )}

      {task.deadline && (
        <footer className="pt-4 border-t border-zinc-50 flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </footer>
      )}
    </div>
  );
}
