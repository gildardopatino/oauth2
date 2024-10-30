require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/db');
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

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Aplicacion corriendo por el puerto 3000");
    });
}).catch(err => {
    console.log('no me pude conectar a la basa de datos' + err);
});