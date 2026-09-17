'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' ? 'Invalid email or password' : authError.message);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
      return;
    } catch (err: any) {
      setError(err.message || 'Error occurred during login');
      setLoading(false);
      return;
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#181822] border border-zinc-800 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="relative h-16 w-44 mx-auto mb-2">
          <Image
            src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
            alt="Florence Kitchen"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-black text-white">
          Admin Console Sign In
        </h1>
        <p className="text-xs text-zinc-400">
          Enter your administrative credentials to access the management dashboard.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-[#121217] border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-primary placeholder:text-zinc-600"
            />
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121217] border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-primary placeholder:text-zinc-600"
            />
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
        >
          {loading ? 'Verifying credentials...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Return to Live Website</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0e0e12] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-zinc-500 text-xs">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
