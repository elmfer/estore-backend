const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// If no API routes are hit, send message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;