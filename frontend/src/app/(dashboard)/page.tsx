'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Task, taskApi } from '../../services/api';
import TaskList from '../../components/TaskList';
import TaskModal from '../../components/TaskModal';
import { useSearch } from '../../services/search-context';

export default function ActiveTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { searchQuery, isModalOpen, setIsModalOpen } = useSearch();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks.filter(t => t.status !== 'COMPLETED'));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-8 animate-in fade-in duration-300">
      <header className="border-b border-[#efefee] pb-8">
        <h1 className="text-2xl font-black text-[#0a0a0b] tracking-tight mb-1">My Tasks</h1>
        <p className="text-zinc-500 text-sm font-medium">
          {filteredTasks.length} active {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </p>
      </header>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="min-h-[400px]">
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onUpdate={fetchTasks}
          onTaskClick={handleTaskClick}
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdate={fetchTasks}
      />
    </div>
  );
}
