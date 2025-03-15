import { useState, useMemo } from 'react';
import { useCatalog } from '../features/catalog/context/CatalogContext';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { FishFollowEffect } from '../components/effects/FishFollowEffect';

export const HomePage = () => {
  const { products } = useCatalog();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, products]);

  const displayProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div id="hero" style={{
        marginBottom: '4rem',
        padding: '6rem 3rem',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '2rem',
        background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(15, 23, 42) 90.2%)', // Slate 900
        color: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <FishFollowEffect options={{ containerSelector: '#hero', opacity: 0.9 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Elevate Your <span style={{ background: 'linear-gradient(to right, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lifestyle</span>
          </h1>
          <p style={{ color: 'var(--color-slate-400)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Discover curated collections from around the globe at The Secret Shop.
            Exclusive products, premium quality, and secret deals.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
            <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>Shop Collection</Button>
            <Button size="lg" variant="outline" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>Learn More</Button>
          </div>
        </div>
      </div>

      <div id="catalog" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '400px', flex: 1 }}>
          <Input
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(12); // Reset pagination on search
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(12); // Reset pagination on category change
              }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '1px solid var(--color-border)',
                backgroundColor: selectedCategory === category ? 'var(--color-slate-900)' : 'var(--color-surface)',
                color: selectedCategory === category ? 'var(--color-slate-50)' : 'var(--color-slate-700)',
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selectedCategory === category ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2.5rem'
      }}>
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', backgroundColor: 'var(--color-slate-100)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-slate-500)' }}>No products matches your criteria.</p>
            <Button variant="ghost" onClick={() => { setSearch(''); setSelectedCategory('All'); }} style={{ marginTop: '1rem' }}>Clear all filters</Button>
          </div>
        )}
      </div>

      {hasMore && (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Button
            onClick={handleLoadMore}
            style={{
              padding: '0.75rem 3rem',
              fontSize: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Load More Products
          </Button>
          <p style={{ marginTop: '1rem', color: 'var(--color-slate-400)', fontSize: '0.875rem' }}>
            Showing {displayProducts.length} of {filteredProducts.length} items
          </p>
        </div>
      )}
    </div>
  );
};
