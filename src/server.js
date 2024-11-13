require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const mercadopagoRoutes = require('./routes/mercadopagoRoutes');
const productRoutes = require('./routes/productRoutes');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const cluster = require('cluster');
const os = require('os');

require('./models/index');

if (cluster.isMaster) {
    const numCpus = os.cpus().length;
    console.log(`numero de cps disponibles: ${numCpus}`);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`El worker ${worker.process.pid} se cayo`);
        cluster.fork();
    });
} else {
    const cors = require('cors');
    const app = express();

    //Limitador de solicitudes a nuestra aplicacion
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 200,
        message: {
            status: 429,
            message: 'Demasiados peticiones, intentalo mas tarde!'
        }
    });

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
    app.use(compression());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/', limiter); // Usamos el limitador en la ruta
    app.use(authRoutes);
    app.use(mercadopagoRoutes);
    app.use(productRoutes);
    app.use(errorHandler);
    connectDB().then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`La Aplicación usa el worker ${process.pid} en el puerto ${process.env.PORT}`);
        });
    }).catch(err => {
        console.log('No me pude conectar a la base de datos: ' + err);
    });
}

