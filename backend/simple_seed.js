import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    brand: String,
    stock: { type: Number, default: 0 },
    isLatest: { type: Boolean, default: false },
    sellerId: mongoose.Schema.ObjectId,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

const typesFile = path.join(process.cwd(), '../src/features/catalog/types.ts');
const content = fs.readFileSync(typesFile, 'utf-8');
const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

const seed = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany();
        console.log('Cleared collections.');

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
            const cleanData = data.map(({ id_str, ...rest }) => rest);

            await Product.insertMany(cleanData);
            console.log(`Seeded ${cleanData.length} products.`);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};

seed();
