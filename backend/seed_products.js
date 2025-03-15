import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const typesFile = path.join(process.cwd(), '../frontend/src/features/catalog/types.ts');

async function seed() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        console.log('📦 Starting product seeding...');
        console.log('📁 Reading from:', typesFile);

        const content = fs.readFileSync(typesFile, 'utf-8');
        const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

        if (!match) {
            throw new Error('Could not find MOCK_PRODUCTS in types.ts');
        }

        console.log('✅ Found MOCK_PRODUCTS array');
        console.log('🔌 Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('secretshop');

        // Clear existing products
        const deleteResult = await db.collection('products').deleteMany({});
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing products`);

        // Parse and clean the data
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
        console.log(`📊 Parsed ${data.length} products from types.ts`);

        const cleanData = data.map(({ id_str, ...rest }) => ({
            ...rest,
            createdAt: new Date()
        }));

        // Insert products
        const insertResult = await db.collection('products').insertMany(cleanData);
        console.log(`✅ Successfully inserted ${insertResult.insertedCount} products!`);

        // Verify
        const count = await db.collection('products').countDocuments();
        console.log(`📈 Total products in database: ${count}`);

        if (count > 0) {
            const sample = await db.collection('products').findOne();
            console.log(`📦 Sample product: ${sample.name}`);
        }

    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        console.error(err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('👋 Disconnected from MongoDB');
    }
}

seed();
