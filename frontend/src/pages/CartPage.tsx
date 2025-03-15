import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../features/cart/context/CartContext';
import { Button } from '../components/ui/Button';

export const CartPage = () => {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--color-slate-500)', marginBottom: '2rem' }}>
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/">
                    <Button variant="primary">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Shopping Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                gap: '1.5rem',
                                padding: '1.5rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius)',
                                backgroundColor: 'white'
                            }}
                        >
                            <div style={{ width: '100px', height: '100px', flexShrink: 0, backgroundColor: 'var(--color-slate-100)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontWeight: 500 }}>
                                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem' }}>{item.category}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '0.25rem' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ padding: '0.25rem', display: 'flex', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span style={{ minWidth: '2rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 500 }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ padding: '0.25rem', display: 'flex', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem' }}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div style={{ backgroundColor: 'var(--color-slate-50)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-600)' }}>
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-600)' }}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.5rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.125rem' }}>
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link to="/checkout" style={{ display: 'block' }}>
                        <Button size="lg" style={{ width: '100%', justifyContent: 'space-between' }}>
                            Checkout <ArrowRight size={20} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
