'use client';

import { useDashboardStats } from '@/lib/api';

export default function AdminDashboard() {
    const { data: stats, isLoading, error } = useDashboardStats();

    if (isLoading) return <div className="p-8">Loading dashboard...</div>;
    if (error) return <div className="p-8 text-red-600">Error loading dashboard</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">
                <h1 className="text-xl font-bold mb-8">Admin Console</h1>
                <nav className="space-y-4">
                    <a href="/admin/dashboard" className="block text-blue-400">Dashboard</a>
                    <a href="/admin/custodians" className="block hover:text-gray-300">Custodians</a>
                    <a href="/admin/fees" className="block hover:text-gray-300">Fee Schedules</a>
                    <a href="/statements" className="block hover:text-gray-300">Statements</a>
                    <a href="/invoices" className="block hover:text-gray-300">Invoices</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Total AUM</h3>
                        <p className="text-3xl font-bold">{stats?.totalAum || '$0.00'}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Pending Invoices</h3>
                        <p className="text-3xl font-bold">{stats?.pendingInvoices || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Active Clients</h3>
                        <p className="text-3xl font-bold">{stats?.activeClients || 0}</p>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <ul className="space-y-2">
                        {stats?.recentActivity?.map((activity: any, i: number) => (
                            <li key={i} className="flex justify-between border-b pb-2">
                                <span>{activity.description}</span>
                                <span className="text-gray-500 text-sm">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
