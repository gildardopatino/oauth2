const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status_id: {
        type: Number,
        ref: 'Status',
        required: true
    },
    external_reference: {
        type: String,
        required: true
    }
}, {
    collection: 'carts',
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);