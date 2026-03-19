'use client';

import { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus, taskApi } from '../services/api';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function TaskModal({ task, isOpen, onClose, onUpdate }: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'PENDING'
  });
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    } else {
      setEditedTask({ title: '', description: '', priority: 'MEDIUM', status: 'PENDING' });
    }
    setTitleError('');
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!editedTask.title?.trim()) {
      setTitleError('Task title is required.');
      return;
    }
    setLoading(true);
    try {
      if (task) {
        await taskApi.updateTask(task.id, editedTask);
      } else {
        await taskApi.createTask(editedTask);
      }
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    setLoading(true);
    try {
      await taskApi.deleteTask(task.id);
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-end bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-white border-l border-[#efefee] shadow-2xl animate-in slide-in-from-right-8 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <header className="p-10 flex items-center justify-end border-b border-[#efefee] pb-4">
            <button
              id="modal-close"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <section className="p-10 space-y-8 flex-1 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Title</label>
              <input
                id="modal-title"
                type="text"
                value={editedTask.title || ''}
                onChange={(e) => { setEditedTask({ ...editedTask, title: e.target.value }); setTitleError(''); }}
                className="w-full text-3xl font-black text-[#0a0a0b] bg-transparent border-none focus:ring-0 px-0 placeholder:text-zinc-200 outline-none"
                placeholder="Untitled"
              />
              {titleError && <p className="text-xs text-rose-500 font-medium">{titleError}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-[#efefee]">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500">Priority</label>
                <select
                  id="modal-priority"
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as TaskPriority })}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-bold px-3 py-2.5 outline-none focus:ring-4 focus:ring-zinc-100 transition-all cursor-pointer text-[#0a0a0b]"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500">Status</label>
                <select
                  id="modal-status"
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as TaskStatus })}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-bold px-3 py-2.5 outline-none focus:ring-4 focus:ring-zinc-100 transition-all cursor-pointer text-[#0a0a0b]"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Deadline</label>
              <input
                id="modal-deadline"
                type="date"
                value={editedTask.deadline ? new Date(editedTask.deadline).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-bold px-3 py-2.5 outline-none focus:ring-4 focus:ring-zinc-100 transition-all text-[#0a0a0b]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Description</label>
              <textarea
                id="modal-description"
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full h-80 text-sm text-[#0a0a0b] bg-transparent border-none focus:ring-0 p-0 placeholder:text-zinc-300 leading-relaxed font-medium resize-none outline-none"
                placeholder="Empty"
              />
            </div>
          </section>

          <footer className="p-10 border-t border-[#efefee] flex items-center justify-between bg-white">
            <button
              id="modal-save"
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 bg-[#0a0a0b] text-white rounded-xl text-sm font-black uppercase tracking-[0.1em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-zinc-300 disabled:cursor-not-allowed shadow-xl shadow-zinc-200"
            >
              {loading ? 'Working...' : (task ? 'Update' : 'Create')}
            </button>
            {task && (
              <button
                id="modal-delete"
                onClick={handleDelete}
                disabled={loading}
                className="text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-rose-500 transition-colors"
              >
                Delete
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
