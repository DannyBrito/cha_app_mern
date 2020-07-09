const jwt = require('jsonwebtoken')
require('dotenv').config()

/****  Auth MiddleWare for any route that need authentification ****/
module.exports = (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1]
    try{
    const decoded = jwt.verify(token,process.env.JWT_SCRT)
        req.userAuthData = decoded
        next() // need to procced from middleware to next action
    }
    catch(error){
        res.status(401).json({
            msg:'Auth falied'
        })
    }
    
}
