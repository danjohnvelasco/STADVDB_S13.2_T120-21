const router = require('express').Router();
const mysql = require('mysql');

// database connection config

var config =
{
    host: 'mco2.mysql.database.azure.com',
    user: 'mco2@mco2',
    password: 'p@ssword123',
    database: 'olist',
    port: 3306,
    ssl: true
};

// create connection object
const conn = new mysql.createPool(config);

conn.on('connection', function (connection) {
  console.log("connection is made in the pool.");
});



router.get('/query1', (req, res) => {
    //drill down
    console.log("querying...");

    conn.query('SELECT sl.seller_state AS "State", p.product_category_name AS "Product Category", sl.seller_id AS "Seller ID", sum(s.unit_sales) AS "Total Unit Sales" FROM sellers sl INNER JOIN sales s ON sl.seller_id = s.seller_id INNER JOIN products p ON s.product_id = p.product_id GROUP BY sl.seller_state, p.product_category_name, sl.seller_id WITH ROLLUP',
    function (err, results, fields) {
        if (err) {
            console.error(err);
            res.json([{id:1, error: "Query failed. Check your inputs."}]);
        }
        else {
            console.log('Selected ' + results.length + ' row(s).');
            res.send(results);
        }
        console.log("Query function done.");
    })
});

router.get('/query2', (req, res) => {
    //drill down
    console.log("querying...");

    conn.query('SELECT p.product_category_name AS "Product Category", QUARTER(s.order_approved_at) AS "QUARTER", c.customer_state AS "STATE", c.customer_city  AS "CITY", sum(s.unit_sales) AS "Total Unit Sales" FROM sales s JOIN products p ON s.product_id = p.product_id JOIN customers c ON s.customer_id = c.customer_id GROUP BY p.product_category_name, QUARTER(s.order_approved_at), c.customer_state, c.customer_city WITH ROLLUP;',
    function (err, results, fields) {
        if (err) {
            console.error(err);
            res.json([{id:1, error: "Query failed. Check your inputs."}]);
        }
        else {
            console.log('Selected ' + results.length + ' row(s).');
            res.send(results);
        }
        console.log("Query function done.");
    })
});

router.get('/query3', (req, res) => {
    //slice
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var quarter = parseInt(data.quarter);
    conn.query('SELECT QUARTER(s.order_approved_at) AS "quarter", p.product_category_name AS "product category", SUM(s.total_sales) AS "total sales" FROM sales s JOIN products p ON s.product_id = p.product_id WHERE QUARTER(s.order_approved_at) = ? GROUP BY QUARTER(s.order_approved_at), p.product_category_name', [quarter],
    function (err, results, fields) {
        if (err) {
            console.error(err);
            res.json([{id:1, error: "Query failed. Check your inputs."}]);
        }
        else {
            console.log('Selected ' + results.length + ' row(s).');
            res.send(results);
        }
        console.log("Query function done.");
    })
});

// TOO SLOW OR BIG
router.get('/query4', (req, res) => {
    //slice
    console.log("querying...");

    conn.query('SELECT customer_state, product_category_name, SUM(unit_sales) AS "unit_sales" FROM sales JOIN products ON product_id JOIN orders ON order_id JOIN customers ON customer_id WHERE order_status = "delivered" AND product_category = "X" AND (state = "Y" OR state = "Z") GROUP BY state, product_category_name',
    function (err, results, fields) {
        if (err) {
            console.error(err);
            res.json([{id:1, error: "Query failed. Check your inputs."}]);
        }
        else {
            console.log('Selected ' + results.length + ' row(s).');
            res.send(results);
        }
        console.log("Query function done.");
    })
});





module.exports = router;
