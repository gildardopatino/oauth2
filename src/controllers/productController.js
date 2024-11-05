const Product = require('../models/Product');
const axios = require('axios');

exports.getProducts = async (req, res) => {
    //await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}
