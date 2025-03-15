import { useState, useEffect } from 'react';
import { Package, MapPin, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { apiClient } from '../api/client';

export const AccountPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await apiClient.get('/orders/my');
                setOrders(res.data.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>My Account</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button variant="ghost" style={{ justifyContent: 'flex-start' }} className="active-nav">
                        <Package size={20} style={{ marginRight: '0.75rem' }} /> Orders
                    </Button>
                    <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                        <MapPin size={20} style={{ marginRight: '0.75rem' }} /> Addresses
                    </Button>
                    <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                        <CreditCard size={20} style={{ marginRight: '0.75rem' }} /> Payment Methods
                    </Button>
                </div>

                {/* Content */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order History</h2>

                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading your orders...</div>
                    ) : orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-slate-500)' }}>
                            No orders yet. Start shopping!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {orders.map((order: any) => (
                                <div key={order._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Order {order._id.slice(-8)}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-slate-500)' }}>
                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 600 }}>${order.totalPrice.toFixed(2)}</div>
                                            <div style={{ fontSize: '0.875rem', color: order.status === 'delivered' ? '#16a34a' : '#f59e0b' }}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {order.items.map((item: any, index: number) => (
                                            <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius)', overflow: 'hidden', backgroundColor: 'var(--color-slate-100)' }}>
                                                    {/* Placeholder for product image */}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-slate-500)' }}>Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
