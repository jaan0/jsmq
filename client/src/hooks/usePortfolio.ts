import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { PortfolioProject, InsertPortfolioProject } from '@shared/schema';

const API_BASE = '/api';

export function usePortfolio() {
    return useQuery<PortfolioProject[]>({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/portfolio`);
            if (!response.ok) throw new Error('Failed to fetch portfolio');
            return response.json();
        },
    });
}

export function usePortfolioProject(id: string) {
    return useQuery<PortfolioProject>({
        queryKey: ['portfolio', id],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/portfolio/${id}`);
            if (!response.ok) throw new Error('Failed to fetch project');
            return response.json();
        },
        enabled: !!id,
    });
}

export function useCreatePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: InsertPortfolioProject) => {
            const response = await fetch(`${API_BASE}/portfolio`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create project');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}

export function useUpdatePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPortfolioProject> }) => {
            const response = await fetch(`${API_BASE}/portfolio/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update project');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}

export function useDeletePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_BASE}/portfolio/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete project');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}
