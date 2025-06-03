const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com');
    res.json({ data: response.data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from GitHub API' });
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
