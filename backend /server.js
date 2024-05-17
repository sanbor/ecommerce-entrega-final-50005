const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

app.use(express.json());
app.use('/api', usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
