const router = require('express').Router();
const mysql = require('mysql');

// database connection config
var config =
{
    host: 'mco1.mysql.database.azure.com',
    user: 'sandbox@mco1',
    password: 'P@ssword',
    database: 'imdb',
    port: 3306,
    ssl: true
};

// create connection object
const conn = new mysql.createConnection(config);

// establish connection to database
function connect() {
  conn.connect(
      function (err) { 
      if (err) { 
          console.log("!!! Cannot connect !!! Error:");
          throw err;
      }
      else
      {
          console.log("Connection established.");
      }
  });
}

function disconnect() {
  conn.end(
      function (err) { 
          if (err) throw err;
          else  console.log('Closing connection.') 
  });
}

connect();
// ROUTES
router.get('/read', function readData(req, res) {
    conn.query('SELECT * FROM names LIMIT 2', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            res.send(results);
            console.log('Done.');
        })
  }
);

module.exports = router;
