const express = require('express');
const transactionController = require('./../../controllers/transaction.js');
const multer  = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
		});
	}
});
const upload = multer({ storage: storage });

const router = express.Router();

/**
 * @swagger
 * /api/v1/transaction/all:
 *   get:
 *     tags:
 *       - Transaction
 *     description: Return all transactions of current user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: returns array of transactions
 */
router.route('/all').get(transactionController.getTransactions);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *   get:
 *     tags:
 *       - Transaction
 *     description: Return the transaction with id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing transaction
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       200:
 *         description: returns transaction object
 */
router.route('/:id').get(transactionController.getTransaction);

/**
 * @swagger
 * /api/v1/transaction:
 *   put:
 *     tags:
 *       - Transaction
 *     description: Allow to add a new transaction
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: transaction
 *         description: Transaction object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - amount
 *             - type
 *           properties:
 *             title:
 *               type: string
 *             amount:
 *               type: number
 *             type:
 *               type: string
 *             card:
 *               type: string
 *     responses:
 *       200:
 *         description: returns transaction object
 */
router.route('/').put(transactionController.addTransaction);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *   post:
 *     tags:
 *       - Transaction
 *     description: Allow to edit an existing transaction
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing transaction
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: amount
 *         type: number
 *       - in: formData
 *         name: type
 *         type: string
 *       - in: formData
 *         name: file
 *         type: file
 *     responses:
 *       200:
 *         description: transaction has been updated, returns transaction object
 */
router.route('/:id').post(upload.single('file'),transactionController.editTransaction);


/**
 * @swagger
 * /api/v1/transaction/{id}:
 *   delete:
 *     tags:
 *       - Transaction
 *     description: Allow to delete an existing transaction
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing transaction
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       200:
 *         description: transaction has been deleted
 */
router.route('/:id').delete(transactionController.deleteTransaction);

module.exports = router;