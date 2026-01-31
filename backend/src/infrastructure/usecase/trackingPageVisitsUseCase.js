const PostgresPageVisitRepository = require('../repository/postgresPageVisitRepository');
const PageVisitLog = require('../../domain/visit/pageVisitEntity');

const pageVisitRepository = new PostgresPageVisitRepository();

module.exports = async function (payload) {
  if (!payload) {
    throw new Error('payload is required');
  }

  const pageVisit = new PageVisitLog({
    ...payload,
    visited_at: new Date(),
  });

  return await pageVisitRepository.create(pageVisit);
};
