import express from 'express'
import cuentaMercadoPago, { disconnectMercadoPago } from '../controllers/mercadopago.js'
import validateToken from '../middlewares/validateToken.js'
const router = express.Router()

router.get('/callback', validateToken, cuentaMercadoPago)

router.post('/disconnect', disconnectMercadoPago)

export default router