import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

var app = express();

// Добавяне на middleware за парсване на JSON данни
app.use(express.json());

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vbanchevf08!',
    database: 'people'
});

app.get('/members', async function(req, res) {
    const [members, fields] = await connection.query("SELECT * FROM `people`");
    res.send({ members });
});

app.post('/members', async function (req, res) {
    const { peopleName } = req.body; // Извличане на peopleName от тялото на заявката
    const [result] = await connection.query(`INSERT INTO people (peopleName) VALUES (?)`, [peopleName]);
    res.send({ result });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server Started!");
});
