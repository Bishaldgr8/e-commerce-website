import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    },
    isLatest: {
        type: Boolean,
        default: false
    },
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);
