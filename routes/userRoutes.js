// Importer express et le routeur
const express = require('express');
const router = express.Router();

// Importer le contrôleur des utilisateurs
const { getAllUsers, getUserById, createUser, deleteUserById, updateUserById } = require('../controllers/userController');

// GET api/users
router.get('/', getAllUsers);

// GET api/users/:id
router.get('/:id', getUserById);

// POST api/users
router.post('/', createUser);

// DELETE api/users/:id
router.delete('/:id', deleteUserById);

// PUT/PATCH api/users/:id
router.put('/:id', updateUserById);
router.patch('/:id', updateUserById);

// Exporter le routeur
module.exports = router;
