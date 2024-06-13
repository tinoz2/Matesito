import express from 'express'
import cuentaMercadoPago, { checkoutMercadoPago } from '../controllers/mercadopago.js'
import validateToken from '../middlewares/validateToken.js'
const router = express.Router()

router.get('/callback', cuentaMercadoPago);
router.post('/callback', cuentaMercadoPago);

router.post('/checkout', validateToken, checkoutMercadoPago)

export default router