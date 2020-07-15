const User = require('../../../models/v1/user.model')
const errorHandler = require('../../../helpers/erroHandler')
exports.user_index = (req, res) =>{
    User.find()
        .select('_id username')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(errorHandler(err)))
}

exports.user_destroy = (req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('User succesfully deleted!'))
        .catch(err => res.status(400).json(errorHandler(err)))
}

exports.user_show = (req, res) => {
    User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch(err => res.status(400).json(errorHandler(err)))
}

exports.user_find_by_name = (req, res) => {
    User.findOne({username:req.params.username}, '_id username')
    .then((user) => {
        if(!user) throw ('User Not Found')
        return res.status(200).json(user)})
    .catch(err => res.status(400).json(err))
}