// src/infrastructure/repository/postgresClickLogRepository.js
const { PrismaClient } = require('@prisma/client');

class PostgresClickLogRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async save({ linkId, ipAddress, macAddress, deviceInfo, location, referer, userAgent }) {
    await this.prisma.link_click_logs.create({
      data: {
        link_id: linkId,
        ip_address: ipAddress,
        mac_address: macAddress,
        device_info: deviceInfo,
        location,
        referer,
        user_agent: userAgent,
        // clicked_at tự động set mặc định là now() theo schema, không cần truyền
      },
    });
  }
}

module.exports = PostgresClickLogRepository;
