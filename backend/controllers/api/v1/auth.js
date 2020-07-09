const User = require('../../../models/v1/user.model')
const errorHandler = require('../../../helpers/erroHandler')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res) =>{
    
    User.passwordHashing(req.body.password)
        .then(password =>{
            const UserInstance = {
                username: req.body.username,
                passwordHash: password
            }
            const newUser = new User(UserInstance)
            newUser.save()
                .then((user) =>{
                    const token = jwt.sign({id: newUser.id},process.env.JWT_SCRT)
                    res.status(200).json({user:user,token,msg:'User Created'})
                })
                .catch(err => res.status(400).json(errorHandler(err.errors))) 
        })
        .catch(err => res.status(400).json(errorHandler(err.errors)))

}

exports.logIn = (req, res) =>{
    User.findOne({username:req.body.username})
        .then(user =>{
            if(user){
                User.passwordAuth(req.body.password,user.passwordHash)
                    .then(passwordAuth =>{
                        if(passwordAuth){
                            const token = jwt.sign({id: user.id},process.env.JWT_SCRT)
                            res.status(200).json({user:user,token})
                        }else res.status(400).json('Auth Failed')
                    })
                    .catch(err => res.status(400).json(errorHandler(err.errors)))
            }
            else res.status(400).json('Auth Failed')
        })
        .catch(err => res.status(400).json('Auth 2 Failed'))
}
// 

exports.autoLogIng = (req, res) => {
    if(req.userAuthData){
        User.findById(req.userAuthData.id)
            .then(user =>{
                if(user){
                    res.status(202).json(user)
                }
                else res.status(400).json("Auth Failed")
            })
            .catch(err => res.status(400).json(errorHandler(err.errors)))
    }
    else res.status(400).json('Auth Failed')
}