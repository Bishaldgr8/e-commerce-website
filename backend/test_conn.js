import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env' });

const testConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        console.log(`URI: ${process.env.MONGODB_URI?.replace(/:([^@]+)@/, ':****@')}`);

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ SUCCESS: MongoDB Connected successfully!');

        // List collections to be sure
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Visible Collections:', collections.map(c => c.name));

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILURE: Could not connect to MongoDB Atlas.');
        console.error('Error details:', error.message);
        process.exit(1);
    }
};

testConnection();
