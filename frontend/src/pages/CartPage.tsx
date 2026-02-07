import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../features/cart/context/CartContext';
import { Button } from '../components/ui/Button';
import styles from './CartPage.module.css';

export const CartPage = () => {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2 className={styles.emptyTitle}>Your cart is empty</h2>
                <p className={styles.emptyText}>
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/">
                    <Button variant="primary">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shopping Cart</h1>

            <div className={styles.content}>
                {/* Cart Items */}
                <div className={styles.cartItems}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImageContainer}>
                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                            </div>

                            <div className={styles.itemDetails}>
                                <div className={styles.itemHeader}>
                                    <h3 className={styles.itemName}>
                                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className={styles.itemCategory}>{item.category}</p>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControls}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className={styles.qtyBtn}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className={styles.qtyBtn}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className={styles.removeBtn}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>

                    <div className={styles.summaryRows}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.totalRow}>
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
