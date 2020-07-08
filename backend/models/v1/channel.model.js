const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema =  mongoose.Schema;
const channel = new Schema({},{timestamps: true });

// using to somewhat serialize instance

channel.methods.toJSON = function(){
    let obj =  this.toObject()
    let attrToRemove = ['createdAt','updatedAt','__v','passwordHash']
    attrToRemove.forEach(att => delete obj[att])
    return obj
}

const Channel = mongoose.model('Channel',channel);

module.exports = Channel;