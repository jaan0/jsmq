import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Service, InsertService } from '@shared/schema.ts';

const API_BASE = '/api';

export function useServices() {
    return useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/services`);
            if (!response.ok) throw new Error('Failed to fetch services');
            return response.json();
        },
    });
}

export function useService(id: string) {
    return useQuery<Service>({
        queryKey: ['services', id],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/services/${id}`);
            if (!response.ok) throw new Error('Failed to fetch service');
            return response.json();
        },
        enabled: !!id,
    });
}

export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: InsertService) => {
            const response = await fetch(`${API_BASE}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create service');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}

export function useUpdateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<InsertService> }) => {
            const response = await fetch(`${API_BASE}/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update service');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}

export function useDeleteService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_BASE}/services/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete service');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}
