import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
import axios from 'axios';
import User from '../schemas/User.js'

dotenv.config();

const CLIENT_ID = process.env.MERCADOPAGO_CLIENT_ID;
const CLIENT_SECRET = process.env.MERCADOPAGO_CLIENT_SECRET
const REDIRECT_URI = process.env.MERCADOPAGO_REDIRECT_URI;

const cuentaMercadoPago = async (req, res) => {
    try {
        const { code } = req.query; 
        console.log(code)

        if (!code) {
            const authURL = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&redirect_uri=${REDIRECT_URI}`;
            return res.redirect(authURL);
        }

        const response = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        });

        const { access_token, refresh_token, user_id } = response.data;

        const user = await User.findOne({ where: { id: user_id } });
        if (user) {
            user.mercadopagoAccessToken = access_token;
            user.mercadopagoRefreshToken = refresh_token;
            await user.save();
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Cuenta de MercadoPago enlazada exitosamente!', access_token, refresh_token, user_id });
    } catch (error) {
        console.error('Error al enlazar la cuenta de MercadoPago:', error);
        res.status(500).json({ message: error.message });
    }
};

export default cuentaMercadoPago;