const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 4000; 

app.use(cors({ origin: 'http://localhost:3000' }));
app.get('/image-proxy', async (req, res) => {
  try {
    const imagePath = req.query.path;
    if (!imagePath) {
      return res.status(400).send('Image path is required');
    }

    const imageUrl = `https://image.tmdb.org/t/p/w185${imagePath}`;

    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);

  } catch (error) {
    console.error('Failed to fetch image:', error.message);
    res.status(500).send('Failed to fetch image');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});