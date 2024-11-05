const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'status'
});

module.exports = mongoose.model('Status', statusSchema);