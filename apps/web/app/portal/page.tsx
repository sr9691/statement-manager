export default function ClientPortal() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Logout</button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Summary */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Account Summary</h3>
                                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Assets</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-gray-900">$1,245,000</dd>
                                    </div>
                                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">YTD Performance</dt>
                                        <dd className="mt-1 text-3xl font-semibold text-green-600">+8.4%</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Recent Documents */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Documents</h3>
                                <ul className="mt-4 space-y-4">
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="ml-2 text-sm text-gray-600">Q3 2023 Invoice.pdf</span>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="ml-2 text-sm text-gray-600">October 2023 Statement.pdf</span>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
