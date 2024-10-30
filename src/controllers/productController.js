const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    const list = await Product.findAll();
    res.json(list);
}