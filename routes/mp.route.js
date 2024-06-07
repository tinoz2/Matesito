import express from 'express'
import cuentaMercadoPago, { disconnectMercadoPago } from '../controllers/mercadopago.js'
const router = express.Router()

router.get('/callback', cuentaMercadoPago)

router.post('/disconnect', disconnectMercadoPago)

export default router