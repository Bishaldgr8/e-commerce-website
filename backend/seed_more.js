import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const products = [
    { name: "Premium Wireless Headphones", description: "High-quality wireless headphones with active noise cancellation", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "Electronics", brand: "AudioTech", stock: 50, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Smart Watch Pro", description: "Advanced fitness tracking and notifications", price: 399.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", category: "Electronics", brand: "TechWear", stock: 30, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Designer Sunglasses", description: "Premium UV protection with polarized lenses", price: 159.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", category: "Accessories", brand: "LuxVision", stock: 100, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Leather Backpack", description: "Genuine leather with laptop compartment", price: 189.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "Accessories", brand: "UrbanCarry", stock: 45, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Running Shoes", description: "Lightweight and comfortable for long runs", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "Footwear", brand: "SportMax", stock: 75, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Mechanical Keyboard", description: "RGB backlit with Cherry MX switches", price: 149.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", category: "Electronics", brand: "KeyMaster", stock: 60, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Yoga Mat Premium", description: "Extra thick non-slip yoga mat", price: 49.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500", category: "Sports", brand: "ZenFit", stock: 120, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Coffee Maker Deluxe", description: "Programmable with thermal carafe", price: 89.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500", category: "Home", brand: "BrewMaster", stock: 40, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Wireless Mouse", description: "Ergonomic design with precision tracking", price: 39.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500", category: "Electronics", brand: "TechGear", stock: 200, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Portable Speaker", description: "Waterproof Bluetooth speaker with 360° sound", price: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", category: "Electronics", brand: "SoundWave", stock: 85, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Fitness Tracker", description: "Track steps, calories, and sleep patterns", price: 59.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500", category: "Electronics", brand: "HealthTech", stock: 150, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Desk Lamp LED", description: "Adjustable brightness with USB charging port", price: 34.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500", category: "Home", brand: "BrightLife", stock: 90, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Water Bottle Insulated", description: "Keeps drinks cold for 24 hours", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500", category: "Sports", brand: "HydroMax", stock: 300, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Phone Case Premium", description: "Shockproof with military-grade protection", price: 19.99, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500", category: "Accessories", brand: "ShieldPro", stock: 500, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Notebook Set", description: "5-pack premium lined notebooks", price: 14.99, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500", category: "Stationery", brand: "WriteMate", stock: 250, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Travel Pillow", description: "Memory foam neck support for travel", price: 29.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500", category: "Travel", brand: "ComfortZone", stock: 180, isLatest: true, sellerId: new mongoose.Types.ObjectId() },
    { name: "Gaming Mouse Pad", description: "Extended RGB mouse pad for gaming", price: 44.99, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500", category: "Electronics", brand: "GamePro", stock: 110, isLatest: false, sellerId: new mongoose.Types.ObjectId() },
    { name: "Wireless Earbuds", description: "True wireless with charging case", price: 89.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", category: "Electronics", brand: "SoundPods", stock: 95, isLatest: true, sellerId: new mongoose.Types.ObjectId() }
];

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});

        console.log('📦 Inserting 18 products...');
        const result = await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        await mongoose.disconnect();
        console.log('👋 Done! Refresh your browser to see the "Load More" button.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
