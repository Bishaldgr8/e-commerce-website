import { MOCK_PRODUCTS } from '../features/catalog/types';
import { ProductCard } from '../features/catalog/components/ProductCard';

export const NewArrivalsPage = () => {
    // In a real app, this would query backend for isNew: true or sort by created_at
    const newProducts = MOCK_PRODUCTS.filter(p => p.isLatest);

    return (
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>New Arrivals</h1>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-slate-500)' }}>
                    Explore our latest additions to the collection.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {newProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {newProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-slate-500)' }}>
                    No new arrivals at the moment. Check back soon!
                </div>
            )}
        </div>
    );
};
