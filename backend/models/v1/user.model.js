const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength:[4,'Username must be at least 4 characters'],
    },
},{
    timestamps: true,
});

userSchema.path('username').validate(async(username)=>{
    const usernameCount = await mongoose.models.User.countDocuments({username})
    return !usernameCount
},'Username already exists');

// using to somewhat serialize instance

userSchema.methods.toJSON = function(){
    let obj =  this.toObject()
    let attrToRemove = ['createdAt','updatedAt','__v']
    attrToRemove.forEach(att => delete obj[att])
    return obj
}

userSchema.statics.passwordHashing = (password) =>{
        return bcrypt.hash(password, 10)
}

userSchema.statics.passwordAuth = (password,hashPassword) =>{
        return bcrypt.compare(password, hashPassword)
}


const User = mongoose.model('User',userSchema);

module.exports = User;