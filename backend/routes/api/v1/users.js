const router = require('express').Router();
const controller = require('../../../controllers/api/v1/users')

router.route('/').get(controller.user_index)


router.route('/:id').delete(controller.user_destroy)

module.exports = router