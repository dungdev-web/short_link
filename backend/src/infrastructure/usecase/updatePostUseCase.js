module.exports = (postId, updateData) => {
  return async function updatePost(prisma) {
    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: {
        title: updateData.title,
        content: updateData.content,
        campaign_id: updateData.campaign_id || null,
        updated_at: new Date()
      }
    });

    return updatedPost;
  };
};
