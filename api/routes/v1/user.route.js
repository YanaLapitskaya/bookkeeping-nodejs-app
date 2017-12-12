const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/user');
const passportConfig = require('../../config/passport');
const {password,email} = require('../../validations/auth.validation');

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/profile:
 *   post:
 *     tags:
 *       - User
 *     description: Allow to change user's profile information
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object  
 *           properties:
 *             email:
 *               type: string
 *             name:
 *               type: string
 *             gender:
 *               type: string
 *             location:
 *               type: string
 *     responses:
 *       200:
 *         description: profile information has been updated
 *       400:
 *         description: the email address is already associated with an account
 */
router.route('/profile').post(validate(email),passportConfig.isAuthenticated, userController.updateProfile);

/**
 * @swagger
 * /api/v1/user/password:
 *   post:
 *     tags:
 *       - User
 *     description: Allow to change user's profile information
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: password
 *         description: New password
 *         required: true
 *         schema:
 *           type: object  
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: password has been changed
 */
router.route('/password').post(validate(password),passportConfig.isAuthenticated, userController.updatePassword);

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     tags:
 *       - User
 *     description: Allow to delete current account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: account has been deleted
 */
router.route('/delete').delete(passportConfig.isAuthenticated, userController.deleteAccount);

module.exports = router;