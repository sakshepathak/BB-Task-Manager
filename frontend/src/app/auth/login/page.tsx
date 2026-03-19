'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authApi.login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f7f5] p-6">
      <div className="w-full max-w-sm space-y-10">
        <header className="text-center space-y-4">
          <div className="w-11 h-11 rounded-xl bg-[#0a0a0b] mx-auto flex items-center justify-center">
            <span className="text-white font-black text-[11px] italic tracking-tighter">bb</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#0a0a0b] tracking-tight leading-none mb-2">
              Welcome back
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Sign in to your Bread & Butter workspace.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold text-center animate-in slide-in-from-top-2 duration-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 pl-0.5">Email</label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 bg-white border border-[#efefee] rounded-xl px-4 text-sm font-medium text-[#0a0a0b] focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all outline-none placeholder:text-zinc-300"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pl-0.5">
                <label className="text-xs font-semibold text-zinc-500">Password</label>
                <Link href="/auth/reset" className="text-[10px] font-bold text-zinc-400 hover:text-[#0a0a0b] transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 bg-white border border-[#efefee] rounded-xl px-4 text-sm font-medium text-[#0a0a0b] focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all outline-none placeholder:text-zinc-300"
              />
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#0a0a0b] text-white rounded-xl text-sm font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <footer className="text-center pt-6 border-t border-zinc-200">
          <p className="text-zinc-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#0a0a0b] font-semibold underline underline-offset-4 hover:text-indigo-600 transition-colors">
              Create one
            </Link>
          </p>
          <div className="mt-4">
            <button 
              onClick={() => {
                localStorage.setItem('accessToken', 'guest-mode-token');
                localStorage.setItem('user', JSON.stringify({ name: 'Guest User', email: 'guest@example.com' }));
                router.push('/');
              }}
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 transition-colors uppercase tracking-widest"
            >
              Skip for now →
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
