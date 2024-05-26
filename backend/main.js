const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');

const app = express();
const PORT = 3001;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('¡prueba si funciona!');
});

// Rutas de usuarios y productos
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a la base de datos de MongoDB');
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('Error al conectar a la base de datos', err);
});
