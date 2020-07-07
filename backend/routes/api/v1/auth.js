const router = require('express').Router();
const controller = require('../../../controllers/api/v1/auth');

router.route('/login').post(controller.logIn)

router.route('/signup').post(controller.signUp)

router.route('/auto_login').get(controller.authMiddleware,controller.autoLogIng)

module.exports = router