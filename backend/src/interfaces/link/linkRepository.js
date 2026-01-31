// interfaces/link/linkRepository.js
class LinkRepository {
  async save(linkEntity) {
    throw new Error('Not implemented');
  }

  async findByShortCode(code) {
    throw new Error('Not implemented');
  }

  async updateClickCount(id, newClickCount) {
    throw new Error('Not implemented');
  }

  async getLinksByUserId(userId, { limit, offset }) {
    throw new Error('Not implemented');
  }

  // (Optional) Nếu bạn muốn dùng getAll:
  async getAll() {
    throw new Error('Not implemented');
  }
}

module.exports = LinkRepository;
