import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import Product from './src/models/Product.js';

dotenv.config();

const typesFile = path.join(process.cwd(), '../frontend/src/features/catalog/types.ts');

async function seed() {
    try {
        console.log('📦 Reading products from types.ts...');
        const content = fs.readFileSync(typesFile, 'utf-8');

        // Extract the MOCK_PRODUCTS array
        const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

        if (!match) {
            throw new Error('Could not find MOCK_PRODUCTS in types.ts');
        }

        console.log('✅ Found MOCK_PRODUCTS array');

        // Clean and parse the TypeScript object notation to JSON
        let jsonStr = match[1];

        // Remove comments
        jsonStr = jsonStr.replace(/\/\/.*$/gm, '');

        // Fix property names - add quotes
        jsonStr = jsonStr.replace(/(\w+):/g, '"$1":');

        // Fix escaped quotes in strings (like Children\'s)
        jsonStr = jsonStr.replace(/\\'/g, "'");

        // Remove trailing commas
        jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');

        console.log('🔄 Parsing JSON...');
        const data = JSON.parse(jsonStr);
        console.log(`✅ Parsed ${data.length} products`);

        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});

        // Add sellerId to each product and remove fields not in schema
        const productsWithSeller = data.map(({ id, reviews, ...rest }) => ({
            ...rest,
            sellerId: new mongoose.Types.ObjectId()
        }));

        console.log('📦 Inserting all products...');
        const result = await Product.insertMany(productsWithSeller);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        // Show statistics
        const categories = [...new Set(result.map(p => p.category))];
        console.log(`📊 Categories (${categories.length}): ${categories.join(', ')}`);

        const latestCount = result.filter(p => p.isLatest).length;
        console.log(`⭐ Latest products: ${latestCount}`);

        await mongoose.disconnect();
        console.log('👋 Done! All products are now in the database.');
        console.log('🔄 Refresh your browser to see the full catalog!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.stack) {
            console.error('Stack:', error.stack.split('\n').slice(0, 3).join('\n'));
        }
        process.exit(1);
    }
}

seed();
