const router = require('express').Router();
const controller = require('../../../controllers/api/v1/auth');

router.route('/login').post()

router.route('/signup').post(controller.signUp)

router.route('/auto_login').get()

module.exports = router