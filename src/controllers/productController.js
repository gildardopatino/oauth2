const { User } = require('../models');
const Product = require('../models/Product');
const redis = require('redis');
const logger = require('../middlewares/logger');
const client = redis.createClient({
    url: `redis://${process.env.REDIST_HOST || 'localhost'}:${process.env.REDIST_PORT || 6379}`
});

client.on('error', (err) => {
    console.log('no me pude conectar a redis', err);
});

client.connect();

exports.getProducts = async (req, res, next) => {
    try {
        //throw new Error('Opss!, registraste mal el tipo de producto');
        //const cachedProducts = await client.get('products');
        
        //if (cachedProducts) {
        //    logger.info('Realice la consulta de productos cacheados');
        //    return res.json(JSON.parse(cachedProducts));
        //}
        const products = await Product.find({}, '-id -updatedAt');

        //const users = await User.find();

        // Paralelismo
        /*const [myProducts, myUsers] = await Promise.all([
            Product.find(),
            User.find()
        ]);*/
        //await client.setEx('products', 3600, JSON.stringify(products));
        logger.info('Realice la consulta de productos y almacenamiento en redis');
        
        res.json(products);
    } catch (error) {
        error.status = 400;
        error.errorMessage = 'Te falto registro tu cedula';
        next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        const { title, description, category, price, image } = req.body;
        const product = new Product({ title, description, category, price, image });
        await product.save();
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        next(error);
    }

}