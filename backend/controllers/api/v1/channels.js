const Channel = require('../../../models/v1/channel.model')
const Message = require('../../../models/v1/message.model')
const User = require('../../../models/v1/user.model')
const User_Channel = require('../../../models/v1/user_channel')


exports.channel_create = async (req, res) =>{
    const users = [req.body.creator,...req.body.users]
    try{
        const channel = await Channel.create({})
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

exports.get_channels = async (req,res, next) => {
    try{
        req.channels = await User_Channel.find({user:req.params.id},'-_id channel')

        next()
        // return res.status(200).json({channels})
    }
    catch(err){
        res.status(400).json({error:"Error fetching channels"})
    }
}

exports.get_users = async (req,res) => {
    try{ 
        let other = {}
        for(let i = 0; i < req.channels.length; i++){
            const key = req.channels[i].channel
            other[key] = await getUserFromChannel(key)
        }
        return res.status(200).json({channels:other})
    }
    catch(err){
        res.status(400).json({error:"Error fetching other"})
    }
}

const getUserFromChannel = async channel => {
    return User_Channel.find({channel},'-_id user').populate('user','_id username')
}
