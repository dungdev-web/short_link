module.exports = () => {
  return async function getAllPosts(prisma) {
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        user: true,
        campaign: true,
        short_url: true
      }
    });

    return posts;
  };
};
