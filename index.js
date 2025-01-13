import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

// MySQL Database Connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// AI agent to convert natural language to SQL
async function convertToSQL(query) {
    const response = await axios.post('http://localhost:11434/api/generate', {
        model: "mistral",
        prompt: `Convert to SQL: "${query}"`,
    });

    return response.data.response.trim();
}

// Route to process user query
app.post("/query", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query is required" });

        // Convert to SQL
        const sqlQuery = await convertToSQL(query);
        console.log("Generated SQL:", sqlQuery);

        // Execute SQL Query
        const [rows] = await db.execute(sqlQuery);
        res.json({ sql: sqlQuery, data: rows });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
