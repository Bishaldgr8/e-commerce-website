import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

// 30 additional products to expand the catalog
const newProducts = [
    // Tech Accessories (10)
    { name: 'USB-C Hub 7-in-1', description: 'Multi-port adapter with HDMI, USB 3.0, and SD card reader', price: 45.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800', category: 'Electronics', brand: 'TechHub', stock: 75, isLatest: true },
    { name: 'Wireless Charging Pad', description: 'Fast 15W Qi-certified wireless charger', price: 29.99, image: 'https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=800', category: 'Electronics', brand: 'PowerUp', stock: 120, isLatest: true },
    { name: 'Bluetooth Earbuds Pro', description: 'True wireless earbuds with ANC and 30h battery', price: 129.00, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'Electronics', brand: 'AudioPro', stock: 45, isLatest: true },
    { name: 'Laptop Stand Aluminum', description: 'Ergonomic adjustable stand for laptops up to 17 inch', price: 39.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', category: 'Electronics', brand: 'ErgoDesk', stock: 60, isLatest: false },
    { name: 'LED Ring Light', description: 'Dimmable ring light for photography and video calls', price: 49.99, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', category: 'Electronics', brand: 'StudioPro', stock: 35, isLatest: true },
    { name: 'Power Bank 20000mAh', description: 'High capacity portable charger with dual USB ports', price: 34.99, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800', category: 'Electronics', brand: 'PowerMax', stock: 90, isLatest: false },
    { name: 'Cable Organizer Set', description: 'Magnetic cable management clips and ties', price: 15.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800', category: 'Accessories', brand: 'TidyTech', stock: 200, isLatest: false },
    { name: 'Phone Gimbal Stabilizer', description: '3-axis smartphone stabilizer for smooth video', price: 89.00, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', category: 'Electronics', brand: 'SmoothShot', stock: 25, isLatest: true },
    { name: 'Mini Projector', description: 'Portable HD projector with built-in speaker', price: 199.00, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800', category: 'Electronics', brand: 'ViewCast', stock: 18, isLatest: true },
    { name: 'Smart Plug 4-Pack', description: 'WiFi enabled smart outlets with voice control', price: 39.99, image: 'https://images.unsplash.com/photo-1558089687-e5c7c9d8e5e8?w=800', category: 'Electronics', brand: 'SmartHome', stock: 100, isLatest: false },

    // Fashion & Accessories (10)
    { name: 'Crossbody Leather Bag', description: 'Compact genuine leather crossbody for everyday use', price: 79.00, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', category: 'Bags', brand: 'UrbanStyle', stock: 30, isLatest: true },
    { name: 'Polarized Sports Sunglasses', description: 'UV400 protection with anti-glare coating', price: 49.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', category: 'Accessories', brand: 'ActiveVision', stock: 65, isLatest: false },
    { name: 'Stainless Steel Watch', description: 'Minimalist automatic watch with sapphire crystal', price: 249.00, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', category: 'Accessories', brand: 'Timeless', stock: 15, isLatest: true },
    { name: 'Leather Gloves', description: 'Touchscreen compatible winter gloves', price: 35.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=800', category: 'Accessories', brand: 'WarmHands', stock: 80, isLatest: false },
    { name: 'Baseball Cap Premium', description: 'Adjustable cotton cap with embroidered logo', price: 28.00, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', category: 'Accessories', brand: 'CapCo', stock: 120, isLatest: false },
    { name: 'Reversible Belt', description: 'Two-tone leather belt with rotating buckle', price: 42.00, image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5ea3?w=800', category: 'Accessories', brand: 'Nordic', stock: 55, isLatest: false },
    { name: 'Silk Tie Collection', description: 'Set of 3 premium silk ties in classic patterns', price: 65.00, image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800', category: 'Accessories', brand: 'Classy', stock: 40, isLatest: true },
    { name: 'Gym Duffle Bag', description: 'Water-resistant sports bag with shoe compartment', price: 55.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', category: 'Bags', brand: 'FitGear', stock: 45, isLatest: false },
    { name: 'Ankle Boots Suede', description: 'Chelsea-style suede boots with cushioned insole', price: 139.00, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', category: 'Shoes', brand: 'UrbanWalk', stock: 28, isLatest: true },
    { name: 'Rain Jacket Packable', description: 'Lightweight waterproof jacket that folds into pocket', price: 69.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=800', category: 'Apparel', brand: 'WeatherShield', stock: 50, isLatest: false },

    // Home & Lifestyle (10)
    { name: 'Aromatherapy Diffuser', description: 'Ultrasonic essential oil diffuser with LED lights', price: 32.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800', category: 'Home', brand: 'ZenSpace', stock: 70, isLatest: true },
    { name: 'Memory Foam Pillow', description: 'Contour pillow with cooling gel layer', price: 45.00, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800', category: 'Home', brand: 'DreamSleep', stock: 60, isLatest: false },
    { name: 'Weighted Blanket', description: '15lb calming blanket for better sleep', price: 89.00, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', category: 'Home', brand: 'RestWell', stock: 35, isLatest: true },
    { name: 'Stainless Steel Water Bottle', description: 'Insulated 32oz bottle keeps drinks cold 24hrs', price: 29.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', category: 'Sports', brand: 'HydroFlow', stock: 150, isLatest: false },
    { name: 'Desk Organizer Bamboo', description: 'Eco-friendly desktop storage with phone holder', price: 38.00, image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', category: 'Home', brand: 'GreenDesk', stock: 85, isLatest: false },
    { name: 'Wall Clock Modern', description: 'Silent non-ticking wall clock with minimalist design', price: 42.00, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800', category: 'Home', brand: 'TimeStyle', stock: 45, isLatest: false },
    { name: 'Photo Frame Set', description: 'Gallery wall frame set of 7 with matting', price: 55.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800', category: 'Home', brand: 'MemoryWall', stock: 40, isLatest: true },
    { name: 'Electric Wine Opener', description: 'Automatic corkscrew with foil cutter', price: 34.99, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800', category: 'Home', brand: 'VinoPro', stock: 55, isLatest: false },
    { name: 'Succulent Planter Set', description: 'Set of 6 ceramic pots with drainage', price: 28.00, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800', category: 'Home', brand: 'GreenThumb', stock: 90, isLatest: false },
    { name: 'Bath Mat Memory Foam', description: 'Ultra-absorbent non-slip bathroom rug', price: 24.99, image: 'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?w=800', category: 'Home', brand: 'BathLux', stock: 100, isLatest: false }
];

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        // Add sellerId to each product
        const productsWithSeller = newProducts.map(product => ({
            ...product,
            sellerId: new mongoose.Types.ObjectId()
        }));

        console.log(`📦 Adding ${productsWithSeller.length} new products...`);
        const result = await Product.insertMany(productsWithSeller);
        console.log(`✅ Successfully added ${result.length} products!`);

        const totalCount = await Product.countDocuments();
        console.log(`📊 Total products in database: ${totalCount}`);

        const categories = [...new Set(result.map(p => p.category))];
        console.log(`📂 New categories added: ${categories.join(', ')}`);

        await mongoose.disconnect();
        console.log('👋 Done! Your catalog now has even more products.');
        console.log('🔄 Refresh your browser to see the expanded catalog!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
