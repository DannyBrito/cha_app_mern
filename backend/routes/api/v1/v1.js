const router = require('express').Router();

const users = require('./users')
const auth = require('./auth')
const channel = require('./channel')

router.use('/users', users)
router.use('/auth', auth)
router.use('/channels',channel)
module.exports = router