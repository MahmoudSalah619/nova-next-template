import React from 'react';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Sign in</h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Welcome back to Nova Template
          </p>
        </div>
        
        <form className="mt-10 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              fullWidth
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              fullWidth
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-zinc-900 hover:text-zinc-700 dark:text-zinc-100">
                Forgot password?
              </a>
            </div>
          </div>

          <button className="w-full py-4 px-4 bg-zinc-900 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transform transition-all active:scale-[0.98] shadow-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Sign in
          </button>
        </form>
        
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
