import express from 'express'
import cuentaMercadoPago, { checkoutMercadoPago } from '../controllers/mercadopago.js'
const router = express.Router()

router.get('/callback', cuentaMercadoPago);
router.post('/callback', cuentaMercadoPago);

router.post('/checkout', checkoutMercadoPago)

export default router