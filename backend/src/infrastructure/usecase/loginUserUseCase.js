const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (
  userRepository,
  {
    email,
    password,
    ipAddress,
    macAddress,
    deviceInfo,
    location,
    loginMethod,
    userAgent,
  }
) => {
  const user = await userRepository.findByEmail(email);
  const isMatch = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !isMatch) {
    if (user) {
      const recentLogins = await prisma.user_sessions.findMany({
        where: { user_id: user.id },
        orderBy: { login_time: "desc" },
        take: 5,
      });

      let isUnusual = true;
      for (const login of recentLogins) {
        if (
          login.ip_address === ipAddress ||
          login.mac_address === macAddress ||
          login.device_info === deviceInfo ||
          login.location === location
        ) {
          isUnusual = false;
          break;
        }
      }

      await prisma.user_sessions.create({
        data: {
          user_id: user.id,
          ip_address: ipAddress || null,
          mac_address: macAddress || null,
          device_info: deviceInfo || null,
          location: location || null,
          is_successful: false,
          is_unusual: isUnusual,
        },
      });
    }
    throw new Error("Đăng nhập thất bại");
  }

  await prisma.user_login_logs.create({
    data: {
      user_id: user.id,
      ip_address: ipAddress || null,
      mac_address: macAddress || null,
      device_info: deviceInfo || null,
      location: location || null,
      login_method: loginMethod || "password",
      user_agent: userAgent || null,
      status: "success",
    },
  });

  const recentLogins = await prisma.user_sessions.findMany({
    where: { user_id: user.id },
    orderBy: { login_time: "desc" },
    take: 5,
  });

  let isUnusual = true;
  for (const login of recentLogins) {
    if (
      login.ip_address === ipAddress ||
      login.mac_address === macAddress ||
      login.device_info === deviceInfo ||
      login.location === location
    ) {
      isUnusual = false;
      break;
    }
  }

  await prisma.user_sessions.create({
    data: {
      user_id: user.id,
      ip_address: ipAddress || null,
      mac_address: macAddress || null,
      device_info: deviceInfo || null,
      location: location || null,
      is_successful: true,
      is_unusual: isUnusual,
    },
  });

  // if (!user.emailVerified) {
  //   throw new Error('Email is not verified');
  // }

  if (!config.jwtSecret) {
    throw new Error("JWT secret is not configured properly");
  }
  const userRoles = await prisma.user_roles.findMany({
    where: { user_id: user.id },
    include: { role: true },
  });
  const roles = userRoles.map((ur) => ur.role.name); 
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      Verified: user.emailVerified,
      phone: user.phoneNumber,
      roles: roles, 
    },
    config.jwtSecret,
    { expiresIn: "24h" }
  );
  return {
    token,
    user: {
      userId: parseInt(user.id, 10),
      username: user.username,
      email: user.email,
      Verified: user.emailVerified,
      phone: user.phoneNumber,
      roles: roles, // truyền mảng role vào token
    },
  };
};
