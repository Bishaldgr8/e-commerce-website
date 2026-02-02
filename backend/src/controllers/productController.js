import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

        // Loop through removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = Product.find(JSON.parse(queryStr));

        // Search functionality
        if (req.query.search) {
            const search = req.query.search;
            query = Product.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            });
        }

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const products = await query;

        // Sort: products with images first, then by isLatest, then by createdAt
        const sortedProducts = products.sort((a, b) => {
            // Check if image exists and is not the default
            const aHasImage = a.image && a.image !== 'no-photo.jpg' && a.image.startsWith('http');
            const bHasImage = b.image && b.image !== 'no-photo.jpg' && b.image.startsWith('http');

            if (aHasImage && !bHasImage) return -1;
            if (!aHasImage && bHasImage) return 1;

            // If both have images or both don't, sort by isLatest
            if (b.isLatest !== a.isLatest) {
                return b.isLatest ? 1 : -1;
            }

            // Finally sort by creation date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: sortedProducts.length,
            pagination,
            data: sortedProducts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Seed products
// @route   POST /api/v1/products/seed
// @access  Public
export const seedProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        // If DB not empty and no force flag, return
        if (count > 0 && !req.body.force) {
            return res.status(200).json({
                success: true,
                message: 'Database already populated',
                count
            });
        }

        // Read data file
        const dataPath = path.join(__dirname, '../../data/products.json');

        if (!fs.existsSync(dataPath)) {
            return res.status(404).json({ success: false, message: 'Seed data file not found' });
        }

        const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Delete existing if force is true
        if (req.body.force) {
            await Product.deleteMany({});
        } else if (count > 0) {
            return res.status(200).json({ success: true, count });
        }

        // Insert new products
        // Handle products that might need specific ID formatting or additional fields
        const productsToInsert = products.map(p => ({
            ...p,
            // Ensure ID is acceptable (if your schema allows custom _id or using default)
            // If your schema uses MongoDB ObjectIds, you might want to remove explicit string IDs 
            // or keep them if you're using String type for _id.
            // Based on types.ts, frontend expects string 'id', backend likely uses '_id'.
            // Let's safe-guard by removing 'id' to let Mongo generate '_id' 
            // OR if your schema defines _id as String, keep it.
            // Looking at productController.js, it seems standard Mongoose.
            sellerId: new mongoose.Types.ObjectId()
        }));

        await Product.insertMany(productsToInsert);

        res.status(201).json({
            success: true,
            message: 'Products seeded successfully',
            count: products.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Seller/Admin)
export const createProduct = async (req, res) => {
    try {
        // Add user to req.body
        req.body.sellerId = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update product
// @route   PATCH /api/v1/products/:id
// @access  Private (Seller/Admin)
export const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Make sure user is product owner (or admin)
        if (product.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Seller/Admin)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Make sure user is product owner (or admin)
        if (product.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
