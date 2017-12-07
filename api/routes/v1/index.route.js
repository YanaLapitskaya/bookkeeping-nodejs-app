const express = require('express');
const authRoutes = require('./auth.route');
const transactionRoutes = require('./transaction.route');

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/transaction',transactionRoutes);

module.exports = router;