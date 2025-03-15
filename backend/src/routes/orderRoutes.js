import express from 'express';
import { createOrder, getMyOrders, getOrder, getAllOrders } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/all', protect, authorize('admin'), getAllOrders);
router.get('/:id', protect, getOrder);

export default router;
