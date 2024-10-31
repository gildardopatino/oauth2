require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db'); // Cambiado para usar la función connectDB
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const mercadopagoRoutes = require('./routes/mercadopagoRoutes');
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

// Conectar a la base de datos
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Aplicación corriendo por el puerto ${process.env.PORT}`);
    });
}).catch(err => {
    console.log('No me pude conectar a la base de datos: ' + err);
});