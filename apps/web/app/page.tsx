export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-4">Broker Billing App</h1>
            <p className="text-lg text-gray-600">Enterprise Grade Billing Solution</p>
            <div className="mt-8 flex gap-4">
                <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</a>
                <a href="/admin/dashboard" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Admin Dashboard</a>
            </div>
        </main>
    );
}
