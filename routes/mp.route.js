import express from 'express'
import cuentaMercadoPago, { checkoutMercadoPago } from '../controllers/mercadopago.js'
import validateToken from '../middlewares/validateToken.js'
const router = express.Router()

router.route('/callback')
    .get(validateToken, cuentaMercadoPago)
    .post(validateToken, cuentaMercadoPago);

router.post('/checkout', checkoutMercadoPago)

export default router