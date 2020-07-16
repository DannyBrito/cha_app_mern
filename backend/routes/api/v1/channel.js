const router = require('express').Router();

const Message = require('../../../models/v1/message.model')

const Paginator = require('../../../controllers/api/v1/paginator')

const controller = require('../../../controllers/api/v1/channels')

router.route('/').post(controller.channel_create)

router.route('/user_channels/:id').get(controller.get_channels,controller.get_users)

router.route('/:channel').get(Paginator(Message),controller.getChannelMessages)

module.exports = router