// set express and routes 
const app = require('./app');
 
// establish connection mongoose to db
require('./connection');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});