require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const mercadopagoRoutes = require('./routes/mercadopagoRoutes');
const productRoutes = require('./routes/productRoutes');
require('./models/index');

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(mercadopagoRoutes);
app.use(productRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Aplicación corriendo por el puerto ${process.env.PORT}`);
    });
}).catch(err => {
    console.log('No me pude conectar a la base de datos: ' + err);
});