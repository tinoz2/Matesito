import express from 'express'
import cuentaMercadoPago, { checkoutMercadoPago } from '../controllers/mercadopago.js'
const router = express.Router()

router.route('/callback')
    .get(cuentaMercadoPago)
    .post(cuentaMercadoPago);

router.post('/checkout', checkoutMercadoPago)

export default router