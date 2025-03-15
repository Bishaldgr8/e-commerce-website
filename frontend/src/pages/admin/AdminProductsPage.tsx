import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useCatalog } from '../../features/catalog/context/CatalogContext';
import { Link } from 'react-router-dom';

export const AdminProductsPage = () => {
    const { products, deleteProduct } = useCatalog();

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            deleteProduct(id);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>All Products</h1>
                <p style={{ color: 'var(--color-slate-500)' }}>Manage the complete product catalog.</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--color-slate-50)' }}>
                        <tr>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Product</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Category</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Brand</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Price</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Stock</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img src={p.image} alt={p.name} style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />
                                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.category}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.brand}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>${p.price.toFixed(2)}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.stock}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/products/${p.id}`} target="_blank">
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink size={16} />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" style={{ color: '#ef4444' }} onClick={() => handleDelete(p.id, p.name)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
