import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: String,
                required: true
            },
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', orderSchema);
