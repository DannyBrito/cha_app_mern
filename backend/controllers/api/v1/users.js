const User = require('../../../models/v1/user.model')

exports.user_index = (req, res) =>{
    User.find()
        .select('_id username')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json('Error: '+ err))
}

exports.user_destroy = (req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('User succesfully deleted!'))
        .catch(err => res.status(400).json('Error: '+ err))
}