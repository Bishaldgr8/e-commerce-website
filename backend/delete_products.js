import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

async function deleteProducts() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Deleting "Photo Frame Set"...');
        const result1 = await Product.deleteOne({ name: 'Photo Frame Set' });
        console.log(`   ${result1.deletedCount > 0 ? '✅ Deleted' : '❌ Not found'}`);

        console.log('🗑️  Deleting "Wireless Charging Pad"...');
        const result2 = await Product.deleteOne({ name: 'Wireless Charging Pad' });
        console.log(`   ${result2.deletedCount > 0 ? '✅ Deleted' : '❌ Not found'}`);

        const total = await Product.countDocuments();
        console.log(`\n📊 Total products remaining: ${total}`);

        await mongoose.disconnect();
        console.log('👋 Done! Products removed from catalog.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

deleteProducts();
