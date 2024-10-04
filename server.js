const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Asegúrate de que esta ruta sea correcta
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
const mongoURI = 'mongodb+srv://olired2:futbol7@cluster0.qfdl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB Atlas:', error);
    });

// Usar rutas de autenticación
app.use('/api/usuarios', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Conexión a MongoDB Atlas exitosa!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});