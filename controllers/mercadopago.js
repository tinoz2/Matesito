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
        const { access_token, user } = req.body;
        console.log('Access Token:', access_token, 'User:', user);

        if (!code) {
            const authURL = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&state=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`;
            return res.redirect(authURL);
        }

        const tokenResponse = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        });

        const { access_token: newAccessToken } = tokenResponse.data;
        console.log('OAuth Response:', tokenResponse.data);

        const userFound = await User.findOne({ username: user });
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        userFound.mercadopagoAccessToken = newAccessToken;
        await userFound.save();

        res.json({ message: 'Cuenta de MercadoPago enlazada exitosamente!', access_token: newAccessToken });
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            console.error('Error request data:', error.request);
            res.status(500).json({ message: 'No se recibió respuesta de MercadoPago' });
        } else {
            console.error('Error message:', error.message);
            res.status(500).json({ message: error.message });
        }
        console.error('Error config:', error.config);
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