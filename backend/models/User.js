
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    rol: { type: String, enum: ['user', 'admin', 'premium'], default: 'user' },
    lastConnection: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
