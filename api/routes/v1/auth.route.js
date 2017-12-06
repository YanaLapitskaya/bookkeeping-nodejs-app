const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/user');
const passportConfig = require('../../config/passport');
const passport = require('passport');
const authValidation = require('../../validations/auth.validation');

const router = express.Router();

router.route('/login').post(authValidation.login,userController.login);
router.route('/logout').get(userController.logout);
router.route('/forgot').post(authValidation.email,userController.forgot);
router.route('/reset/:token').post(authValidation.password,userController.reset);
router.route('/signup').post(authValidation.signup,userController.signup);
router.route('/account/profile').post(authValidation.email,passportConfig.isAuthenticated, userController.updateProfile);
router.route('/account/password').post(authValidation.password,passportConfig.isAuthenticated, userController.updatePassword);
router.route('/account/delete').post(passportConfig.isAuthenticated, userController.deleteAccount);

module.exports = router;