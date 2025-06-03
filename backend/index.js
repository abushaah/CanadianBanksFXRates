const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com');
    res.json({ data: response.data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from GitHub API' });
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
