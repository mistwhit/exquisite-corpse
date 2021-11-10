const router = require('express').Router();
const userRoutes = require('./userRoutes');
const poemRoutes = require('./poemRoutes');
const fragmentRoutes = require('./fragmentRoutes');

router.use('/users', userRoutes);
router.use('/poems', poemRoutes);
router.use('/fragments', fragmentRoutes);

module.exports = router;
