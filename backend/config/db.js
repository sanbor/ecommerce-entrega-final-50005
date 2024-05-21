const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017"; // Asegúrate de que esta URI sea correcta
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        // Selecciona la base de datos
        const db = client.db('mydatabase');
        return db;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = connect;
