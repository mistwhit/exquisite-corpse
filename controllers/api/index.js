const router = require('express').Router();
const userRoutes = require('./userRoutes');
const fragmentRoutes = require('./fragmentRoutes');

router.use('/users', userRoutes);
router.use('/fragments', fragmentRoutes);

module.exports = router;
