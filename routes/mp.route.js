import express from 'express'
import cuentaMercadoPago from '../controllers/mercadopago.js'
const router = express.Router()
import validateToken from '../middlewares/validateToken.js'

router.get('/callback', validateToken, cuentaMercadoPago)

export default router