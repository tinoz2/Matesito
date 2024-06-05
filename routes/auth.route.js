import express from 'express'
const router = express.Router()
import { login, register, profile, logout, users, logged } from "../controllers/auth.js"
import validateToken from '../middlewares/validateToken.js'

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/profile/:username', validateToken, profile)

router.get('/logged', validateToken, logged)

router.get('/users', users)

export default router