import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = async (req, res) => {
    const { items, totalPrice, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No items in order' });
    }

    try {
        const order = await Order.create({
            userId: req.user.id,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
        });

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/v1/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check ownership (or admin)
        if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/v1/orders/all
// @access  Private (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
