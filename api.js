const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json());

const map = new Map();

app.get("/sensor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sensorData = map.get(id);
  if (sensorData == null) {
    res.json({ error: "No data found" });
  } else {
    res.json({ sensorId: id, sensorData: sensorData });
  }
});

app.post("/sensor", (req, res) => {  
    console.log('Got body:', req.body);
    const data = req.body;
    console.log(data.sensorId);
    const sensorData = {
      distanceCm: data.distanceCm,
      timestamp: new Date().toISOString(), 
    }
    map.set(data.sensorId, sensorData);
    res.send(200);  
});

app.listen(8000, () => {
  console.log("API server started on port 8000");
});
