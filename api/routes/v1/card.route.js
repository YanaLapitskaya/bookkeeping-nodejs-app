const express = require('express');
const cardController = require('../../controllers/card');
const router = express.Router();

/**
 * @swagger
 * /api/v1/card/all:
 *   get:
 *     tags:
 *       - Payment Card
 *     description: Return all payment cards of current user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: returns array of cards
 */
router.route('/all').get(cardController.getCards);

/**
 * @swagger
 * /api/v1/card/{id}:
 *   get:
 *     tags:
 *       - Payment Card
 *     description: Return the card with id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing card
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       200:
 *         description: returns card object
 */
router.route('/:id').get(cardController.getCard);

/**
 * @swagger
 * /api/v1/card:
 *   put:
 *     tags:
 *       - Payment Card
 *     description: Allow to add a new card
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: card
 *         description: Card object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - number
 *             - paymentSystem
 *             - amount
 *           properties:
 *             number:
 *               type: string
 *             paymentSystem:
 *               type: string
 *             amount:
 *               type: number
 *     responses:
 *       200:
 *         description: returns card object
 */
router.route('/').put(cardController.addCard);

/**
 * @swagger
 * /api/v1/card/{id}:
 *   post:
 *     tags:
 *       - Payment Card
 *     description: Allow to edit an existing card
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing card
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *       - in: body
 *         name: card
 *         description: Card object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             number:
 *               type: string
 *             paymentSystem:
 *               type: string
 *             amount:
 *               type: number
 *     responses:
 *       200:
 *         description: card has been updated, returns card object
 */
router.route('/:id').post(cardController.editCard);


/**
 * @swagger
 * /api/v1/card/{id}:
 *   delete:
 *     tags:
 *       - Payment Card
 *     description: Allow to delete an existing card
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing card
 *         required: true
 *         schema:
 *           type: number
 *           required: true
 *     responses:
 *       200:
 *         description: card has been deleted
 */
router.route('/:id').delete(cardController.deleteCard);

module.exports = router;