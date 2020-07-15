const socketio = require('socket.io')

const server = require('./server')

const io = socketio(server)

const Message = require('../models/v1/message.model')
 
io.on('connection',(socket)=>{

    console.log('we have a new connection')

    socket.on('join_channels',({channels}, callback)=>{
        
        socket.rooms = {}

        channels.forEach(channel => {
            socket.join(`${channel}`)
        });

        if(!channels.length) socket.join('LobbyGeneral')

        socket.leave('LobbyGeneral')

        callback()
    })

    socket.on('join_lobby',(payload, callback)=>{
        
        socket.rooms = {}

        socket.join('LobbyGeneral')

        console.log(socket.rooms)

        callback()
    })

    socket.on('sendMessage',async (payload,callback)=>{
        
        console.log(payload,socket.rooms)
        
        if(payload.channel){
            const message = await Message.create(payload)
            await message.populate('author','_id username').execPopulate()
            console.log(message)
            io.to(payload.channel).emit('message',message)
            callback()
        }
    })

    socket.on('disconnect',()=>{
        console.log('User had left')
    })

})