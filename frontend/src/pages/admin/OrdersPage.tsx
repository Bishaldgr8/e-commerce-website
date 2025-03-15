import { useState, useEffect } from 'react';
import { Eye, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

export const OrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await apiClient.get('/orders/all');
                setOrders(res.data.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'var(--color-slate-900)';
            case 'processing': return '#3b82f6';
            case 'shipped': return '#f59e0b';
            default: return 'var(--color-slate-500)';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle size={14} />;
            case 'processing': return <Clock size={14} />;
            case 'shipped': return <Truck size={14} />;
            default: return <Clock size={14} />;
        }
    };

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>Orders</h1>
                <Button variant="outline">Export CSV</Button>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                    <thead style={{ backgroundColor: 'var(--color-slate-50)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Order ID</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Customer</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Date</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Total</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: any) => (
                            <tr key={order._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{order._id.slice(-8)}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div>{order.userId?.name || 'Unknown'}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)' }}>{order.userId?.email || 'N/A'}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        backgroundColor: 'var(--color-slate-100)',
                                        color: getStatusColor(order.status)
                                    }}>
                                        {getStatusIcon(order.status)}
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>${order.totalPrice.toFixed(2)}</td>
                                <td style={{ padding: '1rem' }}>
                                    <Button variant="ghost" size="sm">
                                        <Eye size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
