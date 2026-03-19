'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authApi } from '../services/api';

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const links = [
    { name: 'Active Tasks', href: '/', icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { name: 'Completed', href: '/completed', icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#fbfbfa] border-r border-[#efefee] z-50 flex flex-col selection:bg-indigo-100">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-12">
           <div className="w-8 h-8 rounded-lg bg-[#0a0a0b] flex items-center justify-center">
              <span className="text-white font-black text-[10px] italic tracking-tighter">bb</span>
           </div>
           <div className="flex flex-col -space-y-1">
              <span className="font-black text-xs tracking-tight text-[#0a0a0b] italic leading-none">Bread & Butter</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Manage everyday tasks</span>
           </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === link.href
                  ? 'bg-zinc-100 text-[#0a0a0b] shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              <span className={pathname === link.href ? 'text-indigo-600' : 'text-zinc-400'}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-8 border-t border-[#efefee] bg-white">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-black text-[#0a0a0b] truncate uppercase tracking-tight">{user?.name || 'Partner'}</span>
          <button 
            onClick={() => authApi.logout()} 
            className="text-[9px] text-left font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-rose-500 transition-colors"
          >
            Sign Out / Exit
          </button>
        </div>
      </div>
    </aside>
  );
}
