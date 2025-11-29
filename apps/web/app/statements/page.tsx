'use client';

import { useState } from 'react';
import { useStatements, useUploadStatement } from '@/lib/api';

export default function Statements() {
  const [file, setFile] = useState<File | null>(null);
  const { data: statements, isLoading } = useStatements();
  const uploadMutation = useUploadStatement();

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadMutation.mutateAsync(file);
      setFile(null);
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Statement Management</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-bold mb-4">Upload New Statement</h2>
        <div className="flex gap-4">
          <input 
            type="file" 
            className="border p-2 rounded"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button 
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload & Parse'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Recent Statements</h2>
        {isLoading ? (
          <div>Loading statements...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2">File Name</th>
                <th className="pb-2">Custodian</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {statements?.map((stmt: any) => (
                <tr key={stmt.id} className="border-b">
                  <td className="py-2">{stmt.fileName || 'Unknown'}</td>
                  <td>{stmt.custodian || 'Unknown'}</td>
                  <td>
                    <span className={stmt.status === 'PROCESSED' ? 'text-green-600' : 'text-yellow-600'}>
                      {stmt.status}
                    </span>
                  </td>
                  <td><button className="text-blue-600">Review</button></td>
                </tr>
              ))}
              {(!statements || statements.length === 0) && (
                <tr><td colSpan={4} className="py-4 text-center text-gray-500">No statements found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
