
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
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
