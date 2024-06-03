import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

export const register = async (req, res) => {
    try {
        const { user, email, password, topic } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ user, email, topic, password: hashPassword })
        jwt.sign({
            id: newUser._id
        }, 'secretKey123', {
            expiresIn: '1d'
        }, (error, token) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error al generar el token' })
            }
            res.cookie('token', token, { httpOnly: true })
            res.json({
                id: newUser._id,
                user: newUser.user,
                email: newUser.email,
                topic: newUser.topic,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' })
        }
        jwt.sign({
            id: user._id
        }, 'secretKey123', {
            expiresIn: '1d'
        }, (error, token) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error al generar el token' })
            }
            res.cookie('token', token, { httpOnly: true })
            res.json({
                id: user._id,
                user: user.user,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Sesión cerrada correctamente' })
}

export const profile = async (req, res) => {
    try {
        const { username } = req.params
        const userFound = await User.findOne({ user: username })

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        return res.json({
            id: userFound._id,
            user: userFound.user,
            topic: userFound.topic,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const users = async (req, res) => {
    try {
        const userFound = await User.find()

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        return res.json({userFound})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logged = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id)

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        return res.json({
            id: userFound._id,
            user: userFound.user,
            topic: userFound.topic,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}