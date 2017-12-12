const express = require('express');
const validate = require('express-validation');
const authController = require('../../controllers/auth');
const {login,signup,password,email} = require('../../validations/auth.validation');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Allow to login
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
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: returns user's id and email
 *       400:
 *         description: user not found
 */
router.route('/login').post(validate(login),authController.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     description: Allow to logout
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user successfully logged out
 */
router.route('/logout').get(authController.logout);


/**
 * @swagger
 * /api/v1/auth/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sent token to user via email
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User's email
 *         required: true
 *         schema:
 *           type: object  
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: mail has been sent and token has been returned
 *       400:
 *         description: account with that email address does not exist
 */
router.route('/forgot').post(validate(email),authController.forgot);
/**
 * @swagger
 * /api/v1/auth/reset/{token}:
 *   post:
 *     tags:
 *       - Auth
 *     description: Reset user's password
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Token for email resetting
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *       - in: body
 *         name: password
 *         description: New user's password
 *         required: true
 *         schema:
 *           type: object  
 *           required:
 *             - password
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: user password has been changed
 *       400:
 *         description: password reset token is invalid or has expired
 */
router.route('/reset/:token').post(validate(password),authController.reset);
/**
 * @swagger
 * /api/v1/auth/signup:
 *   put:
 *     tags:
 *       - Auth
 *     description: Sign up a new account
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
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *               
 *     responses:
 *       200:
 *         description: returns user's id and email
 *       400:
 *         description: account with that email address already exists
 */
router.route('/signup').put(validate(signup),authController.signup);

module.exports = router;