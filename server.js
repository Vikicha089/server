import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';  // Импорт на cors

const app = express();

// Добавяне на middleware за CORS
app.use(cors()); // Позволява CORS за всички маршрути

// Добавяне на middleware за парсване на JSON данни
app.use(express.json());

const startServer = async () => {
    const connection = await mysql.createConnection({
        host: 'https://1d4a-212-5-158-6.ngrok-free.app',
        user: 'root',
        password: 'Vbanchevf08!',
        database: 'people'
    });

    app.get('/members', async function(req, res) {
        try {
            const [members, fields] = await connection.query("SELECT * FROM `people`");
            res.send({ members });
        } catch (error) {
            console.error("Error fetching members:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    app.post('/members', async function (req, res) {
        try {
            const { peopleName } = req.body;

            // Проверка дали peopleName не е undefined или празен
            if (!peopleName) {
                return res.status(400).send({ error: 'peopleName is required' });
            }

            const [result] = await connection.query(`INSERT INTO people (peopleName) VALUES (?)`, [peopleName]);
            res.send({ result });
        } catch (error) {
            console.error("Error inserting member:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    app.listen(process.env.PORT || 3000, function() {
        console.log("Server Started!");
    });
};

// Стартиране на сървъра
startServer().catch(err => {
    console.error("Error starting server:", err);
});
