const router = require('express').Router();
const { Pool } = require('pg');

const config = {
  connectionString: process.env.DATABASE_URL || "postgres://sphmyheekvkmkh:68da2547e4320a66c08d0ba54d71ab645f674448a10e26948b52301fbef85cca@ec2-52-72-162-207.compute-1.amazonaws.com:5432/d95t784mc5q4ao",
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(config);


router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      //res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

module.exports = router;
