import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Order, InsertOrder, UpdateOrderStatus } from '@shared/schema';

const API_BASE = '/api';

export function useOrders() {
    return useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/orders`);
            if (!response.ok) throw new Error('Failed to fetch orders');
            return response.json();
        },
    });
}

export function useOrder(id: string) {
    return useQuery<Order>({
        queryKey: ['orders', id],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/orders/${id}`);
            if (!response.ok) throw new Error('Failed to fetch order');
            return response.json();
        },
        enabled: !!id,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: InsertOrder & { serviceIcon?: string }) => {
            const response = await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create order');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: UpdateOrderStatus }) => {
            const response = await fetch(`${API_BASE}/orders/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(status),
            });
            if (!response.ok) throw new Error('Failed to update order status');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
