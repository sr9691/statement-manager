import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetcher(path: string) {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, { headers });
    if (!res.ok) {
        if (res.status === 401) {
            window.location.href = '/login';
        }
        throw new Error('Network response was not ok');
    }
    return res.json();
}

export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => fetcher('/dashboard/stats')
    });
}

export function useStatements() {
    return useQuery({
        queryKey: ['statements'],
        queryFn: () => fetcher('/statements')
    });
}

export function useUploadStatement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem('token');
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API_URL}/statements/upload`, {
                method: 'POST',
                body: formData,
                headers
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statements'] });
        }
    });
}
