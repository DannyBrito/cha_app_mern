const socketio = require('socket.io')

const server = require('./server')

const io = socketio(server)

const Message = require('../models/v1/message.model')
 
io.on('connection',(socket)=>{

    console.log('we have a new connection')
    
    socket.on('self_channel',({id})=> socket.join(`slf-ch:${id}`))

    socket.on('join_channels',({channels}, callback)=> {

        channels.forEach(channel => socket.join(`${channel}`));

        if(!channels.length) socket.join('LobbyGeneral')

        socket.leave('LobbyGeneral')

        callback()
    })

    socket.on('join_lobby',(payload, callback)=>{

        socket.join('LobbyGeneral')

        callback()
    })

    socket.on('created_new_channel',(payload)=>{
        
        payload.users.forEach(id => socket.to(`slf-ch:${id}`).emit('new_channel'))

    })

    socket.on('sendMessage',async (payload)=>{
        
        if(payload.channel){

            const message = await Message.create(payload)

            await message.populate('author','_id username').execPopulate()

            io.to(payload.channel).emit('message',message)

        }
        
    })

    socket.on('sendBinaryData', ({data, author, channel})=>{
        console.log(data)
        io.to(channel).emit('binaryData',{author,data,author})
    })

    socket.on('disconnect',()=>{

        console.log('User had left')
        
    })

})