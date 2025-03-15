import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../features/cart/context/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { checkoutSchema, type CheckoutInput } from '../features/checkout/schemas';
import { apiClient } from '../api/client';

export const CheckoutPage = () => {
    const { items, totalPrice, clearCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutInput>({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (data: CheckoutInput) => {
        try {
            await apiClient.post('/orders', {
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice,
                shippingAddress: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    country: data.country
                },
                paymentMethod: 'card' // Simplified
            });

            clearCart();
            setIsSuccess(true);
        } catch (error: any) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please check your details and try again.');
        }
    };

    if (isSuccess) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '50%', color: '#16a34a', marginBottom: '1.5rem' }}>
                    <CheckCircle size={48} />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Order Placed!</h1>
                <p style={{ color: 'var(--color-slate-600)', marginBottom: '2rem' }}>
                    Thank you for your purchase. You will receive an email confirmation shortly.
                </p>
                <Link to="/">
                    <Button size="lg">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Cart is empty</h2>
                <Link to="/">Go to Shop</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem', alignItems: 'start' }}>
                {/* Form */}
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Shipping Address</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="First Name" error={errors.firstName?.message} {...register('firstName')} />
                            <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <Input label="Address" error={errors.address?.message} {...register('address')} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <Input label="City" error={errors.city?.message} {...register('city')} />
                            <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode')} />
                            <Input label="Country" error={errors.country?.message} {...register('country')} />
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Payment Details</h2>
                        <Input label="Card Number" placeholder="0000 0000 0000 0000" error={errors.cardNumber?.message} {...register('cardNumber')} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <Input label="Expiry (MM/YY)" placeholder="MM/YY" error={errors.expiry?.message} {...register('expiry')} />
                            <Input label="CVC" placeholder="123" error={errors.cvc?.message} {...register('cvc')} />
                        </div>
                    </section>
                </form>

                {/* Order Summary */}
                <div style={{ backgroundColor: 'var(--color-slate-50)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span>{item.quantity}x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.5rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        form="checkout-form"
                        size="lg"
                        style={{ width: '100%' }}
                        isLoading={isSubmitting}
                    >
                        Place Order (${totalPrice.toFixed(2)})
                    </Button>
                </div>
            </div>
        </div>
    );
};
