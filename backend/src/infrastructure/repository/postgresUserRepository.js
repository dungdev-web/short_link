const prisma = require("../../shared/prisma");
const User = require("../../domain/user/userEntity");

class PostgresUserRepository {
  // Tìm kiếm người dùng theo email
  async findByEmail(email) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }

  // Tìm kiếm người dùng theo username
  async findByUsername(username) {
    const user = await prisma.users.findUnique({ where: { username } });
    return user ? new User(user) : null;
  }

  // Tìm kiếm theo id
  async findById(id) {
    const user = await prisma.users.findUnique({ where: { id: Number(id) } });
    return user ? new User(user) : null;
  }

  // Tạo người dùng mới
  async create(userData) {
    const newUser = await prisma.users.create({
      data: {
        username: userData.username,
        email: userData.email,
        password_hash: userData.passwordHash,
        full_name: userData.fullName || null,
        avatar_url: userData.avatarUrl || null,
        phone_number: userData.phoneNumber || null,
        address: userData.address || null,
        city: userData.city || null,
        country: userData.country || null,
        email_verified: false,
        login_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return new User(newUser);
  }

  async updateById(id, updateData) {
    const allowedFields = [
      "full_name",
      "avatar_url",
      "phone_number",
      "address",
      "city",
      "country",
    ];

    const dataToUpdate = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        dataToUpdate[key] = updateData[key];
      }
    }

    dataToUpdate.updated_at = new Date();

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return new User(updatedUser);
  }
  // Tìm kiếm người dùng theo userId
  async findById(userId) {
    // Chuyển đổi userId thành số nguyên trước khi truyền vào Prisma
    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      throw new Error("userId không hợp lệ");
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userIdInt, // Đảm bảo id là kiểu số nguyên
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
        address: true,
        avatar_url: true,
      },
    });

    return user; // Trả về dữ liệu người dùng nếu tìm thấy
  }
}

module.exports = PostgresUserRepository;
