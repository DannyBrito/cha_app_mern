const jwt = require('jsonwebtoken')
const User = require('../../../models/v1/user.model')
const errorHandler = require('../../../helpers/erroHandler')
require('dotenv').config()

exports.signUp = (req, res) =>{

    const UserInstance = {
        username: req.body.username,
        password: User.passwordHashing(req.body.password)
    }

    const newUser = new User(UserInstance)
    newUser.save()
        .then((user) =>{
            const token = jwt.sign({id: newUser.id},process.env.JWT_SCRT)
            res.status(200).json({user:user,token,msg:'User Created'})
        })
        .catch(err => res.status(400).json(errorHandler(err.errors)))
}