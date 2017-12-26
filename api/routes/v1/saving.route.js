const savingController = require('../../controllers/saving');

const express = require('express');
const cardController = require('../../controllers/card');
const router = express.Router();

/**
 * @swagger
 * /api/v1/saving/all:
 *   get:
 *     tags:
 *       - Savings
 *     description: Return all savings of current user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: returns array of savings
 */
router.route('/all').get(savingController.getSavings);

/**
 * @swagger
 * /api/v1/saving/{id}:
 *   get:
 *     tags:
 *       - Savings
 *     description: Return the saving with id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing saving
 *         required: true
 *         schema:
 *           title: string
 *           curAmount: number
 *           tarAmount: number
 *     responses:
 *       200:
 *         description: returns saving object
 */
router.route('/:id').get(savingController.getSaving);

/**
 * @swagger
 * /api/v1/saving:
 *   put:
 *     tags:
 *       - Savings
 *     description: Allow to add a new saving
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: saving
 *         description: Saving object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - curAmount
 *             - tarAmount
 *           properties:
 *             title:
 *               type: string
 *             curAmount:
 *               type: number
 *             tarAmount:
 *               type: number
 *     responses:
 *       200:
 *         description: returns saving object
 */
router.route('/').put(savingController.addSaving);

/**
 * @swagger
 * /api/v1/saving/{id}:
 *   post:
 *     tags:
 *       - Savings
 *     description: Allow to edit an existing saving
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing saving
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *       - in: body
 *         name: card
 *         description: Saving object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             curAmount:
 *               type: number
 *             tarAmount:
 *               type: number
 *     responses:
 *       200:
 *         description: saving has been updated, returns saving object
 */
router.route('/:id').post(savingController.editSaving);


/**
 * @swagger
 * /api/v1/saving/{id}:
 *   delete:
 *     tags:
 *       - Savings
 *     description: Allow to delete an existing saving
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of an existing saving
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: saving has been deleted
 */
router.route('/:id').delete(savingController.deleteSaving);

module.exports = router;