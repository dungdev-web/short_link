module.exports = function createPostUseCase(postRepository) {
  // return async function(shortUrlObj, postData) {
  //   const { shortUrl, id: link_id } = shortUrlObj;

  //   const post = await postRepository.create({
  //     ...postData,
  //     shortUrl,
  //     link_id,
  //   });

  //   return post;
  // };
    return async function(postData) {
    const post = await postRepository.create({
      ...postData
    });

    return post;
  };
};
