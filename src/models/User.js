const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);