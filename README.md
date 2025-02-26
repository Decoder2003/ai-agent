# Natural Language to SQL API

This project is a REST API built with Node.js and Express that converts natural language queries into SQL statements using Google's Gemini AI and executes them on a MySQL database.
![Alt text](%7B5D50D9EB-B172-4CA2-BE3F-E0152B4CEA17%7D.png)

## Features

- Convert natural language queries into SQL statements
- Execute generated SQL queries on a MySQL database
- Return the results as a JSON response

## Technologies Used

- Node.js
- Express.js
- MySQL (mysql2 package)
- Google's Gemini AI API
- Axios
- dotenv (for environment variables management)

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MySQL database configured
- Google Gemini AI API key

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```env
   DB_HOST=<your-mysql-host>
   DB_USER=<your-mysql-username>
   DB_PASSWORD=<your-mysql-password>
   DB_NAME=<your-database-name>
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

### Running the Application

Start the server:

```sh
node index.js
```

The server will run on port `5000` by default.

## API Endpoints

### Convert Natural Language to SQL and Execute Query

**Endpoint:** `POST /query`

**Request Body:**

```json
{
  "query": "Show all users who registered last week"
}
```

**Response:**

```json
{
  "sql": "SELECT * FROM users WHERE registration_date >= NOW() - INTERVAL 7 DAY;",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "registration_date": "2024-02-20"
    }
  ]
}
```

## Error Handling

If the API encounters an error, it returns a response with an error message:

```json
{
  "error": "Internal Server Error"
}
```

## License

This project is open-source and available under the MIT License.
