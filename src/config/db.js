const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB contacdo');
    } catch (err) {
        console.error('No me pude conectar a Mongo:', err);
        process.exit(1);
    }
};

module.exports = connectDB;