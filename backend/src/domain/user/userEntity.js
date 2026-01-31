class User {
  constructor({
    id,
    username,
    email,
    password_hash,
    full_name = null,
    avatar_url = null,
    phone_number = null,
    address = null,
    city = null,
    country = null,
    last_login_at = null,
    login_count = 0,
    email_verified = false,
    email_verified_at = null,
    created_at = new Date(),
    updated_at = new Date(),
    sessions = [],
    loginLogs = [],
    resetLogs = [],
    links = [],
    roles = [],
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = password_hash;

    this.fullName = full_name;
    this.avatarUrl = avatar_url;
    this.phoneNumber = phone_number;
    this.address = address;
    this.city = city;
    this.country = country;

    this.lastLoginAt = last_login_at;
    this.loginCount = login_count;
    this.emailVerified = email_verified;
    this.emailVerifiedAt = email_verified_at;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.sessions = sessions;
    this.loginLogs = loginLogs;
    this.resetLogs = resetLogs;
    this.links = links;
    this.roles = roles;
  }
}

module.exports = User;
