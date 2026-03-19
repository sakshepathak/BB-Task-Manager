'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Task, taskApi } from '../../../services/api';
import TaskCard from '../../../components/TaskCard';
import TaskModal from '../../../components/TaskModal';
import { useSearch } from '../../../services/search-context';

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { searchQuery, isModalOpen, setIsModalOpen } = useSearch();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks.filter((t: Task) => t.status === 'COMPLETED'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter((t: Task) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-8 pb-40 animate-in fade-in duration-300">
      <header className="border-b border-[#efefee] pb-8">
        <h1 className="text-2xl font-black text-[#0a0a0b] tracking-tight mb-1">Completed</h1>
        <p className="text-zinc-500 text-sm font-medium">
          {filteredTasks.length} completed {filteredTasks.length === 1 ? 'task' : 'tasks'}. You can mark them incomplete or delete them permanently.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-52 bg-zinc-50 rounded-2xl border border-zinc-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={fetchTasks}
              onClick={(t: Task) => { setSelectedTask(t); setIsModalOpen(true); }}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="col-span-full py-32 border-2 border-dashed border-zinc-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <svg className="w-8 h-8 text-zinc-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-zinc-400 text-sm font-medium">No completed tasks yet</p>
              <p className="text-zinc-300 text-xs mt-1">Tasks you mark as done will appear here.</p>
            </div>
          )}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => { setIsModalOpen(false); setSelectedTask(null); }}
        onUpdate={fetchTasks}
      />
    </div>
  );
}
