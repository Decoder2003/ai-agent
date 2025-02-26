const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(express.json());

// MySQL Database Connection
async function initializeDB() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

// Gemini API
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// AI agent to convert natural language to SQL
async function convertToSQL(query) {
    const prompt = `Convert the following natural language query into SQL (need no explanation just query only):\n\n"${query}"\n\nSQL Query:`;

    const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        }
    );

    let text = response.data.candidates[0].content.parts[0].text.trim();
    return text.replace(/```sql|```/g, "").trim();
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

(async () => {
    global.db = await initializeDB();

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();