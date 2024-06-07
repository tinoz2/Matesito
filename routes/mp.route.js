import express from 'express'
import cuentaMercadoPago, { disconnectMercadoPago } from '../controllers/mercadopago.js'
const router = express.Router()

router.route('/callback')
    .get(cuentaMercadoPago)
    .post(cuentaMercadoPago);

router.post('/disconnect', disconnectMercadoPago)

export default router