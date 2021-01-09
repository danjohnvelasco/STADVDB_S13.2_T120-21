const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('home.html');
});

module.exports = router;