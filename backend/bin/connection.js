const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useCreateIndex:true ,useUnifiedTopology:true ,useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB database connection establish succesfully');
});