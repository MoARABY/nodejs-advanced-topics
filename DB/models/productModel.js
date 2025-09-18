const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    slug: {
        type: String,
        required: [true, 'Product slug is required'],
        unique: true
    },
    description: {
        type: String,
        maxlength: [500, 'Product description must be less than 500 characters'],
        minlength: [5, 'Product description must be at least 10 characters'],
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: [true, 'Shop ID is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    image: {
        type: String,
        default:'https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123'
    },
    embedding: { type: [Number], default: [] }
});

module.exports = mongoose.model('Product', productSchema);