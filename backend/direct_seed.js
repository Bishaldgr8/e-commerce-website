import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const typesFile = path.join(process.cwd(), '../frontend/src/features/catalog/types.ts');
const content = fs.readFileSync(typesFile, 'utf-8');
const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

async function seed() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        console.log('Seeding directly with MongoDB client...');
        await client.connect();
        const db = client.db('secretshop');

        // Clear products
        await db.collection('products').deleteMany({});
        console.log('Cleared existing products.');

        if (match) {
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
                .replace(/,\s*\]/g, ']')
                .replace(/,\s*\}/g, '}');

            const data = JSON.parse(jsonStr);
            const cleanData = data.map(({ id_str, ...rest }) => ({
                ...rest,
                createdAt: new Date()
            }));

            await db.collection('products').insertMany(cleanData);
            console.log(`Successfully seeded ${cleanData.length} products to Atlas!`);
        }

    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await client.close();
    }
}

seed();
