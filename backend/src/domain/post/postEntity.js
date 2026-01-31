class Post {
  constructor({
    id,
    user_id = null,
    campaign_id = null,
    link_id = null,
    title,
    content = null,
    created_at = new Date(),
    user = null,
    campaign = null,
    short_url = null,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.campaign_id = campaign_id;
    this.link_id = link_id;

    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.user = user;
    this.campaign = campaign;
    this.short_url = short_url;
  }
}

module.exports = Post;
