module.exports = (
  postRepository,
  linkRepository,
  createPostUseCaseFactory,
  createShortUrlUseCaseFactory
) => {
  const createPostUseCase = createPostUseCaseFactory(postRepository);
  const createShortUrlUseCase = createShortUrlUseCaseFactory(linkRepository);

  return {
    async createWithShortlink(req, res) {
      // const { originalUrl, user_id, ...postData } = req.body;
      const {user_id, ...postData } = req.body;

      // const short_url_Obj = await createShortUrlUseCase({
      //   originalUrl,
      //   userId: user_id,
      // });
      // const post = await createPostUseCase(short_url_Obj, {
      //   user_id,
      //   ...postData,
      // });
            const post = await createPostUseCase({
        user_id,
        ...postData,
      });


      const fullPost = await postRepository.find_with_relations(post.id);

      res.status(201).json({ success: true, data: fullPost });
    },

    async update(req, res) {
      const { id } = req.params;
      const updated = await postRepository.update(Number(id), req.body);
      res.json({ success: true, data: updated });
    },

    async getAll(req, res) {
      const posts = await postRepository.find_all();
      res.json({ success: true, data: posts });
    },

    async getById(req, res) {
      const { id } = req.params;
      const post = await postRepository.find_with_relations(Number(id));
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      res.json({ success: true, data: post });
    },

    async remove(req, res) {
      const { id } = req.params;
      await postRepository.delete(Number(id));
      res.json({ success: true, message: "Deleted successfully" });
    },
  };
};
