import jwt from 'jsonwebtoken';
import User from "../models/authModel.js";
const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Acceso denegado');

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findByPk(decoded.userId, {
          attributes: { exclude: ['password'] } // Excluir la contraseña
        });

        if (!user) {
          return res.status(404).send('Usuario no encontrado');
        }

        req.user = user; // Asegúrate de que esté imprimiendo el usuario correctamente
        next();
    } catch (error) {
        console.error('Error al autenticar token:', error);
        res.status(400).send('Token inválido');
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.sendStatus(403);
    }
};

export { authenticateToken, authenticateAdmin };
