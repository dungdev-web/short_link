const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy danh sách thiết bị đã đăng nhập của người dùng
 * @param {number} userId 
 * @returns {Promise<Array>} Danh sách thiết bị
 */
async function getUserLoginDevices(userId) {
  const sessions = await prisma.user_sessions.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      // device: true,
      ip_address: true,
    },
  });

  return sessions;
}

module.exports = {
  getUserLoginDevices,
};
