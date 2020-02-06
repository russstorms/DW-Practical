const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/turbovote', (req, response) => {
  const odcID = req.name
  const options = {
    headers: {
      'Accept': 'application/json'
    }
  };
  const url = `https://api.turbovote.org/elections/upcoming?${odcID}`;
  https.get(url, options, (res) => {
    const bodyChunks = [];
    res
      .on('data', chunk => {
        bodyChunks.push(chunk);
      })
      .on('end', () => response.send(Buffer.concat(bodyChunks)));
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

