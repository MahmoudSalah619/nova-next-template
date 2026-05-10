import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Dashboard cards would go here */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Projects</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
