const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');


//take model routes and embed the corresponding prefix.
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;