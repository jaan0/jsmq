import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ContactMessage, InsertContactMessage } from '@shared/schema';

const API_BASE = '/api';

export function useContactMessages() {
    return useQuery<ContactMessage[]>({
        queryKey: ['contactMessages'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/contact-messages`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            return response.json();
        },
    });
}

export function useCreateContactMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: InsertContactMessage) => {
            const response = await fetch(`${API_BASE}/contact-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to send message');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
        },
    });
}

export function useMarkMessageAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_BASE}/contact-messages/${id}/read`, {
                method: 'PATCH',
            });
            if (!response.ok) throw new Error('Failed to mark message as read');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
        },
    });
}
