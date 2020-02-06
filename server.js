const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


https.get('https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:co', (res) => {
  let data = '';
  console.log('statusCode:', res.statusCode);

  // A chunk of data has been recieved.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  res.on('end', () => {
    res.send({data: data})
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.get('/api/turbovote', function(req, res){

});

app.listen(port, () => console.log(`Listening on port ${port}`));

