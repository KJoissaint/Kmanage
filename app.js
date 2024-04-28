// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');

// Initialisation de l'application Express
const app = express();

// Connexion à MongoDB
connectDB();

// Limitationn du nombre des requêtes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // On limite à 100 requêtes par Ip
    message: 'Too many requests from this IP, please try again later'
});

// Appliquer le rate limiting à toutes les routes
app.use(limiter);

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Route pour la racine de l'API
app.get('/', (req, res) => {
    res.send('Bienvenue sur KManage!');
});

// Port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;