const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el correo electrónico sea único en la base de datos
    },
    password: {
        type: String,
        required: true, // La contraseña es obligatoria
    },
});

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Método para generar un token JWT para el usuario
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, 'tu_secreto', { expiresIn: '1h' });
    return token;
};

// Middleware que se ejecuta antes de guardar el usuario
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, no hace nada
    this.password = await bcrypt.hash(this.password, 10); // Hash de la contraseña
    next(); // Continúa con la siguiente función de middleware
});

// Modelo de usuario basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Exportar el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
