// controllers/userController.js

const User = require('../models/User');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        // Extraire les données de la requête
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        // Répondre avec l'utilisateur créé
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Supprimer un utilisateur par son ID
exports.deleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Mettre à jour un utilisateur par son ID
exports.updateUserById = async (req, res) => {
    try {
        // Extraire l'ID de l'utilisateur à mettre à jour
        const userId = req.params.id;

        // Vérifier si l'utilisateur existe dans la base de données
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Mettre à jour les informations de l'utilisateur avec les données de la requête
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        // Enregistrer les modifications dans la base de données
        await user.save();

        // Répondre avec l'utilisateur mis à jour
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Pagination et recherche
exports.getAllUsers = async (req, res) => {
    try {
        // Paramètres de pagination
        const page = parseInt(req.query.page) || 1; // Numéro de la page
        const limit = parseInt(req.query.limit) || 10; // Nombre d'utilisateurs par page
        const skip = (page - 1) * limit; // Nombre de résultats à sauter

        // Paramètres de recherche
        const searchTerm = req.query.search; // Terme de recherche

        // Condition de recherche
        const searchCondition = searchTerm ? { $or: [{ username: { $regex: searchTerm, $options: 'i' } }, { email: { $regex: searchTerm, $options: 'i' } }] } : {};

        // Récupérer la liste paginée des utilisateurs depuis la base de données en utilisant la recherche
        const users = await User.find(searchCondition).skip(skip).limit(limit);

        // Compter le nombre total d'utilisateurs qui correspondent à la recherche
        const totalCount = await User.countDocuments(searchCondition);

        // Répondre avec les utilisateurs paginés
        res.json({
            totalUsers: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};