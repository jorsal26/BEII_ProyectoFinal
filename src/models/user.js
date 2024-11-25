const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollection = "usuarios";

const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

// Middleware para encriptar contraseña
userSchema.pre('save', function(next) {
if (!this.isModified('password')) return next();

const salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt);
next();
});

const user = mongoose.model(userCollection, userSchema);

module.exports = user;
