'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../services/api';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await authApi.resetPassword(email, newPassword);
      setSuccess(data.message || 'Password reset successful!');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f7f5] p-6">
      <div className="w-full max-w-sm space-y-10 animate-in fade-in duration-300">
        <header className="text-center space-y-4">
          <div className="w-11 h-11 rounded-xl bg-[#0a0a0b] mx-auto flex items-center justify-center">
            <span className="text-white font-black text-[11px] italic tracking-tighter">bb</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#0a0a0b] tracking-tight leading-none mb-2">
              Reset password
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Enter your email and a new password below.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold text-center animate-in slide-in-from-top-2 duration-200">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold text-center animate-in slide-in-from-top-2 duration-200">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 pl-0.5">Account email</label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 bg-white border border-[#efefee] rounded-xl px-4 text-sm font-medium text-[#0a0a0b] focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all outline-none placeholder:text-zinc-300"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 pl-0.5">New password</label>
              <input
                id="reset-password"
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 bg-white border border-[#efefee] rounded-xl px-4 text-sm font-medium text-[#0a0a0b] focus:ring-2 focus:ring-zinc-200 focus:border-zinc-300 transition-all outline-none placeholder:text-zinc-300"
              />
            </div>
          </div>

          <button
            id="reset-submit"
            type="submit"
            disabled={loading || !!success}
            className="w-full h-12 bg-[#0a0a0b] text-white rounded-xl text-sm font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Reset password'}
          </button>
        </form>

        <footer className="text-center pt-6 border-t border-zinc-200">
          <p className="text-zinc-400 text-sm">
            Remembered your password?{' '}
            <Link href="/auth/login" className="text-[#0a0a0b] font-semibold underline underline-offset-4 hover:text-indigo-600 transition-colors">
              Sign in
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
