import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@secretshop.com' });

        if (existingAdmin) {
            console.log('✅ Admin user already exists!');
            console.log('Email: admin@secretshop.com');
            console.log('Password: bishal123');
            await mongoose.disconnect();
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@secretshop.com',
            password: 'bishal123',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email: admin@secretshop.com');
        console.log('🔑 Password: bishal123');
        console.log('👑 Role:', admin.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
