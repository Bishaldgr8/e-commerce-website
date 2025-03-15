import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import Product from './src/models/Product.js';

dotenv.config();

const typesFile = path.join(process.cwd(), '../frontend/src/features/catalog/types.ts');

async function seed() {
    try {
        console.log('📦 Reading all products from types.ts...');
        const content = fs.readFileSync(typesFile, 'utf-8');
        const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

        if (!match) {
            throw new Error('Could not find MOCK_PRODUCTS in types.ts');
        }

        // Parse the TypeScript array into JSON
        let jsonStr = match[1];
        jsonStr = jsonStr
            .replace(/\/\/.*$/gm, '')
            .replace(/id:/g, '"id_str":')
            .replace(/name:/g, '"name":')
            .replace(/description:/g, '"description":')
            .replace(/price:/g, '"price":')
            .replace(/image:/g, '"image":')
            .replace(/category:/g, '"category":')
            .replace(/brand:/g, '"brand":')
            .replace(/stock:/g, '"stock":')
            .replace(/isLatest:/g, '"isLatest":')
            .replace(/reviews:/g, '"reviews":')
            .replace(/,\s*\]/g, ']')
            .replace(/,\s*\}/g, '}');

        const data = JSON.parse(jsonStr);
        console.log(`✅ Found ${data.length} products in types.ts`);

        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});

        // Add sellerId to each product
        const productsWithSeller = data.map(({ id_str, reviews, ...rest }) => ({
            ...rest,
            sellerId: new mongoose.Types.ObjectId()
        }));

        console.log('📦 Inserting all products...');
        const result = await Product.insertMany(productsWithSeller);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        // Show categories
        const categories = [...new Set(result.map(p => p.category))];
        console.log(`📊 Categories: ${categories.join(', ')}`);

        await mongoose.disconnect();
        console.log('👋 Done! All products from your catalog are now in the database.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
}

seed();
