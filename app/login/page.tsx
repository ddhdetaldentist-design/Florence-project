'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        router.push(redirectTo);
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
        setLoading(false);
      }
    } else {
      // In local mode without Supabase keys, permit instant demo login
      router.push(redirectTo);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-[#181822] p-8 rounded-3xl border border-zinc-800 shadow-2xl relative">
      {/* Brand Logo */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block relative h-16 w-48 mx-auto">
          <Image
            src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
            alt="Florence Kitchen"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          تسجيل دخول لوحة التحكم
        </h2>
        <p className="text-xs text-zinc-400">
          أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى إدارة المنتجات
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@florence.com"
              className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-sm rounded-xl py-3 pr-10 pl-4 outline-none transition-all placeholder:text-zinc-600"
            />
            <Mail className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-sm rounded-xl py-3 pr-10 pl-4 outline-none transition-all placeholder:text-zinc-600"
            />
            <Lock className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-zinc-950 font-bold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-800 text-center">
        <Link
          href="/"
          className="text-xs text-zinc-400 hover:text-primary transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>الرجوع إلى الموقع الرئيسي</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e12] px-4 py-12">
      <Suspense fallback={<div className="text-zinc-500 text-xs">جاري التحميل...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
