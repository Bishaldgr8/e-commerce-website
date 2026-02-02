import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

const app = express();


// Enable CORS - Allow all origins for Vercel deployment
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser

app.use(express.json());

// Database connection middleware for Vercel serverless
app.use(async (req, res, next) => {
    // Skip DB connection for preflight requests
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
});


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// Simple test route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy and connected to MongoDB' });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server locally (not on Vercel)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;
