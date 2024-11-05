const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    iva: {
        type: Schema.Types.Decimal128,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    collection: 'cart_items',
    timestamps: true
});

module.exports = mongoose.model('CartItem', CartItemSchema);