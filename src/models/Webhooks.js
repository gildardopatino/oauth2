const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebhooksSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    api_version: {
        type: Number,
        required: true
    },
    data_id: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    live_mode: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
}, {
    collection: 'webhooks',
    timestamps: false
});

module.exports = mongoose.model('Webhook', WebhooksSchema);