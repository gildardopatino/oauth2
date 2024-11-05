const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    external_reference: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    merchant_order_id: {
        type: String,
        required: true
    },
    preference_id: {
        type: String,
        required: true
    },
    site_id: {
        type: String,
        required: true
    },
    processing_mode: {
        type: String,
        required: true
    },
    merchant_account_id: {
        type: String,
        required: true
    },
    collection_id: {
        type: String,
        required: true
    },
    collection_status: {
        type: String,
        required: true
    }
}, {
    collection: 'payments'
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;