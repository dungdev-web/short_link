const prisma = require("../../shared/prisma");
const Post = require("../../domain/post/postEntity");

class PostRepository {
  async find_all() {
    const posts = await prisma.posts.findMany();
    return posts.map((post) => new Post(post));
  }

  async find_by_id(id) {
    const post = await prisma.posts.findUnique({
      where: { id },
    });
    return post ? new Post(post) : null;
  }

  async create(data) {
    const created = await prisma.posts.create({
      data: {
        title: data.title,
        content: data.content,
        user: data.user_id ? { connect: { id: data.user_id } } : undefined,
        short_url: data.link_id ? { connect: { id: data.link_id } } : undefined,
        campaign: data.campaign_id
          ? { connect: { id: data.campaign_id } }
          : undefined,
        created_at: data.created_at || undefined,
      },
    });
    return new Post(created);
  }

  async update(id, data) {
    const updated = await prisma.posts.update({
      where: { id },
      data,
    });
    return new Post(updated);
  }

  async delete(id) {
    await prisma.posts.delete({
      where: { id },
    });
    return true;
  }

  async find_with_relations(id) {
    const post = await prisma.posts.findUnique({
      where: { id },
      include: {
        user: true,
        campaign: true,
        short_url: true,
      },
    });
    return post ? new Post(post) : null;
  }

  async find_by_user_id(user_id) {
    const posts = await prisma.posts.findMany({
      where: { user_id },
    });
    return posts.map((post) => new Post(post));
  }

  async find_by_campaign_id(campaign_id) {
    const posts = await prisma.posts.findMany({         
      where: { campaign_id },
    });
    return posts.map((post) => new Post(post));
  }

  async paginate({ page = 1, page_size = 10 }) {
    const skip = (page - 1) * page_size;
    const posts = await prisma.posts.findMany({
      skip,
      take: page_size,
      orderBy: { created_at: "desc" },
    });
    return posts.map((post) => new Post(post));
  }

  async search_by_title(keyword) {
    const posts = await prisma.posts.findMany({
      where: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      orderBy: { created_at: "desc" },
    });
    return posts.map((post) => new Post(post));
  }
}

module.exports = PostRepository;
