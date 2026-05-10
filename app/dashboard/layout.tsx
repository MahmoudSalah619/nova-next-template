import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      {/* Sidebar and Navbar would go here */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
