const crypto = require("crypto");
const transporter = require("../../shared/mailer");
const prisma = require("../../shared/prisma");

const resetUserUseCase = async (email, req) => {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return {
      status: 404,
      data: { error: "Không tìm thấy người dùng với email này." },
    };
  }

  // Tìm OTP gần nhất chưa hết hạn
  const recentReset = await prisma.password_reset_logs.findFirst({
    where: {
      user_id: user.id,
      expires_at: { gt: new Date() },
      status: "pending",
    },
    orderBy: { requested_at: "desc" },
  });

  if (recentReset) {
    const remainingTime = Math.ceil(
      (new Date(recentReset.expires_at) - Date.now()) / 1000
    );
    return {
      status: 429,
      data: {
        error: `OTP đã được gửi. Vui lòng thử lại sau ${Math.ceil(
          remainingTime / 60
        )} phút.`,
      },
    };
  }

  // Gửi OTP nếu không có OTP gần nhất

  const resetToken = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  await prisma.password_reset_logs.create({
    data: {
      user_id: user.id,
      reset_token: resetToken,
      expires_at: expiresAt,
      requested_at: new Date(),
      ip_address: ipAddress,
      user_agent: userAgent,
      status: "pending",
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Yêu cầu đặt lại mật khẩu",
    text: `OTP đặt lại mật khẩu của bạn là: ${resetToken}`,
  });

  return {
    status: 200,
    data: { message: "Email đặt lại mật khẩu đã được gửi!" },
  };
};

module.exports = { resetUserUseCase };
