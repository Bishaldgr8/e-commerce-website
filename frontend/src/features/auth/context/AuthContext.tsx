import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { toast } from 'sonner';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
    register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth context implementation

import { apiClient } from '../../../api/client';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            // Verify token on load
            apiClient.get('/auth/me')
                .then(res => {
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                })
                .catch(() => {
                    logout();
                });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await apiClient.post('/auth/login', { email, password });
            const { token, user: userData } = res.data;

            setUser(userData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success(`Welcome back, ${userData.name}!`);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw new Error(message);
        }
    };

    const register = async (name: string, email: string, password: string, role: UserRole) => {
        try {
            const res = await apiClient.post('/auth/register', { name, email, password, role });
            const { token, user: userData } = res.data;

            setUser(userData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success('Account created successfully!');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw new Error(message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
