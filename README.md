# AI Agent for Natural Language to SQL Conversion 😇

This project is a Node.js-based API that uses an AI agent to convert natural language queries into SQL using OpenAI's GPT model and executes them on a MySQL database.

![Alt text](%7B2FB3A670-BF1D-4F40-80D5-7FDC1B3CF511%7D.png)

## Features 🚀

- AI agent to convert user-friendly natural language queries into SQL
- Execute generated SQL queries on a MySQL database
- Retrieve and return query results in JSON format

## Technologies Used 💾

- Node.js
- Express.js
- MySQL (with `mysql2` package)
- OpenAI API
- dotenv for environment variable management

## Installation ⛏️

1. Clone the repository:
   ```sh
   git clone https://github.com/Decoder2003/ai-agent
   cd ai-agent
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```sh
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   OPENAI_API_KEY=your_openai_api_key
   ```

## Usage ✨

1. Start the server:

   ```sh
   node index.js
   ```

   or with nodemon (if installed):

   ```sh
   nodemon index.js
   ```

2. Make a `POST` request to the `/query` endpoint with a natural language query:

   ```json
   {
     "query": "Show all employees with a salary greater than 50000"
   }
   ```

3. Response example:
   ```json
   {
     "sql": "SELECT * FROM employees WHERE salary > 50000;",
     "data": [
       { "id": 1, "name": "John Doe", "salary": 60000 },
       { "id": 2, "name": "Jane Smith", "salary": 75000 }
     ]
   }
   ```

## Endpoints

| Method | Endpoint | Description                                                                 |
| ------ | -------- | --------------------------------------------------------------------------- |
| POST   | `/query` | Uses an AI agent to convert a natural language query to SQL and executes it |
