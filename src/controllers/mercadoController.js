require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Preferencia = require('../models/Preferencia');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const Webhooks = require('../models/Webhooks');
const Payment = require('../models/Payment');

/**
 * Crea un pago en MercadoPago
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.crearPago = async (req, res) => {
    const { items, email, name } = req.body;

    const cliente = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    // Verificamos si el usuario existe
    let user = await User.findOne({ email });
    if (!user) {
        const hashedPassword = await bcrypt.hash(uuidv4(), 10);
        user = await User.create({ email, nombres: name, password: hashedPassword });
    }
    // Verificamos si el usuario ya tiene un carrito pendiente de pago
    let cart = await Cart.findOne({ user_id: user._id, status_id: 1 });
    if (!cart) {
        // Crear un nuevo carrito
        cart = await Cart.create({
            user_id: user._id,
            status_id: 1,
            external_reference: uuidv4()
        });
    } else {
        // Borrar los items actuales del carrito
        await CartItem.deleteMany({ cart_id: cart._id });
    }
    // Insertar los nuevos items en el carrito
    for (const item of items) {
        await CartItem.create({
            cart_id: cart._id,
            product_id: item.id,
            price: item.unit_price,
            iva: item.unit_price * 0.19,
            quantity: item.quantity
        });
    }

    const preferencia = new Preference(cliente);

    const body = {
        items: items,
        payer: {
            email: 'test_user_123456@testuser.com',
            entity_type: 'individual'
        },
        back_urls: {
            success: 'http://localhost:5173/completado',
            failure: 'http://localhost:5173/fallido',
            pending: 'http://localhost:5173/pendiente'
        },
        notification_url: process.env.NOTIFICATION_URL,
        auto_return: 'approved',
        external_reference: cart.external_reference
    };

    try {
        const respuesta = await preferencia.create({ body });
        //Insertamos la preferencia en el modelo
        await Preferencia.create({
            external_reference: cart.external_reference,
            id: respuesta.id,
            client_id: respuesta.client_id,
            collector_id: respuesta.collector_id,
            date_created: respuesta.date_created,
            init_point: respuesta.init_point,
            marketplace: respuesta.marketplace,
            data: JSON.stringify(respuesta)
        });
        return res.send(respuesta.init_point)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error, no se pudo completar la compra');
    }
}

/**
 *  Guarda los datos del webhook en mongo
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.webhook = async (req, res) => {
    const { action, api_version, data, date_created, id, live_mode, type, user_id, external_reference } = req.body;

    if (!action) {
        return res.status(200).send('Los datos del webhook no contienen acción, ignorando.');
    }
    try {
        await Webhooks.create({
            action,
            api_version,
            data_id: data.id,
            date_created,
            id,
            live_mode,
            type,
            user_id,
            external_reference
        });
        res.send('Datos del webhook guardados');
    } catch (error) {
        console.error('Error al guardar los datos del webhook:', error);
        res.status(500).send('Error al guardar los datos del webhook');
    }
};

/**
 *  Guarda los datos de pago en mongo
 * @param {*} req 
 * @param {*} res 
 */
exports.savePayment = async (req, res) => {
    const { collection_id, collection_status, payment_id, status, external_reference, payment_type, merchant_order_id, preference_id, site_id, processing_mode, merchant_account_id } = req.body;

    try {
        await Payment.create({
            collection_id, collection_status, id: payment_id, status, external_reference, payment_type, merchant_order_id, preference_id, site_id, processing_mode, merchant_account_id
        });
        // Buscamos el Carro con ese external reference para cambiar su estado a 2
        const cart = await Cart.findOne({ external_reference });
        if (cart) {
            await cart.updateOne({ status_id: 2 });
        }
        res.send('Pago guardado');
    } catch (error) {
        console.error('Error al guardar los datos de pago:', error);
        res.status(500).send('Error al guardar los datos de pago');
    }
};