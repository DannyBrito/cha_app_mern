const router = require('express').Router();

const controller = require('../../../controllers/api/v1/channels')

router.route('/').post(controller.channel_create)

router.route('/user_channels/:id').get(controller.get_channels,controller.get_users)

module.exports = router