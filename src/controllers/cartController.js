const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const User = require('../models/User');

exports.createCart = async (req, res) => {
    const { email, name, items, status, external_reference } = req.body;

    try {
        // Crear o encontrar el usuario
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, nombres: name });
            await user.save();
        }

        // Crear el carrito
        const cart = new Cart({
            user_id: user._id,
            status,
            external_reference
        });
        await cart.save();

        // Insertar los items del carrito
        for (const item of items) {
            const cartItem = new CartItem({
                cart_id: cart._id,
                product_id: item.id,
                title: item.title,
                price: item.price,
                iva: item.iva,
                quantity: item.quantity
            });
            await cartItem.save();
        }

        res.status(201).json({ message: 'Cart created successfully', cartId: cart._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error });
    }
};

exports.salesOfTheDay = async (req, res) => {
    try {
        // Obtener la fecha actual
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Obtener los carritos creados hoy
        const carts = await Cart.find({
            createdAt: { $gte: today }
        }).populate('user_id', 'nombres email');

        // Obtener los detalles de los items del carrito
        const cartDetails = await Promise.all(carts.map(async cart => {
            const items = await CartItem.find({ cart_id: cart._id }).populate('product_id', 'title');
            return {
                id: cart._id,
                user_id: cart.user_id._id,
                user_name: cart.user_id.nombres,
                user_email: cart.user_id.email,
                status_id: cart.status_id,
                external_reference: cart.external_reference,
                created_at: cart.createdAt,
                items: items.map(item => ({
                    product_id: item.product_id._id,
                    title: item.product_id.title,
                    price: parseFloat(item.price),
                    quantity: item.quantity
                }))
            };
        }));

        res.json(cartDetails);
    } catch (error) {
        console.error('Error listing sales of the day:', error);
        res.status(500).send('Error listing sales of the day');
    }
};