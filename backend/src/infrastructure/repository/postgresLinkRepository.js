const { PrismaClient } = require("@prisma/client");
const createUrlEntity = require("../../domain/link/urlEntity");

class PostgresLinkRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(linkEntity) {
    const {
      originalUrl,
      shortCode,
      shortUrl,
      userId,
      createdAt,
      clickCount,
      expiresAt,
    } = linkEntity.toJSON();

    const defaultExpiresAt =
      expiresAt || new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    const saved = await this.prisma.links.create({
      data: {
        original_url: originalUrl,
        short_code: shortCode,
        short_url: shortUrl,
        user_id: userId,
        created_at: createdAt,
        click_count: clickCount,
        expires_at: defaultExpiresAt,
      },
      select: {
        id: true,
        original_url: true,
        short_code: true,
        short_url: true,
        user_id: true,
        created_at: true,
        click_count: true,
        expires_at: true,
      },
    });

    return saved;
  }

  async findByShortCode(shortCode) {
    const row = await this.prisma.links.findUnique({
      where: { short_code: shortCode },
    });

    if (!row) return null;

    return createUrlEntity({
      id: row.id,
      originalUrl: row.original_url,
      shortCode: row.short_code,
      shortUrl: row.short_url,
      clickCount: row.click_count,
      userId: row.user_id,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
    });
  }

  async existsByShortCode(shortCode) {
    const link = await this.prisma.links.findUnique({
      where: { short_code: shortCode },
      select: { id: true },
    });
    return !!link;
  }

  async incrementClickCount(shortCode) {
    const updated = await this.prisma.links.update({
      where: { short_code: shortCode },
      data: {
        click_count: {
          increment: 1,
        },
      },
    });

    return createUrlEntity({
      id: updated.id,
      originalUrl: updated.original_url,
      shortCode: updated.short_code,
      shortUrl: updated.short_url,
      clickCount: updated.click_count,
      userId: updated.user_id,
      createdAt: updated.created_at,
      expiresAt: updated.expires_at,
    });
  }

  async getLinksByUserId(userId, { limit, offset }) {
    const [total, links] = await Promise.all([
      this.prisma.links.count({
        where: { user_id: userId },
      }),
      this.prisma.links.findMany({
        where: { user_id: userId },
        include: {
          user: { select: { email: true } },
        },
        orderBy: {
          created_at: "desc",
        },
        skip: offset,
        take: limit,
      }),
    ]);

    const result = links.map((link) => ({
      link_id: link.id,
      originalUrl: link.original_url,
      shortCode: link.short_code,
      createdAt: link.created_at,
      clickCount: link.click_count,
      email: link.user?.email,
      shortUrl: link.short_url,
      userId: link.user_id,
      expiresAt: link.expires_at,
    }));

    return {
      total,
      links: result,
    };
  }

  async getAll() {
    const rows = await this.prisma.links.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return rows.map((link) => ({
      id: link.id,
      originalUrl: link.original_url,
      shortUrl: link.short_url,
      shortCode: link.short_code,
      userId: link.user_id,
      createdAt: link.created_at,
      clickCount: link.click_count,
      expiresAt: link.expires_at,
    }));
  }
  async getDetail(link_id) {
    const rows = await this.prisma.links.findUnique({
      where: { id: link_id },
      include: {
        clicks: true, 
      },
    });
    return rows;
  }
}

module.exports = PostgresLinkRepository;
