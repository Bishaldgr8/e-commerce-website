import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Button } from '../../../components/ui/Button';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative' }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.filter = 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1))';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'none';
            }}>
            <Link to={`/products/${product.id}`} className="floating" style={{ display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '1.5rem', aspectRatio: '1/1', backgroundColor: 'var(--color-slate-100)', boxShadow: 'var(--shadow-lg)' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </Link>
            <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-foreground)' }}>
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--color-slate-500)', fontWeight: 500 }}>
                            {product.category}
                        </p>
                    </div>
                    <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-foreground)' }}>${product.price.toFixed(2)}</p>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <Button variant="outline" size="sm" style={{ width: '100%', borderRadius: '1rem', border: '1.5px solid var(--color-slate-200)', height: '2.5rem' }}>Add to cart</Button>
                </div>
            </div>
        </div>
    );
};
