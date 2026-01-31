const express = require('express');
const router = express.Router();

const createShortUrlUseCase = require('../../../infrastructure/usecase/createShortUrlUseCase');
const redirectUseCase = require('../../../infrastructure/usecase/redirectUseCase');
const getLinkUseCase = require('../../../infrastructure/usecase/getLinkUseCase');
const getUserLinkUseCase = require('../../../infrastructure/usecase/getUserLinkUseCase');
const getDetailLinkUseCase = require('../../../infrastructure/usecase/getDetailLinkUseCase');



const otpRequestLimiter = require("../../middlewares/rateLimitOtps");

const LinkRepository = require('../../../infrastructure/repository/postgresLinkRepository');
const ClickLogRepository = require('../../../infrastructure/repository/postgresClickLogRepository');

const linkHttpHandler = require('../../../application/link/linkHttpHandler');
const redirectHttpHandler = require('../../../application/link/handleLink');
const getHttpHandler = require('../../../application/link/getHttpHander');
const getUseLinkHander = require('../../../application/link/getUseLinkHander');
const getDetaillink = require('../../../application/link/getDetaillink');

// Khởi tạo repository
const linkRepository = new LinkRepository();
const clickLogRepository = new ClickLogRepository();

// Khởi tạo use case
const shortUrlUseCase = createShortUrlUseCase(linkRepository);
const redirectUseCaseInstance = redirectUseCase(linkRepository, clickLogRepository);
const getLinkUseCaseInstance = getLinkUseCase(linkRepository);
const getUserLinkCaseInstance =  getUserLinkUseCase(linkRepository);
const getDetailLinkCaseInstance =  getDetailLinkUseCase(linkRepository);

// Khởi tạo handler
const handler = linkHttpHandler(shortUrlUseCase);
const redirectHandler = redirectHttpHandler(redirectUseCaseInstance);
const getHandler = getHttpHandler(getLinkUseCaseInstance);
const getUserHandler = getUseLinkHander(getUserLinkCaseInstance);
const getDetailHandler = getDetaillink(getDetailLinkCaseInstance);
// Đăng ký route
router.post('/shorten',otpRequestLimiter, handler);
router.get('/:shortCode', redirectHandler);
router.get('/info/link', getHandler); 
router.get('/link/:userID',getUserHandler);
router.get('/links/:link_id',getDetailHandler);
module.exports = router;
    