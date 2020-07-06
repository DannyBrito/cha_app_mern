const mongoose = require('mongoose')

module.exports ={    
    connect:()=>{
        require('../../bin/connection')
    },
    disconnect: done =>{
        mongoose.disconnect(done)
    }
}