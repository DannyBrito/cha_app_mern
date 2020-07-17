const Channel = require('../../../models/v1/channel.model')
const Message = require('../../../models/v1/message.model')
const User = require('../../../models/v1/user.model')
const User_Channel = require('../../../models/v1/user_channel')


exports.channel_create = async (req, res) =>{
    const users = [req.body.creator,...req.body.users]
    try{
        const channel = await Channel.create({})
        await users.forEach(user => add_user_to_channel(user,channel))
        
        res.status(200).json({channel,msg:'success'})
    }
    catch(err){
        res.status(500).json('Error: creating channel and user_channel')
    }
}

exports.channel_create

const add_user_to_channel = async (user,channel) => {
    return User_Channel.create({user,channel})
}

exports.get_channels = async (req,res, next) => {
    try{
        req.channels = await User_Channel.find({user:req.params.id},'-_id channel').sort('-createdAt').exec()
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
        let msgs = {}
        let totalmsgs = {}
        let latestMessagePerChat = {}
        for(let i = 0; i < req.channels.length; i++){
            const key = req.channels[i].channel
            other[key] = await getUserFromChannel(key)
            msgs[key] = (await getChannelMessages(key)).reverse()
            totalmsgs[key] = (await Message.countDocuments({channel:key}))
            latestMessagePerChat[key] = await getLatestMessage(key)
        }
  
        return res.status(200).json({channels:other,msgs,totalmsgs,latestMessagePerChat})
    }
    catch(err){
        res.status(400).json({error:"Error fetching other"})
    }
}

exports.getChannelMessages = async(req,res, next) => {
    const limit = parseInt(req.query.limit)
    const startIndex = parseInt(req.startIndex)
    req.result.messages = await(await getChannelMessages(req.params.channel,limit,startIndex)).reverse()

    res.status(200).json(req.result)
}

// helpers

const getUserFromChannel = async channel => {
    return User_Channel.find({channel},'-_id user').populate('user','_id username')
}

const getChannelMessages = async (channel,limit = 50,index = 0)=> {
    return Message.find({channel},'_id author message createdAt').sort('-createdAt').limit(limit).skip(index).populate('author','_id username').exec()
}

const getLatestMessage = async(channel) =>{
    return  Message.findOne({channel}).sort('-createdAt').limit(1).populate('author','_id username').exec()
}