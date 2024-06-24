const jwt = require('jsonwebtoken');
dotenv.config();
const secretKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Acceso denegado');
    
    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Token inválido');
    }
};
