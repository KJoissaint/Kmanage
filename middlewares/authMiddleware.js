middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');

module.exports = (req, res, next) => {
    // Récupérer le token du header Authorization
    const token = req.header('Authorization');

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Vérifier le token
        const decoded = verifyToken(token.split(' ')[1]);

        // Ajouter l'utilisateur à la requête
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
