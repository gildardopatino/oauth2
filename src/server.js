require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Aplicacion corriendo por el puerto 3000");
});