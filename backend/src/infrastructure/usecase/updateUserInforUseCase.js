module.exports = function updateUserInforUseCase(userRepository) {
  return async function ({ id, updateData }) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await userRepository.updateById(id, updateData);

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      full_name: updatedUser.full_name,
      avatar_url: updatedUser.avatar_url,
      phone_number: updatedUser.phone_number,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
      updated_at: updatedUser.updated_at,
    };
  };
};
