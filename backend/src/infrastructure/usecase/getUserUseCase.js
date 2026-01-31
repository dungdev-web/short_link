// src/infrastructure/usecase/getUserUseCase.js
const PostgresUserRepository = require('../repository/postgresUserRepository');
const User = require('../../domain/user/userEntity');

module.exports = async function (userRepository = new PostgresUserRepository(), userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
