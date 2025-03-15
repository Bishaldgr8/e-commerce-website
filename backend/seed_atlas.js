import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import Product from './src/models/Product.js';

dotenv.config();

const typesFile = path.join(process.cwd(), '../src/features/catalog/types.ts');
const content = fs.readFileSync(typesFile, 'utf-8');

const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

const seedMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Clear existing products
        await Product.deleteMany();
        console.log('Cleared existing products');

        if (match) {
            let jsonStr = match[1];
            // Remove comments and clean up for JSON.parse
            jsonStr = jsonStr
                .replace(/\/\/.*$/gm, '')
                .replace(/id:/g, '"id_str":') // Rename mock id to avoid conflict with MongoDB _id
                .replace(/name:/g, '"name":')
                .replace(/description:/g, '"description":')
                .replace(/price:/g, '"price":')
                .replace(/image:/g, '"image":')
                .replace(/category:/g, '"category":')
                .replace(/brand:/g, '"brand":')
                .replace(/stock:/g, '"stock":')
                .replace(/isLatest:/g, '"isLatest":')
                .replace(/,\s*\]/g, ']')
                .replace(/,\s*\}/g, '}');

            const productsData = JSON.parse(jsonStr);

            // Remove the 'id_str' and let MongoDB generate real _ids
            const cleanProducts = productsData.map(p => {
                const { id_str, ...rest } = p;
                return rest;
            });

            await Product.insertMany(cleanProducts);
            console.log(`Successfully seeded ${cleanProducts.length} products to MongoDB Atlas!`);
        } else {
            console.error('Could not find MOCK_PRODUCTS in types.ts');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedMongoDB();
