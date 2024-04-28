// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Supprimer l'option useNewUrlParser obsolète
            useUnifiedTopology: true,
        });
        console.log('Connected to mongo');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;