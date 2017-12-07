const express = require('express');
const transactionController = require('../../controllers/transaction.js');

const router = express.Router();

router.route('/').put(transactionController.addTransaction);

module.exports = router;