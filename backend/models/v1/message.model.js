const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const messageSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    },
    message:{type: String,required: true}
    ,channel:{type:mongoose.Schema.Types.ObjectId, ref: 'Channel',required: true
    }
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