// controllers/bidController.js
const express = require('express');
const router = express.Router();

const BidRepository = require('../../../infrastructure/repository/potgresBid');
const TaskRepository = require('../../../infrastructure/repository/postgresTaskRepository');
const CampaignRepository = require('../../../infrastructure/repository/postgresCampaignRepository');
const BidUsecase = require('../../../infrastructure/usecase/bidUsecase');
const BidHttpHandler = require('../../../application/bid/bidHttpHandler');
const authenticateUser = require('../../../adapter/middlewares/authenticateUser');

// Khởi tạo
const bidRepository = new BidRepository();
const taskRepository = new TaskRepository();
const campaignRepository = new CampaignRepository();
const bidUsecase = new BidUsecase(bidRepository, taskRepository, campaignRepository);
const bidHandler = new BidHttpHandler(bidUsecase);

// Routes
router.post('/post', authenticateUser, bidHandler.createBid);
router.put('/:id/approve', authenticateUser, bidHandler.approveBid);

module.exports = router;
