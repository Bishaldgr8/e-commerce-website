import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../features/cart/context/CartContext';
import { useCatalog } from '../features/catalog/context/CatalogContext';
import { useAuth } from '../features/auth/context/AuthContext';
import styles from './ProductDetailsPage.module.css';

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
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>
                <ChevronLeft size={16} /> Back to results
            </Link>

            <div className={styles.productLayout}>
                {/* Image Gallery */}
                <div className={styles.imageContainer}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                    />
                </div>

                {/* Details */}
                <div className={styles.productInfo}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.ratingContainer}>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill={star <= (product.reviews?.reduce((acc, r) => acc + r.rating, 0) || 0) / (product.reviews?.length || 1) ? '#f59e0b' : 'transparent'} />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>
                            ({product.reviews?.length || 0} reviews)
                        </span>
                    </div>

                    <p className={styles.price}>
                        ${product.price.toFixed(2)}
                    </p>

                    <div className={styles.descriptionSection}>
                        <p className={styles.description}>
                            {product.description}
                        </p>

                        <dl className={styles.metaList}>
                            <div className={styles.metaItem}>
                                <dt className={styles.metaLabel}>Category</dt>
                                <dd className={styles.metaValue}>{product.category}</dd>
                            </div>
                            <div className={styles.metaItem}>
                                <dt className={styles.metaLabel}>Brand</dt>
                                <dd className={styles.metaValue}>{product.brand}</dd>
                            </div>
                            <div className={styles.metaItem}>
                                <dt className={styles.metaLabel}>Availability</dt>
                                <dd className={styles.metaValue}>
                                    {product.stock > 0 ? (
                                        <span className={styles.inStock}>In Stock ({product.stock})</span>
                                    ) : (
                                        <span className={styles.outOfStock}>Out of Stock</span>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className={styles.addToCartSection}>
                        <div className={styles.quantityGroup}>
                            <label className={styles.quantityLabel}>Quantity</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className={styles.quantitySelect}
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.addToCartBtnContainer}>
                            <Button size="lg" className={styles.addToCartBtn} onClick={() => addItem(product, quantity)}>
                                <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.reviewsSection}>
                <h2 className={styles.reviewsTitle}>Customer Reviews</h2>

                <div className={styles.reviewsGrid}>
                    {/* Review List */}
                    <div>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div className={styles.reviewList}>
                                {product.reviews.map((review) => (
                                    <div key={review.id} className={styles.reviewItem}>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.reviewerName}>{review.userName}</span>
                                            <span className={styles.reviewDate}>{review.date}</span>
                                        </div>
                                        <div className={styles.reviewStars}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={14} fill={star <= review.rating ? '#f59e0b' : 'transparent'} />
                                            ))}
                                        </div>
                                        <p className={styles.reviewComment}>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
                        )}
                    </div>

                    {/* Add Review Form */}
                    <div>
                        {isAuthenticated ? (
                            <div className={styles.reviewFormContainer}>
                                <h3 className={styles.formTitle}>Write a Review</h3>
                                <form onSubmit={handleAddReview} className={styles.reviewForm}>
                                    <div>
                                        <label className={styles.formLabel}>Rating</label>
                                        <div className={styles.ratingInput}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={styles.starBtn}
                                                >
                                                    <Star size={24} fill={star <= rating ? '#f59e0b' : 'transparent'} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label className={styles.formLabel}>Your Comment</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="What did you think of the product?"
                                            className={styles.commentInput}
                                        />
                                    </div>
                                    <Button type="submit">Post Review</Button>
                                </form>
                            </div>
                        ) : (
                            <div className={styles.loginPrompt}>
                                <p className={styles.loginText}>Please log in to write a review.</p>
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
