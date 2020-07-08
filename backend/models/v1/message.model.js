const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema =  mongoose.Schema;
const messageSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    },
    message:{type: String,required: true}
},{
    timestamps: true,
});

// using to somewhat serialize instance

messageSchema.methods.toJSON = function(){
    let obj =  this.toObject()
    let attrToRemove = ['updatedAt','__v']
    attrToRemove.forEach(att => delete obj[att])
    return obj
}

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;