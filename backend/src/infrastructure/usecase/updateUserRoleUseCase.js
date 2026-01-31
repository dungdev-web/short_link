const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cập nhật danh sách role cho người dùng.
 * @param {number} userId - ID người dùng.
 * @param {Array<number>} roleIds - Mảng ID của các role mới cần gán.
 */
async function updateUserRolesUseCase(userId, roleIds) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  await prisma.user_roles.deleteMany({
    where: { user_id: userId },
  });

  for (const roleId of roleIds) {
    await prisma.user_roles.create({
      data: {
        user_id: userId,
        role_id: roleId,
      },
    });
  }

  return { message: 'User roles updated successfully.', userId, roleIds };
}

module.exports = { updateUserRolesUseCase };
