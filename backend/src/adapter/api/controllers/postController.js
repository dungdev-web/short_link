const express = require('express');
const router = express.Router();

const PostRepository = require('../../../infrastructure/repository/postgresPostRepository');
const postRepository = new PostRepository();

const LinkRepository = require('../../../infrastructure/repository/postgresLinkRepository');
const linkRepository = new LinkRepository();

const createPostUseCase = require('../../../infrastructure/usecase/createPostUseCase');
const createShortUrlUseCase = require('../../../infrastructure/usecase/createShortUrlUseCase');

const postHttpHandler = require('../../../application/post/postHttpHandler')(
  postRepository,
  linkRepository,
  createPostUseCase,
  createShortUrlUseCase
);

router.post('/posts', postHttpHandler.createWithShortlink);
router.get('/posts', postHttpHandler.getAll);
router.get('/posts/:id', postHttpHandler.getById);
router.patch('/posts/:id', postHttpHandler.update);
router.delete('/posts/:id', postHttpHandler.remove);

module.exports = router;
