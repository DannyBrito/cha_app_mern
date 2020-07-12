const socketio = require('socket.io')

const server = require('./server')

const io = socketio(server)
 
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

    socket.on('sendMessage',(payload,callback)=>{
        
        console.log(payload,socket.rooms)
        
        if(payload.room){

        io.to(payload.room).emit('message',{user:payload.user,message:payload.message})
        callback()
        }
    })

    socket.on('disconnect',()=>{
        console.log('User had left')
    })

})