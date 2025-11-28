import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useAdminAuth() {
    const [, setLocation] = useLocation();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
        if (!isLoggedIn) {
            setLocation('/aj-admin/login');
        }
    }, [setLocation]);
}

export function logout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '/aj-admin/login';
}
