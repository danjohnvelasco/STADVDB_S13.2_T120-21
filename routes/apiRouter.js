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
const conn = new mysql.createPool(config);

conn.on('connection', function (connection) {
  console.log("connection is made in the pool.");
});

router.get('/query1', (req, res) => {
    //“Movies that are released from [year] to [year] with a genre of [genre].”
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var genre = '%' + data.genre + '%';
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 

    conn.query('SELECT title, genre, year FROM movies WHERE genre LIKE ? AND year BETWEEN ? AND ? ORDER BY year LIMIT ?', [genre,parseInt(data.startYear),parseInt(data.endYear), limit], 
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
    // "Films from [country] in [Language] language released in [year] to [year]."
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var country = '%' + data.country + '%';
    var language = '%' + data.language + '%';
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT title, country, language, year FROM movies WHERE language LIKE ? AND country LIKE ? AND year BETWEEN ? AND ? ORDER BY year LIMIT ?', [language,country,parseInt(data.startYear),parseInt(data.endYear), limit], 
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
    //"Best Faces of a Country"
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT DISTINCT name, COUNT(names.imdb_name_id) AS "Number of Leading Roles" FROM names JOIN title_principals ON names.imdb_name_id = title_principals.imdb_name_id WHERE title_principals.ordering = 1 AND (title_principals.category = "actress" OR title_principals.category = "actor") GROUP BY names.imdb_name_id HAVING COUNT(*) > ? ORDER BY COUNT(names.imdb_name_id) DESC LIMIT ?',[parseInt(data.n_leadingroles), limit], 
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


router.get('/query4', (req, res) => {
    //“Film Performances in a Year”
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT DISTINCT m.title, r.weighted_average_vote AS rating FROM movies m CROSS JOIN ratings r ON m.imdb_title_id = r.imdb_title_id WHERE m.year = ? AND r.weighted_average_vote BETWEEN ? AND ? ORDER BY rating DESC LIMIT ?', [parseInt(data.year),parseInt(data.min_avg_vote),parseInt(data.max_avg_vote), limit], 
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


router.get('/query5', (req, res) => {
    //“Top 10 Most-casted actors/actresses of a Genre from a Year Interval in a Country”
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var country = '%' + data.country + '%';
    var genre = '%' + data.genre + '%';
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT n.name AS "Actor/Actress", COUNT(n.name) AS "Number of Romance Films casted from 2010-2020 in USA", MAX(m.year) AS "Year of Last Romance Movie" FROM movies m INNER JOIN title_principals p ON m.imdb_title_id = p.imdb_title_id AND (p.category = "actor" OR p.category = "actress") INNER JOIN names n ON p.imdb_name_id = n.imdb_name_id WHERE m.year >= ? AND m.year <= ? AND m.country LIKE ? AND m.genre LIKE ? GROUP BY n.name ORDER BY COUNT(n.name) DESC, MAX(m.year) DESC, n.name ASC LIMIT ?', [parseInt(data.startYear), parseInt(data.endYear), country, genre, limit], 
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


router.get('/query6', (req, res) => {
    //“Notable Foreign-born Directors of a Country”
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var country = '%' + data.country + '%';
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT n.name AS "Director", n.place_of_birth AS "Place of Birth", COUNT(n.name) AS "Number of Films Directed in the USA", MAX(m.year) AS "Year of Last Film" FROM movies m INNER JOIN title_principals p ON m.imdb_title_id = p.imdb_title_id AND p.category = "director" INNER JOIN names n ON p.imdb_name_id = n.imdb_name_id AND n.place_of_birth != "" AND n.place_of_birth NOT LIKE ? WHERE m.country LIKE ? GROUP BY n.name, n.place_of_birth ORDER BY COUNT(n.name) DESC, MAX(m.year) DESC, n.name ASC LIMIT ?', [country, country, limit],
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


router.get('/query7', (req, res) => {
    //"[Actors/Actresses] in the age group of [min age] to [max age] who have casted on a movie from [country] with an average rating from [min rating] to [max rating]."
    console.log("querying...");
    console.log(req.query.data);
    var data = req.query.data;
    var limit = parseInt(data.limit);
    limit = (isNaN(limit)) ? 1073741824 : limit; 
    conn.query('SELECT n.name AS "Name", t.category AS "Gender", COUNT(t.imdb_name_id) AS "Number of Roles" FROM names n LEFT JOIN title_principals t ON n.imdb_name_id = t.imdb_name_id LEFT JOIN movies m ON t.imdb_title_id = m.imdb_title_id LEFT JOIN ratings r ON m.imdb_title_id = r.imdb_title_id WHERE (t.category = "actor" OR t.category = "actress") AND (YEAR(NOW()) - YEAR(n.date_of_birth) >= ?) AND (YEAR(NOW()) - YEAR(n.date_of_birth) <= ?) AND m.country = ? AND (r.weighted_average_vote >= ?) AND (r.weighted_average_vote <= ?) GROUP BY t.imdb_name_id, t.category ORDER BY n.name LIMIT ?', [parseInt(data.minAge), parseInt(data.maxAge), data.country, parseInt(data.minRating), parseInt(data.maxRating), limit],
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
