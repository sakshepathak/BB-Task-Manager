'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  onSearch: (value: string) => void;
  onAddTask: () => void;
}

export default function Navbar({ onSearch, onAddTask }: NavbarProps) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, onSearch]);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-[#efefee] z-40 px-10 flex items-center justify-between shadow-sm">
      <div className="relative group w-96">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none group-focus-within:text-[#0a0a0b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-11 pl-11 pr-5 bg-zinc-50 border border-zinc-100 rounded-2xl text-[13px] font-bold text-[#0a0a0b] focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all outline-none placeholder:text-zinc-200 placeholder:italic tracking-tight selection:bg-indigo-100"
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onAddTask}
          className="flex items-center gap-2.5 px-6 py-2.5 bg-[#0a0a0b] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-zinc-200 hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>
    </header>
  );
}
