import dotenv from 'dotenv';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import User from '../schemas/User.js'
dotenv.config();

const CLIENT_ID = process.env.MERCADOPAGO_CLIENT_ID
const CLIENT_SECRET = process.env.MERCADOPAGO_CLIENT_SECRET
const REDIRECT_URI = process.env.MERCADOPAGO_REDIRECT_URI

const cuentaMercadoPago = async (req, res) => {
    try {
        const { code, state } = req.query;

        if (!code) {
            const userId = req.query.token;
            const authURL = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&state=${userId}&redirect_uri=${REDIRECT_URI}`;
            return res.redirect(authURL);
        }

        const userId = state;

        const response = await axios.post('https://api.mercadopago.com/oauth/token', new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const access_token = response.data.access_token;

        const updateResult = await User.findByIdAndUpdate(userId, { mercadopagoAccessToken: access_token });

        if (updateResult) {
            return res.redirect('http://localhost:5173/perfil');
        } else {
            res.json({ message: 'No se pudo añadir tu access token.' });
        }

    } catch (error) {
        console.error('Error al enlazar la cuenta de MercadoPago:', error);
        res.status(500).json({ message: error.message });
    }
};

export const checkoutMercadoPago = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user || !user.mercadopagoAccessToken) {
            return res.status(400).json({ message: 'Usuario no encontrado o no tiene un access token de MercadoPago' });
        }

        const mercadopagoClient = new MercadoPagoConfig({
            accessToken: user.mercadopagoAccessToken
        });

        const { qty, amount } = req.body

        const lineItems = [
            {
                title: qty === 1 ? 'Matesito' : 'Matesitos',
                unit_price: amount,
                quantity: qty,
                currency_id: 'ARS',
            }
        ]

        const body = {
            items: lineItems,
            back_urls: {
                success: 'https://matesito-production.up.railway.app/mp/success',
                failure: 'https://matesito-production.up.railway.app/mp/cancel',
            },
            auto_return: "approved"
        }

        const preference = new Preference(mercadopagoClient);
        const result = await preference.create({ body });
        return res.status(200).json(result.init_point);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const successMP = (req, res) => {
    res.send('successMP')
}

export const cancelMP = (req, res) => {
    res.send('cancelMP')
}

export default cuentaMercadoPago;