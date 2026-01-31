
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../adapter/api/controllers/userController');
const linkController = require('../adapter/api/controllers/linkController');
const campaignController = require('../adapter/api/controllers/campaignController');
const postController = require('../adapter/api/controllers/postController');
const bidController = require('../adapter/api/controllers/bidController');
const cors = require('cors');
const errorHandler = require('../shared/errorHandler');
const path = require("path")
const app = express();
app.use(express.json());

app.use(cors()); 
app.set('trust proxy', false);

app.use(bodyParser.json());
app.use('/', linkController);
app.use('/user', userController);
app.use('/campaigns', campaignController);
app.use('/bids', bidController);

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/post', postController);

app.use(errorHandler);

module.exports = app; 
