const prisma = require('../../shared/prisma');

class PostgresPageVisitRepository {
  async create(pageVisit) {
return prisma.page_visits.create({
      data: {
        user_id: pageVisit.user_id,
        path: pageVisit.path,
        referrer: pageVisit.referrer,
        utm_source: pageVisit.utm_source,
        utm_medium: pageVisit.utm_medium,
        utm_campaign: pageVisit.utm_campaign,
        time_spent: pageVisit.time_spent,
        screen: pageVisit.screen,
        user_agent: pageVisit.user_agent,
        ip_address: pageVisit.ip_address,
        visited_at: pageVisit.visited_at,
      },
    });
  }
}

module.exports = PostgresPageVisitRepository;
