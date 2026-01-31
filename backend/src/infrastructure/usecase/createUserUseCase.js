const bcrypt = require("bcrypt");

module.exports = async (
  userRepository,
  { username, email, password, phoneNumber, fullName }
) => {
  if (!username || !email || !password || !phoneNumber || !fullName) {
    return { error: "Missing required fields" };
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    return { error: 'Email đã được đăng ký' };
  }

  const existingUsername = await userRepository.findByUsername(username);
  if (existingUsername) {
    return { error: 'Tên người dùng đã được sử dụng' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    passwordHash,
    fullName,
    phoneNumber,
    loginCount: 0,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdUser = await userRepository.create(newUser);

  return { user: createdUser };
};
