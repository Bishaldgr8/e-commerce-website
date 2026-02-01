import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

dotenv.config();

async function createAdminUser() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@secretshop.com' });

        if (existingAdmin) {
            console.log('ℹ️  Admin user already exists');
            await mongoose.disconnect();
            process.exit(0);
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('bishal123', salt);

        const admin = await User.create({
            name: 'Admin',
            email: 'admin@secretshop.com',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@secretshop.com');
        console.log('🔑 Password: bishal123');

        await mongoose.disconnect();
        console.log('👋 Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createAdminUser();
