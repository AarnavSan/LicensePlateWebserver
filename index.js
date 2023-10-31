const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const pool = require('./sqlpool').pool;

const licenseEntrySQL = 'INSERT INTO toll_system(road_id,entry_device,license_plate,time_of_creation) VALUES';

var asyncSqlFunc = function (data) {
  return new Promise((resolve, reject) => {
      pool.query(data[0], data[1], function (err, results) {
          if (err) {
              console.log("SQL ERORR");
              console.log(err);
              return reject(err);
          }
          else {
              return resolve(results[0]);
          }
      })
  });
}

// Middleware to parse JSON data
app.use(bodyParser.json());

// Define the POST endpoint where your NodeMCU will send data
app.post('/add_license_plate', (req, res) => {
  const data = req.body;
  var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  
  data["timestamp"] = datetime;

  // Handle the incoming data
  console.log('Received data:', data);
  pool.query(bothRegSQL + '(?,?,?,?,?,?,?,?,?,?,NOW());', data,
                    function (err, result, fields) {
                        if (err) {
                            console.log('[MySQL ERROR]', err);
                            res.json('Register Error: ', err);
                            next();
                        }
                        res.json(p);
                    });

  // You can process the data here and send a response if needed
  res.status(200).json({ message: 'Data received successfully' });
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
