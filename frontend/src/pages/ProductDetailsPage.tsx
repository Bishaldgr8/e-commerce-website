import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../features/cart/context/CartContext';
import { useCatalog } from '../features/catalog/context/CatalogContext';
import { useAuth } from '../features/auth/context/AuthContext';

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { addItem } = useCart();
    const { getProduct, addReview, isLoading } = useCatalog();
    const { user, isAuthenticated } = useAuth();

    if (isLoading) {
        return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product...</div>;
    }

    const product = getProduct(id || '');
    const [quantity, setQuantity] = useState(1);

    // Review form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    if (!product) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Product not found</h2>
                <Link to="/" style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}>
                    Back to shop
                </Link>
            </div>
        );
    }

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        addReview(product.id, {
            userId: user?.id || 'guest',
            userName: user?.name || 'Guest User',
            rating,
            comment
        });

        setComment('');
        setRating(5);
    };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <Link
                to="/"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-slate-500)',
                    marginBottom: '2rem',
                    fontSize: '0.875rem'
                }}
            >
                <ChevronLeft size={16} /> Back to results
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Image Gallery */}
                <div style={{ backgroundColor: 'var(--color-slate-100)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1' }}
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1 }}>{product.name}</h1>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', color: '#f59e0b' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill={star <= (product.reviews?.reduce((acc, r) => acc + r.rating, 0) || 0) / (product.reviews?.length || 1) ? '#f59e0b' : 'transparent'} />
                            ))}
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-slate-500)' }}>
                            ({product.reviews?.length || 0} reviews)
                        </span>
                    </div>

                    <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-slate-900)' }}>
                        ${product.price.toFixed(2)}
                    </p>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                        <p style={{ lineHeight: 1.6, color: 'var(--color-slate-600)' }}>
                            {product.description}
                        </p>

                        <dl style={{ marginTop: '1.5rem', display: 'grid', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <dt style={{ fontWeight: 500, width: '100px' }}>Category</dt>
                                <dd style={{ color: 'var(--color-slate-600)' }}>{product.category}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <dt style={{ fontWeight: 500, width: '100px' }}>Brand</dt>
                                <dd style={{ color: 'var(--color-slate-600)' }}>{product.brand}</dd>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <dt style={{ fontWeight: 500, width: '100px' }}>Availability</dt>
                                <dd style={{ color: 'var(--color-slate-600)' }}>
                                    {product.stock > 0 ? (
                                        <span style={{ color: '#16a34a' }}>In Stock ({product.stock})</span>
                                    ) : (
                                        <span style={{ color: '#ef4444' }}>Out of Stock</span>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ width: '100px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>Quantity</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                style={{
                                    width: '100%',
                                    height: '2.5rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--color-border)',
                                    padding: '0 0.75rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                            <Button size="lg" style={{ width: '100%' }} onClick={() => addItem(product, quantity)}>
                                <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Customer Reviews</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    {/* Review List */}
                    <div>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {product.reviews.map((review) => (
                                    <div key={review.id} style={{ borderBottom: '1px solid var(--color-slate-100)', paddingBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600 }}>{review.userName}</span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--color-slate-400)' }}>{review.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', color: '#f59e0b', marginBottom: '0.5rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={14} fill={star <= review.rating ? '#f59e0b' : 'transparent'} />
                                            ))}
                                        </div>
                                        <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9375rem', lineHeight: 1.5 }}>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--color-slate-500)' }}>No reviews yet. Be the first to review!</p>
                        )}
                    </div>

                    {/* Add Review Form */}
                    <div>
                        {isAuthenticated ? (
                            <div style={{ backgroundColor: 'var(--color-slate-50)', padding: '2rem', borderRadius: 'var(--radius)' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Write a Review</h3>
                                <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Rating</label>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f59e0b' }}
                                                >
                                                    <Star size={24} fill={star <= rating ? '#f59e0b' : 'transparent'} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Your Comment</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="What did you think of the product?"
                                            style={{
                                                width: '100%',
                                                minHeight: '100px',
                                                padding: '0.75rem',
                                                borderRadius: 'var(--radius)',
                                                border: '1px solid var(--color-border)',
                                                fontSize: '0.875rem',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>
                                    <Button type="submit">Post Review</Button>
                                </form>
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'var(--color-slate-50)', padding: '2rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                                <p style={{ color: 'var(--color-slate-600)', marginBottom: '1rem' }}>Please log in to write a review.</p>
                                <Link to="/login">
                                    <Button variant="outline">Sign In</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
