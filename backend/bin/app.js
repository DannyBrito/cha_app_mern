const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const logger = morgan('dev')

const app = express();
app.use(logger)
app.use(cors())
app.use(express.json());

/* router set up */

const apiRouter = require('../routes/api/api');
app.use('/api',apiRouter);


module.exports = app;