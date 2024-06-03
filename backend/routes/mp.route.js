import express from 'express'
import cuentaMercadoPago from '../controllers/mercadopago.js'
const router = express.Router()

router.get('/callback', cuentaMercadoPago)

export default router