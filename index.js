const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();

// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas: ' + err);
  });

// Define a schema for your data
const dataSchema = new mongoose.Schema({
  road_id: String,
  entry_device: Boolean,
  license_plate: String,
  timestamp: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);


// Middleware to parse JSON data
app.use(bodyParser.json());

// Define the POST endpoint where your NodeMCU will send data
app.post('/add_license_plate', (req, res) => {
  const data = req.body;
  console.log(data);

  // Create a new document using the Data model
  const newData = new Data({
    road_id : data.road_id,
    entry_device: data.entry_device,
    license_plate: data.license_plate
  });

  try{
    // Save the document to the MongoDB collection
  newData.save()
  .then(() => {
    console.log('Data saved to MongoDB Atlas');
    res.status(200).json({ message: 'Data received and saved successfully' });
    return;
  })
  .catch(err => {
    console.error('Error saving data to MongoDB Atlas: ' + err);
    res.status(500).json({ message: 'Data saving failed' });
  });
  }
  catch(err){}
  
});

const port = 7023;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// licensePlateDB
// username : jello
// pw : diskey123

// ioeserveruser
// hvXjHwHKgWfZEF4k