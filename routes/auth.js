const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Verifica que la ruta sea correcta

// Ruta para registrarse
router.post('/registro', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar contraseñas
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = user.generateAuthToken();

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
// Ruta para registrar árbitros
router.post('/registro-arbitro', async (req, res) => {
    const { name, age, experience, phone, email } = req.body;

    try {
        // Validaciones (puedes personalizarlas)
        if (!name || !age || !experience || !phone || !email) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        // Crea un nuevo árbitro
        const newReferee = new Referee({
            name,
            age,
            experience,
            phone,
            email
        });

        // Guarda el árbitro en la base de datos
        await newReferee.save();
        res.status(201).json({ message: 'Árbitro registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar árbitro:', error);
        res.status(500).json({ message: 'Error al registrar árbitro.' });
    }
});

module.exports = router;