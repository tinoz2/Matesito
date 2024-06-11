import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const validateToken = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token)
        return res.status(401).json({ message: 'Token no encontrado' })

    jwt.verify(token, 'secretKey123', (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });

}

export default validateToken