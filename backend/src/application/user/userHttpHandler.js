const createUserUseCase = require('../../infrastructure/usecase/createUserUseCase');
const loginUserUseCase = require('../../infrastructure/usecase/loginUserUseCase');

module.exports = (userRepository) => ({
  async register(req, res, next) {
    const user = await createUserUseCase(userRepository, req.body);
    res.status(201).json({ message: 'User registered', user });
  },

  async login(req, res, next) {
    const token = await loginUserUseCase(userRepository, req.body);
    res.json({ message: 'Login successful', token });
  },
  // Lấy thông tin người dùng
  async getUser(req, res, next) {
      const userId = req.params.userId; // Lấy userId từ params
      const user = await getUserUseCase(userRepository, userId);
      res.json({ user });
  }
});
