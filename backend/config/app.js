const { MongoClient } = require('mongodb');

// Carga las variables de entorno
require('dotenv').config();

// Obtén la URI de la base de datos desde las variables de entorno
const uri = process.env.MONGO_URI;

// Crea una instancia del cliente de MongoDB
const client = new MongoClient(uri);

// Función asincrónica para conectar a la base de datos
async function connect() {
    try {
        // Conecta al servidor de MongoDB
        await client.connect();
        console.log("Conectado a la base de datos de MongoDB");
        // Selecciona la base de datos
        const db = client.db();
        return db;
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
    }
}

// Exporta la función de conexión para que pueda ser utilizada en otros archivos
module.exports = connect;
