import Product from '../models/Product.js';

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
