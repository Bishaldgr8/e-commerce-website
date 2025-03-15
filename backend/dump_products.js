import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const dumpProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const products = await Product.find().limit(3);
        console.log('--- PRODUCT DUMP ---');
        console.log(JSON.stringify(products, null, 2));
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

dumpProducts();
