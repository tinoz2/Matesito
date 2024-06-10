import dotenv from 'dotenv';
import axios from 'axios';
import User from '../schemas/User.js'

dotenv.config();

const CLIENT_ID = process.env.MERCADOPAGO_CLIENT_ID;
const CLIENT_SECRET = process.env.MERCADOPAGO_CLIENT_SECRET
const REDIRECT_URI = process.env.MERCADOPAGO_REDIRECT_URI;

const cuentaMercadoPago = async (req, res) => {
    try {
        const { code } = req.body;
        console.log(code)

        if (!code) {
            return res.status(400).json({ message: 'Código de autorización faltante' });
        }

        const response = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        });
        console.log(response)
        console.log('first')

        const access_token = response.data.access_token;
        console.log(access_token)

        res.json({ message: 'Cuenta de MercadoPago enlazada exitosamente!', access_token });
    } catch (error) {
        console.error('Error al enlazar la cuenta de MercadoPago:', error);
        res.status(500).json({ message: error.message });
    }
};

export const disconnectMercadoPago = async (req, res) => {
    try {
        const { user_id } = req.body;

        const user = await User.findOne({ where: { id: user_id } });
        if (user) {
            user.mercadopagoAccessToken = null;
            await user.save();
            return res.json({ message: 'Cuenta de MercadoPago desconectada exitosamente!' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al desconectar la cuenta de MercadoPago:', error);
        res.status(500).json({ message: error.message });
    }
}

export default cuentaMercadoPago;