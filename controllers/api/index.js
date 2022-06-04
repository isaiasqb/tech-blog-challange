const router = require('express').Router();

const userRoutes = require('./user-routes.js');


//take model routes and embed the corresponding prefix.
router.use('/users', userRoutes);

module.exports = router;