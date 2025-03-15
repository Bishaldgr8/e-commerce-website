import { useState, useEffect } from 'react';
import { User as UserIcon, Shield, Store, UserCircle } from 'lucide-react';
import { apiClient } from '../../api/client';

export const AdminCustomersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await apiClient.get('/auth/users');
                setUsers(res.data.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <Shield size={16} style={{ color: '#ef4444' }} />;
            case 'seller': return <Store size={16} style={{ color: '#0ea5e9' }} />;
            default: return <UserCircle size={16} style={{ color: 'var(--color-slate-400)' }} />;
        }
    };

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>User Management</h1>
                <p style={{ color: 'var(--color-slate-500)' }}>Monitor all registered users, sellers, and admins.</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--color-slate-50)' }}>
                        <tr>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>User</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Email</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Role</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u._id}>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <UserIcon size={16} style={{ color: 'var(--color-slate-400)' }} />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{u.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{u.email}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {getRoleIcon(u.role)}
                                        <span style={{ textTransform: 'capitalize' }}>{u.role}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-slate-400)', fontFamily: 'monospace' }}>
                                    {u._id}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
