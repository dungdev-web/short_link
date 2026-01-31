class PageVisitLog {
  constructor({
    id,
    path,
    referrer = null,
    utm_source = null,
    utm_medium = null,
    utm_campaign = null,
    time_spent = null,
    screen = null,
    user_agent = null,
    ip_address,
    user_id = null,
    visited_at = new Date(),
  }) {
    this.id = id;
    this.path = path;
    this.referrer = referrer;
    this.utm_source = utm_source;
    this.utm_medium = utm_medium;
    this.utm_campaign = utm_campaign;
    this.time_spent = time_spent;
    this.screen = screen;
    this.user_agent = user_agent;
    this.ip_address = ip_address;
    this.user_id = user_id;
    this.visited_at = visited_at;
  }
}

module.exports = PageVisitLog;
