const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/user');
const passportConfig = require('../../config/passport');
const {password,email} = require('../../validations/auth.validation');

const router = express.Router();

router.route('/profile').post(validate(email),passportConfig.isAuthenticated, userController.updateProfile);
router.route('/password').post(validate(password),passportConfig.isAuthenticated, userController.updatePassword);
router.route('/delete').post(passportConfig.isAuthenticated, userController.deleteAccount);

module.exports = router;