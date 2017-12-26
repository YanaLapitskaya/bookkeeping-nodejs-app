const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const transactionRoutes = require('./transaction.route');
const cardRoutes = require('./card.route');
const savingRoutes = require('./saving.route');

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/user',userRoutes);
router.use('/transaction',transactionRoutes);
router.use('/saving',savingRoutes);
router.use('/card',cardRoutes);

module.exports = router;