const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/user');
const passportConfig = require('../../config/passport');
const passport = require('passport');
const {login,signup,password,email} = require('../../validations/auth.validation');

const router = express.Router();

router.route('/login').post(validate(login),userController.login);
router.route('/logout').get(userController.logout);
router.route('/forgot').post(validate(email),userController.forgot);
router.route('/reset/:token').post(validate(password),userController.reset);
router.route('/signup').post(validate(signup),userController.signup);
router.route('/account/profile').post(validate(email),passportConfig.isAuthenticated, userController.updateProfile);
router.route('/account/password').post(validate(password),passportConfig.isAuthenticated, userController.updatePassword);
router.route('/account/delete').post(passportConfig.isAuthenticated, userController.deleteAccount);

module.exports = router;