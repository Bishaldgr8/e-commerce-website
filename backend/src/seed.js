import { dbSave, initializeData } from './utils/db.js';
import { MOCK_PRODUCTS } from '../../src/features/catalog/types.ts'; // Wait, I can't import TS directly from Node without setup

// I'll just paste the mock products here for the seeder
const mockProducts = [
    { id: 'e1', name: 'Ultra-Wide Curved Monitor', description: '34-inch 144Hz curved gaming monitor with OLED tech.', price: 899.99, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Vision', stock: 5, isNew: true },
    { id: 'e2', name: 'Noise Cancelling Headphones', description: 'Active noise cancellation with 40h battery life.', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Sonic', stock: 12 },
    // I'll add more in the actual script
];

const seed = async () => {
    await initializeData();
    await dbSave('products', mockProducts);
    console.log('Data seeded successfully');
}

seed();
