import dotenv from 'dotenv';
import axios from 'axios';
import User from '../schemas/User.js'

dotenv.config();

const CLIENT_ID = '212521077347976'
const CLIENT_SECRET = 'X4kFm7KUQ14NcaHu5JemnZHJUYomvIjb'
const REDIRECT_URI = 'https://matesito-production.up.railway.app/mp/callback'

const cuentaMercadoPago = async (req, res) => {
    try {
        const { code } = req.query;
        console.log(code)

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
        console.log(response)

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
        const { userId } = req.body;
        console.log(userId)
        const response = await axios.post('https://api.mercadopago.com/v1/oauth/token/revoke', {
            user_id: userId,
            client_id: process.env.MERCADOPAGO_CLIENT_ID,
            client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
        });
        
        await deleteMercadoPagoAuthorization(userId);

        // Responde con éxito
        res.status(200).json({ message: 'Revocación de acceso exitosa' });
    } catch (error) {
        console.error('Error al revocar el acceso a Mercado Pago:', error);
        res.status(500).json({ message: 'Error al revocar el acceso a Mercado Pago' });
    }
};

export default cuentaMercadoPago;