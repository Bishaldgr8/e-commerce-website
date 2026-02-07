import { useState, useMemo } from 'react';
import { useCatalog } from '../features/catalog/context/CatalogContext';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { FishFollowEffect } from '../components/effects/FishFollowEffect';
import styles from './HomePage.module.css';
import { clsx } from 'clsx';

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
    <div className={styles.container}>
      <div id="hero" className={styles.hero}>
        <FishFollowEffect options={{ containerSelector: '#hero', opacity: 0.9 }} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Elevate Your <span className={styles.highlight}>Lifestyle</span>
          </h1>
          <p className={styles.heroDescription}>
            Discover curated collections from around the globe at The Secret Shop.
            Exclusive products, premium quality, and secret deals.
          </p>
          <div className={styles.heroButtons}>
            <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>Shop Collection</Button>
            <Button size="lg" variant="outline" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>Learn More</Button>
          </div>
        </div>
      </div>

      <div id="catalog" className={styles.catalogHeader}>
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(12); // Reset pagination on search
            }}
          />
        </div>

        <div className={styles.filtersContainer}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(12); // Reset pagination on category change
              }}
              className={clsx(styles.filterChip, selectedCategory === category && styles.filterChipActive)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productGrid}>
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noResults}>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-slate-500)' }}>No products matches your criteria.</p>
            <Button variant="ghost" onClick={() => { setSearch(''); setSelectedCategory('All'); }} style={{ marginTop: '1rem' }}>Clear all filters</Button>
          </div>
        )}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            onClick={handleLoadMore}
            className={styles.loadMoreBtn}
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
