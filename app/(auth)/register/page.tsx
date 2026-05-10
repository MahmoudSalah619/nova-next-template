import React from 'react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Create Account</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join Nova Template today
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
          </div>
          <button className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg font-semibold hover:bg-zinc-800 transition-colors">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
