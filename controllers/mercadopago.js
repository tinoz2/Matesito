import dotenv from 'dotenv';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import User from '../schemas/User.js'
dotenv.config();

const CLIENT_ID = '212521077347976'
const CLIENT_SECRET = 'X4kFm7KUQ14NcaHu5JemnZHJUYomvIjb'
const REDIRECT_URI = 'https://matesito-production.up.railway.app/mp/callback'

const cuentaMercadoPago = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            const authURL = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&state=${CLIENT_SECRET}&redirect_url=${REDIRECT_URI}`;
            return res.redirect(authURL)
        }

        const response = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        });

        const access_token = response.data.access_token;
        const userId = req.user ? req.user.id : null
        console.log(userId)
        await User.findByIdAndUpdate(userId, { mercadoPagoAccessToken: access_token });

        if (access_token)
            return res.redirect('http://localhost:5173/perfil')

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