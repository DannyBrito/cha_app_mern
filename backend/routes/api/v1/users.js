const router = require('express').Router();
const controller = require('../../../controllers/api/v1/users')

router.route('/').get(controller.user_index)

router.route('/:id').get(controller.user_show)

router.route('/:id').delete(controller.user_destroy)

router.route('/find/:username').get(controller.user_find_by_name)

module.exports = router