const Channel = require('../../../models/v1/channel.model')
const Message = require('../../../models/v1/message.model')
const User = require('../../../models/v1/user.model')
const User_Channel = require('../../../models/v1/user_channel')


exports.channel_create = async (req, res) =>{
    const users = [req.body.creator,...req.body.users]
    try{
        const channel = await Channel.create({})
        console.log(users)
        users.forEach(user => add_user_to_channel(user,channel))
        res.status(200).json({channel,msg:'successfully'})
    }
    catch(err){
        res.status(500).json('Error: creating channel and user_channel')
    }
}


const add_user_to_channel = async (user,channel) => {
    return User_Channel.create({user,channel})
}