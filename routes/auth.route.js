import express from 'express'
const router = express.Router()
import { login, register, profile, logout, users, logged } from "../controllers/auth.js"
import validateToken from '../middlewares/validateToken.js'
import { authLogin, authRegister } from '../middlewares/validateUsers.js'
import validateAuth from '../middlewares/validateAuth.js'

router.post('/register', validateAuth(authRegister), register)

router.post('/login', validateAuth(authLogin), login)

router.post('/logout', logout)

router.get('/profile/:username', profile)

router.get('/logged', validateToken, logged)

router.get('/users', users)

export default router