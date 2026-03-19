'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { SearchProvider, useSearch } from '../../services/search-context';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { setSearchQuery, setIsModalOpen } = useSearch();

  return (
    <div className="flex h-screen bg-[#f7f7f5] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Navbar onSearch={(v) => setSearchQuery(v)} onAddTask={() => setIsModalOpen(true)} />
        <main className="mt-16 flex-1 overflow-y-auto px-8 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/auth/login');
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f7f7f5]">
        <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SearchProvider>
      <DashboardContent>{children}</DashboardContent>
    </SearchProvider>
  );
}
