const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/turbovote', (req, response) => {
  const {state, place} = req.query;

  // Check if city comes through the request
  const placeCheck = place && place!=="" ? `/place:${place}` : '';

  // OCD-ID's
  const stateOCD_ID = `ocd-division/country:us/state:${state}`;
  const cityOCD_ID = `ocd-division/country:us/state:${state}${placeCheck}`;
  
  // Convert to JSON from EDN
  const options = {
    headers: {
      'Accept': 'application/json'
    }
  };

  // URL with appended OCD-ID's
  const url = `https://api.turbovote.org/elections/upcoming?district-divisions=${stateOCD_ID},${cityOCD_ID}`;
  https.get(url, options, (res) => {
    const bodyChunks = [];
    res
      .on('data', chunk => {
        bodyChunks.push(chunk);
      })
      .on('end', () => response.send(Buffer.concat(bodyChunks)));
  
    // Error handler
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

