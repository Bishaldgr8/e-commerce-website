import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../types';
import type { Product, Review as ReviewType } from '../types';
import { toast } from 'sonner';

interface CatalogContextType {
    products: Product[];
    isLoading: boolean;
    addProduct: (product: Omit<Product, 'id'>) => void;
    deleteProduct: (productId: string) => void;
    addReview: (productId: string, review: Omit<ReviewType, 'id' | 'date'>) => void;
    getProduct: (id: string) => Product | undefined;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

import { apiClient } from '../../../api/client';

export const CatalogProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await apiClient.get('/products');
            // Map _id to id for frontend compatibility
            const productsWithId = res.data.data.map((p: any) => ({
                ...p,
                id: p._id || p.id
            }));
            setProducts(productsWithId);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products');
            // Fallback to mock products if API is down
            setProducts(MOCK_PRODUCTS);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product: Omit<Product, 'id'>) => {
        try {
            const res = await apiClient.post('/products', product);
            setProducts(prev => [...prev, res.data.data]);
            toast.success('Product added successfully!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await apiClient.delete(`/products/${productId}`);
            setProducts(prev => prev.filter(p => p.id !== productId));
            toast.success('Product removed from catalog');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    const addReview = (productId: string, review: Omit<ReviewType, 'id' | 'date'>) => {
        // For now, keep reviews mock or implement backend for it later
        const newReview: ReviewType = {
            ...review,
            id: `rev-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
        };

        setProducts(prev => prev.map(p =>
            p.id === productId
                ? { ...p, reviews: [...(p.reviews || []), newReview] }
                : p
        ));
        toast.success('Review added!');
    };

    const getProduct = (id: string) => products.find(p => p.id === id);

    return (
        <CatalogContext.Provider value={{ products, addProduct, deleteProduct, addReview, getProduct, isLoading }}>
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalog = () => {
    const context = useContext(CatalogContext);
    if (!context) {
        throw new Error('useCatalog must be used within a CatalogProvider');
    }
    return context;
};
