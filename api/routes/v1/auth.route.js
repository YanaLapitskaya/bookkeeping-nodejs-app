const express = require('express');
const userController = require('../../controllers/user');
const passportConfig = require('../../config/passport');
const passport = require('passport');

const router = express.Router();

router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);
router.route('/forgot').post(userController.forgot);
router.route('/reset/:token').post(userController.reset);
router.route('/signup').post(userController.signup);
router.route('/account/profile').post(passportConfig.isAuthenticated, userController.updateProfile);
router.route('/account/password').post(passportConfig.isAuthenticated, userController.updatePassword);
router.route('/account/delete').post(passportConfig.isAuthenticated, userController.deleteAccount);

module.exports = router;