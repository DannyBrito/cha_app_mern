const User = require('../../../models/v1/user.model')

module.exports  =  (model) =>{
    
    return async (req,res,next) =>{

        const channel = req.params.channel
        const page = parseInt(req.query.page) | 1
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        req.startIndex = startIndex

        const endIndex = page * limit

        const results = {}
        const docCount = await model.countDocuments({channel}).exec()
        results.totalDocuments = docCount
        if(endIndex < docCount){
            results.next = {
                page: page + 1,
                limit:limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        req.result = results
        next()
    }
}