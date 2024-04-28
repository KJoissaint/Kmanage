const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Avant de lancer les tests, assurez-vous de nettoyer la base de données
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Après les tests, déconnectez-vous de la base de données
afterAll(async () => {
    await mongoose.disconnect();
});

describe('GET /api/users', () => {
    it('responds with JSON array', (done) => {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/users', () => {
    it('creates a new user', (done) => {
        request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'testpassword' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});

describe('DELETE /api/users/:id', () => {
    let userId;

    beforeAll(async () => {
        // Créer un nouvel utilisateur pour les tests
        const response = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'testpassword' })
            .set('Accept', 'application/json');

        // Stocker l'ID de l'utilisateur créé pour le test
        userId = response.body._id;
    });

    it('deletes a user by ID', (done) => {
        request(app)
            .delete(`/api/users/${userId}`)
            .expect(200, done);
    });
});

// Ajoutez d'autres tests selon vos besoins
