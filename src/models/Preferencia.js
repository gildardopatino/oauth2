const mongoose = require('mongoose');

const PreferenciaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    client_id: {
        type: String,
        required: true
    },
    collector_id: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    init_point: {
        type: String,
        required: true
    },
    marketplace: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    external_reference: {
        type: String,
        required: false
    }
}, {
    collection: 'preferencias'
});

const Preferencia = mongoose.model('Preferencia', PreferenciaSchema);

module.exports = Preferencia;