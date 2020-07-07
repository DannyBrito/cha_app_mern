const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());

/* router set up */

const apiRouter = require('../routes/api/api');
app.use('/api',apiRouter);


module.exports = app;