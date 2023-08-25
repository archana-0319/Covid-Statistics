const express = require('express')
const app = express()
const bodyParser = require("body-parser");
require('dotenv').config();
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { connection } = require('./connector')
const { data } = require('./data');

app.get('/totalRecovered', (req, res) => {
    const totalRecovered = data.reduce((acc, stateData) => acc + stateData.recovered, 0);
    res.json({ data: { _id: 'total', recovered: totalRecovered } });
  });
  
  app.get('/totalActive', (req, res) => {
    const totalActive = data.reduce((acc, stateData) => acc + (stateData.infected - stateData.recovered), 0);
    res.json({ data: { _id: 'total', active: totalActive } });
  });
  
  app.get('/totalDeath', (req, res) => {
    const totalDeath = data.reduce((acc, stateData) => acc + stateData.death, 0);
    res.json({ data: { _id: 'total', death: totalDeath } });
  });
  
  app.get('/hotspotStates', (req, res) => {
    const hotspotStates = data.filter(stateData => {
      const rate = (stateData.infected - stateData.recovered) / stateData.infected;
      return rate > 0.1;
    }).map(stateData => ({
      state: stateData.state,
      rate: parseFloat((stateData.infected - stateData.recovered) / stateData.infected).toFixed(5)
    }));
  
    res.json({ data: hotspotStates });
  });
  
  app.get('/healthyStates', (req, res) => {
    const healthyStates = data.filter(stateData => {
      const mortality = stateData.death / stateData.infected;
      return mortality < 0.005;
    }).map(stateData => ({
      state: stateData.state,
      mortality: parseFloat(stateData.death / stateData.infected).toFixed(5)
    }));
  
    res.json({ data: healthyStates });
  });


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;



// 
// URLs :  curl http://localhost:8080/totalRecovered  in Terminal..
//               http://localhost:8080/totalRecovered - In PostMan .. 