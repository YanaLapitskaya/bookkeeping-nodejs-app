const express = require('express');
const transactionController = require('../../controllers/transaction.js');

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
router.route('/:id').get(transactionController.getTransactions);

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
 *         name: user
 *         description: User object
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
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing transaction
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             amount:
 *               type: number
 *             type:
 *               type: string
 *             details:
 *               type: string
 *     responses:
 *       200:
 *         description: transaction has been updated, returns transaction object
 */
router.route('/:id').post(transactionController.editTransaction);


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
 *         description: transaction has been updated, returns transaction object
 */
router.route('/:id').delete(transactionController.deleteTransaction);

module.exports = router;