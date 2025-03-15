import { MOCK_PRODUCTS } from '../features/catalog/types';
import { ProductCard } from '../features/catalog/components/ProductCard';

export const BrandsPage = () => {
    // Group products by brand
    const brandGroups = MOCK_PRODUCTS.reduce((acc, product) => {
        const brand = product.brand || 'Other';
        if (!acc[brand]) {
            acc[brand] = [];
        }
        acc[brand].push(product);
        return acc;
    }, {} as Record<string, typeof MOCK_PRODUCTS>);

    const sortedBrands = Object.keys(brandGroups).sort();

    return (
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>Our Brands</h1>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-slate-500)' }}>
                    Discover premium products from our trusted partners.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {sortedBrands.map((brand) => (
                    <section key={brand}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid var(--color-border)'
                        }}>
                            {brand}
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}>
                            {brandGroups[brand].map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
