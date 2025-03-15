import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        console.log('Connecting directly with MongoDB client...');
        await client.connect();
        console.log('Connected successfully to server!');

        const db = client.db('secretshop');
        const collection = db.collection('test');

        const result = await collection.insertOne({ test: true, time: new Date() });
        console.log(`Inserted document with id: ${result.insertedId}`);

        await collection.deleteOne({ _id: result.insertedId });
        console.log('Deleted test document.');

    } catch (err) {
        console.error('Direct connection failed:', err);
    } finally {
        await client.close();
    }
}

run();
