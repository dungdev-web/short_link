module.exports = (postId) => {
  return async function getPost(prisma) {
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: {
        user: true,
        campaign: true,
        short_url: true
      }
    });

    return post;
  };
};
