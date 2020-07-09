const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const user_channel = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Channel',required: true
    }
},{
    timestamps: true,
});


user_channel.methods.toJSON = function(){
    let obj =  this.toObject()
    let attrToRemove = ['updatedAt','__v']
    attrToRemove.forEach(att => delete obj[att])
    return obj
}

const User_channel = mongoose.model('User_channel',user_channel);

module.exports = User_channel;