const prisma = require("../../shared/prisma");
const bcrypt = require("bcrypt");
const transporter = require("../../shared/mailer");

const confirmPassUserUseCase = async (email, otp, newPassword) => {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return { status: 404, data: { error: "Không tìm thấy người dùng với email này." } };
  }

  const passwordResetLog = await prisma.password_reset_logs.findFirst({
    where: {
      user_id: user.id,
      reset_token: otp,
      status: 'pending',
      expires_at: {
        gte: new Date(), 
      },
    },
  });

  if (!passwordResetLog) {
    return { status: 400, data: { error: "OTP không hợp lệ hoặc đã hết hạn." } };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { id: user.id },
    data: { password_hash: hashedPassword },
  });

  await prisma.password_reset_logs.update({
    where: { id: passwordResetLog.id },
    data: { status: 'used' },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mật khẩu đã được thay đổi",
    text: `Mật khẩu của bạn đã được thay đổi thành công.`,
  });

  return { status: 200, data: { message: "Mật khẩu đã được thay đổi thành công." } };
};

module.exports = confirmPassUserUseCase;