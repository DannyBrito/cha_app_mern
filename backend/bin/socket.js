const socketio = require('socket.io')

const server = require('./server')

const io = socketio(server)
 
io.on('connection',(socket)=>{
    console.log('we have a new connection')

    // socket.on('join',({name,channel}, callback)=>{
    //     console.log(name, channel, 'here')
    // })

    socket.on('sendMessage',(payload,callback)=>{

        io.emit('message',{user:payload.user,message:payload.message})
        callback()
    })

    socket.on('disconnect',()=>{
        console.log('User had left')
    })

})