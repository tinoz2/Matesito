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
            const userId = req.query.token; // Assuming you get the userId from the token query param
            const authURL = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&state=${userId}&redirect_uri=${REDIRECT_URI}`;
            return res.redirect(authURL);
        }

        const userId = state; // Get the userId from the state parameter

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
        console.log(`Received access_token: ${access_token}`);
        console.log(`Received userId: ${userId}`);

        // Actualiza el usuario con el token de acceso de MercadoPago
        const updateResult = await User.findByIdAndUpdate(userId, { mercadopagoAccessToken: access_token });
        console.log(`Update result: ${updateResult}`);

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
        const mercadopagoClient = new MercadoPagoConfig({
            accessToken: 's'
        });

        const { cart } = req.body

        const lineItems = cart.map(item => ({
            title: item.title,
            unit_price: item.amount,
            quantity: item.qty,
            currency_id: 'ARS',
        }))

        const body = {
            items: lineItems,
            back_urls: {
                success: ``,
                failure: ``,
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

export default cuentaMercadoPago;