const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();
//Acrescentar o CORS antes de qualquer outro app.use
app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;