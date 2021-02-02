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
    console.log(req.query.data);
    var data = req.query.data;
    var year = parseInt(data.year);

    conn.query('SELECT c.customer_state AS "State", QUARTER(o.order_purchase_timestamp) AS "Quarter Of Purchase", p.product_category_name AS "Product Category", sum(s.unit_sales) AS "Unit Sales" FROM customers c INNER JOIN sales s ON c.customer_id = s.customer_id INNER JOIN products p ON s.product_id = p.product_id INNER JOIN orders o ON s.order_id = o.order_id WHERE YEAR(o.order_purchase_timestamp) = ? GROUP BY c.customer_state, QUARTER(o.order_purchase_timestamp), p.product_category_name WITH ROLLUP ORDER BY c.customer_state ASC, QUARTER(o.order_purchase_timestamp) ASC, sum(s.unit_sales) DESC;', [year],
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
    console.log("querying /query2...");
    console.log(req.query.data);
    var data = req.query.data;
    var year = parseInt(data.year);
    var state = data.state;

    conn.query('SELECT c.customer_city AS "City", MONTH(o.order_purchase_timestamp) AS "Month Of Purchase", p.product_category_name AS "Product Category", sum(s.unit_sales) AS "Unit Sales" FROM customers c INNER JOIN sales s ON c.customer_id = s.customer_id INNER JOIN products p ON s.product_id = p.product_id INNER JOIN orders o ON s.order_id = o.order_id WHERE c.customer_state = ? AND YEAR(o.order_purchase_timestamp) = ? GROUP BY c.customer_city, MONTH(o.order_purchase_timestamp), p.product_category_name WITH ROLLUP;', [state, year],
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

router.get('/getUniqueStates', (req, res) => {
    //slice
    console.log("querying /getUniqueStates...");

    conn.query('SELECT DISTINCT customer_state from customers',
    function (err, results, fields) {
        if (err) {
            console.error(err);
            res.json([{id:1, error: "Query failed. Check your inputs."}]);
        }
        else {
            console.log('Selected ' + results.length + ' row(s).');
            var x;
            for (var i = 0; i < results.length; i++) {
                x =  results[i]['customer_state'];
                results[i].id = x
                results[i]['text'] = x;
                delete results[i]['customer_state'];
            }

            res.json({"results": results});
        }
        console.log("Query function done.");
    })
});

router.get('/getUniqueCities', (req, res) => {
    //slice
    console.log("querying /getUniqueCities...");
    
    conn.query('SELECT DISTINCT customer_city from customers AS text',
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
