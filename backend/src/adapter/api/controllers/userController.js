// adapter/api/controllers/userController.js
const express = require("express");
const router = express.Router();
const createUserUseCase = require("../../../infrastructure/usecase/createUserUseCase");
const {
  resetUserUseCase,
} = require("../../../infrastructure/usecase/resetUserUseCase");
const loginUserUseCase = require("../../../infrastructure/usecase/loginUserUseCase");
const UserRepository = require("../../../infrastructure/repository/postgresUserRepository");
const userHttpHandler = require("../../../application/user/userHttpHandler");

const {
  otpRequestLimiter,
  resetRateLimit,
} = require("../../middlewares/rateLimitLogin");
const confirmPassUserUseCase = require("../../../infrastructure/usecase/confirmPassUserUseCase");
const getUserUseCase = require("../../../infrastructure/usecase/getUserUseCase");

const updateUserInforUseCase = require("../../../infrastructure/usecase/updateUserInforUseCase");
const {  updateUserRolesUseCase} = require("../../../infrastructure/usecase/updateUserRoleUseCase");
const {  getUserLoginDevices} = require("../../../infrastructure/usecase/getUserLogin");
const trackPageVisitUseCase = require('../../../infrastructure/usecase/trackingPageVisitsUseCase');
const PageVisitLog = require('../../../domain/visit/pageVisitEntity');

const { upload, validateRealImage } = require("../../middlewares/upload");
// Khởi tạo repository và handler
const userRepository = new UserRepository();
const handler = userHttpHandler(userRepository);

// Route đăng ký người dùng
router.post("/register", async (req, res) => {
  const result = await createUserUseCase(userRepository, req.body);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res
    .status(201)
    .json({ message: "Người dùng đã đăng ký thành công", user: result.user });
});
router.post("/login", otpRequestLimiter, async (req, res) => {
  const { email, password, deviceInfo, location, loginMethod } = req.body;
  const ip = req.ip;
  const macAddress = req.body.macAddress || null;
  const userAgent = req.headers["user-agent"];

  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
  }

  const result = await loginUserUseCase(userRepository, {
    email,
    password,
    ipAddress: ip,
    macAddress,
    deviceInfo,
    location,
    loginMethod,
    userAgent,
  });

  if (!result) {
    return res.status(401).json({ message: "Đăng nhập thất bại" });
  }

  res.json({
    message: "Đăng nhập thành công",
    token: result.token,
    user: result.user,
  });
});

router.post("/send-reset-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email là bắt buộc!" });
  const result = await resetUserUseCase(email, req);
  res.status(result.status).json(result.data);
});

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email, OTP và mật khẩu mới là bắt buộc!" });
  }

  const result = await confirmPassUserUseCase(email, otp, newPassword);
  if (result.status === 200) {
    resetRateLimit(email);
  }
  return res.status(result.status).json(result.data);
});
router.patch(
  "/update-user-infor/:id",
  upload.single("avatar_file"),
  validateRealImage,
  async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID là bắt buộc!" });
    }

    if (req.file) {
      updateData.avatar_url = req.file.filename;
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Dữ liệu cập nhật là bắt buộc!" });
    }
    const updatedUser = await updateUserInforUseCase(userRepository)({
      id,
      updateData,
    });

    return res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công",
      user: updatedUser,
    });
  }
);

router.get("/:userId", async (req, res) => {

  const { userId } = req.params;

  const user = await getUserUseCase(userRepository, userId);
  res.json({ user });
});

router.patch("/update-user-role/:id", async (req, res) => {

  const { id } = req.params;
  const { roleIds } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID là bắt buộc!" });
  }

  if (!Array.isArray(roleIds) || roleIds.length === 0) {
    return res
      .status(400)
      .json({ error: "Danh sách vai trò (roleIds) không hợp lệ." });
  }

  const updated = await updateUserRolesUseCase(Number(id), roleIds);

  return res.status(200).json({
    message: "Cập nhật vai trò người dùng thành công.",
    userId: id,
    updatedRoles: roleIds,
  });
});

router.get("/devices/:userId", async (req, res) => {

  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Thiếu userId" });
  }

  const devices = await getUserLoginDevices(Number(userId));

  return res.status(200).json({
    message: "Lấy danh sách thiết bị thành công.",
    userId,
    devices,
  });
});

router.post('/tracking/visit', async (req, res) => {
    const {
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      time_spent,
      screen,
      user_agent,
      user_id,
    } = req.body;


    const ip_address = req.ip || req.headers['x-forwarded-for'] || 'Unknown';

    const payload = {
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      time_spent,
      screen,
      user_agent,
      ip_address,
      user_id,
      visited_at: new Date(),
    };

    await trackPageVisitUseCase(payload);

    res.status(201).json({ message: 'Page visit logged successfully' });
});



module.exports = router;
