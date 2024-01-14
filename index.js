import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { OpenAI } from "openai";

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

// OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// AI agent to convert natural language to SQL
async function convertToSQL(query) {
    const prompt = `Convert the following natural language query into SQL:\n\n"${query}"\n\nSQL Query:`;
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0,
    });

    return response.choices[0].message.content.trim();
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
