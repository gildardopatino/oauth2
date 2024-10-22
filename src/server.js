require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(session({
    secret: '123456',
    resave:false,
    saveUninitialized:true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

app.listen(3000, () => {
    console.log("Aplicacion corriendo por el puerto 3000");
});