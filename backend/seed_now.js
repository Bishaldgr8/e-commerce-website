import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const products = [
    {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        brand: "AudioTech",
        stock: 50,
        isLatest: true,
        sellerId: new mongoose.Types.ObjectId() // Generate a valid ObjectId
    },
    {
        name: "Smart Watch Pro",
        description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics",
        brand: "TechWear",
        stock: 30,
        isLatest: true,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Designer Sunglasses",
        description: "Premium UV protection with polarized lenses and titanium frame",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        category: "Accessories",
        brand: "LuxVision",
        stock: 100,
        isLatest: false,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Leather Backpack",
        description: "Genuine leather backpack with padded laptop compartment and multiple pockets",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        brand: "UrbanCarry",
        stock: 45,
        isLatest: true,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes with responsive cushioning and breathable mesh",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Footwear",
        brand: "SportMax",
        stock: 75,
        isLatest: false,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with Cherry MX switches",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        category: "Electronics",
        brand: "KeyMaster",
        stock: 60,
        isLatest: true,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Yoga Mat Premium",
        description: "Extra thick non-slip yoga mat with carrying strap",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        category: "Sports",
        brand: "ZenFit",
        stock: 120,
        isLatest: false,
        sellerId: new mongoose.Types.ObjectId()
    },
    {
        name: "Coffee Maker Deluxe",
        description: "Programmable coffee maker with thermal carafe and auto-brew",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        category: "Home",
        brand: "BrewMaster",
        stock: 40,
        isLatest: true,
        sellerId: new mongoose.Types.ObjectId()
    }
];

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        const deleteResult = await Product.deleteMany({});
        console.log(`✅ Deleted ${deleteResult.deletedCount} products`);

        console.log('📦 Inserting products...');
        const result = await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        const count = await Product.countDocuments();
        console.log(`📊 Total products in DB: ${count}`);

        const sample = await Product.findOne();
        console.log(`📦 Sample: ${sample.name} - $${sample.price}`);

        await mongoose.disconnect();
        console.log('👋 Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`  - ${key}: ${error.errors[key].message}`);
            });
        }
        process.exit(1);
    }
}

seed();
