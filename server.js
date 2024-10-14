const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

// Sirve archivos estáticos (como CSS)
app.use(express.static(path.join(__dirname, 'public')));  // Asegúrate de que la carpeta 'public' contiene tus archivos CSS y otros recursos estáticos

// Usar rutas de autenticación
app.use('/api/usuarios', authRoutes);

// Rutas para servir las páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'registro.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});