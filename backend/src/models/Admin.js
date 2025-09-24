const bcrypt = require('bcrypt');

class Admin {
  constructor(username, email, password, role = 'administrator') {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.lastLogin = null;
  }

  // Validate admin data
  isValid() {
    return (
      this.username && 
      this.username.length >= 3 &&
      this.email && 
      this.email.includes('@') &&
      this.password && 
      this.password.length >= 6
    );
  }

  // Hash password before storing
  async hashPassword() {
    if (this.password) {
      const saltRounds = 12;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  // Compare password for login
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Convert to database format
  toDatabaseFormat() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt,
      last_login: this.lastLogin
    };
  }

  // Convert from database format
  static fromDatabaseFormat(dbData) {
    const admin = new Admin(
      dbData.username,
      dbData.email,
      dbData.password,
      dbData.role
    );
    admin.createdAt = dbData.created_at;
    admin.lastLogin = dbData.last_login;
    return admin;
  }
}

module.exports = Admin;