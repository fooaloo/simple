const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url=');
  try {
    const response = await axios.get(targetUrl);
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error fetching: ' + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy server running');
});
