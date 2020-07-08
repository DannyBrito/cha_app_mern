const router = require('express').Router();

const controller = require('../../../controllers/api/v1/channels')

router.route('/').post(controller.channel_create)

module.exports = router