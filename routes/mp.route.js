import express from 'express'
import cuentaMercadoPago, { checkoutMercadoPago, successMP, cancelMP, token } from '../controllers/mercadopago.js'
import validateToken from '../middlewares/validateToken.js'
const router = express.Router()

router.get('/callback', cuentaMercadoPago);
router.post('/callback', cuentaMercadoPago);

router.post('/checkout', validateToken, checkoutMercadoPago)

router.get('/token', validateToken, token)

router.get('/success', successMP)

router.get('/cancel', cancelMP)

export default router