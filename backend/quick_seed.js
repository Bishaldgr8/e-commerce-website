import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

// Sample products to seed
const products = [
    {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        brand: "AudioTech",
        stock: 50,
        isLatest: true
    },
    {
        name: "Smart Watch Pro",
        description: "Advanced fitness tracking and notifications",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics",
        brand: "TechWear",
        stock: 30,
        isLatest: true
    },
    {
        name: "Designer Sunglasses",
        description: "UV protection with style",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        category: "Accessories",
        brand: "LuxVision",
        stock: 100,
        isLatest: false
    },
    {
        name: "Leather Backpack",
        description: "Genuine leather with laptop compartment",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        brand: "UrbanCarry",
        stock: 45,
        isLatest: true
    },
    {
        name: "Running Shoes",
        description: "Lightweight and comfortable for long runs",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Footwear",
        brand: "SportMax",
        stock: 75,
        isLatest: false
    }
];

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});
        console.log('✅ Cleared!');

        console.log('📦 Inserting products...');
        const result = await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        const count = await Product.countDocuments();
        console.log(`📊 Total products in DB: ${count}`);

        await mongoose.disconnect();
        console.log('👋 Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seed();
