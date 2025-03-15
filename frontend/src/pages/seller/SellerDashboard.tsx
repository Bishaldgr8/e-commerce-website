import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useCatalog } from '../../features/catalog/context/CatalogContext';

const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.coerce.number().positive('Price must be positive'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().min(1, 'Brand is required'),
    image: z.string().url('Please enter a valid image URL'),
    stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
});

type ProductInput = z.infer<typeof productSchema>;

export const SellerDashboard = () => {
    const { user } = useAuth();
    const { products, addProduct } = useCatalog();
    const [isAdding, setIsAdding] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductInput>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            stock: 0,
            price: 0,
        }
    });

    const sellerProducts = products.filter(p => p.sellerId === user?.id);

    // Mock earnings calculation
    const totalEarnings = sellerProducts.length * 450.50; // Mock logic
    const totalSales = sellerProducts.length * 12;

    const onSubmit = async (data: ProductInput) => {
        addProduct({
            ...data,
            sellerId: user?.id,
            isLatest: true,
            reviews: []
        });
        setIsAdding(false);
        reset();
    };

    return (
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>Seller Dashboard</h1>
                    <p style={{ color: 'var(--color-slate-500)' }}>Manage your products and view your sales performance.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    {isAdding ? 'Cancel' : 'Add New Item'}
                </Button>
            </div>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-slate-500)', marginBottom: '0.5rem' }}>
                        <DollarSign size={20} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Earnings</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>${totalEarnings.toLocaleString()}</div>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-slate-500)', marginBottom: '0.5rem' }}>
                        <TrendingUp size={20} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Sales</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{totalSales} units</div>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-slate-500)', marginBottom: '0.5rem' }}>
                        <Package size={20} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Active Products</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{sellerProducts.length} items</div>
                </div>
            </div>

            {isAdding && (
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Add New Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Input label="Product Name" placeholder="e.g. Premium Leather Belt" error={errors.name?.message} {...register('name')} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Input label="Description" placeholder="Detailed description of the product..." error={errors.description?.message} {...register('description')} />
                        </div>
                        <Input label="Price ($)" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
                        <Input label="Stock Quantity" type="number" error={errors.stock?.message} {...register('stock')} />
                        <Input label="Category" placeholder="e.g. Accessories" error={errors.category?.message} {...register('category')} />
                        <Input label="Brand" placeholder="e.g. Nordic" error={errors.brand?.message} {...register('brand')} />
                        <div style={{ gridColumn: 'span 2' }}>
                            <Input label="Image URL" placeholder="https://images.unsplash.com/..." error={errors.image?.message} {...register('image')} />
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit" isLoading={isSubmitting}>Publish Product</Button>
                        </div>
                    </form>
                </div>
            )}

            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Your Products</h2>
            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--color-slate-50)' }}>
                        <tr>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Product</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Category</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Price</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellerProducts.length > 0 ? (
                            sellerProducts.map((p) => (
                                <tr key={p.id}>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                                            <span style={{ fontWeight: 500 }}>{p.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.category}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>${p.price.toFixed(2)}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.stock}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-slate-500)' }}>
                                    You haven't added any products yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
