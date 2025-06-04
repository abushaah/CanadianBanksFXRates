const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// These are constants set for the RBC API
const BASE_CURRENCY = 'CAD';
const AMOUNT = 100;

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

app.get('/bmo', async (req, res) => {
  try {
    const response = await axios.get('https://www.bmo.com/bmocda/templates/json_fx_include.jsp');
    res.json({ data: response });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch from BMO ${err}` });
  }
});

app.get('/scotia', async (req, res) => {
  try {
    const response = await axios.get('https://dmtsms.scotiabank.com/api/rates/fxr');
    res.json({ data: response.data });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch from Scotia ${err}` });
  }
});

app.get('/rbc', async (req, res) => {
  try {
    const currency = await axios.get('https://apps.royalbank.com/apps/foreign-exchange-calculator/api/rates/currencies?do=currencies');

    const results = [];
    const trades = new Set([...currency.buy, ...currency.sell]);

    for (const code of trades) {
      try {
        const response = await axios.get('https://apps.royalbank.com/apps/foreign-exchange-calculator/api/rates/currencies', {
          params: {
            do: 'conv',
            from: BASE_CURRENCY,
            to: code,
            trade: 'sell',
            amount: AMOUNT
          }
        });

        const { frate, trate } = response.data;
        results.push({
          CURRENCY_CODE: code,
          CLIENT_BUY: frate,
          CLIENT_SELL: trate
        });
      } catch (err) {
        console.error(`Failed for ${code}:`, err.message);
      }
    }
    res.json({ data: trades });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch from RBC ${err}` });
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
