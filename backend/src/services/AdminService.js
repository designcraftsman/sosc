const pool = require('../config/db');
const Admin = require('../models/Admin');

class AdminService {
  
  // Create admin user
  static async createAdmin(username, email, password, role = 'administrator') {
    try {
      const admin = new Admin(username, email, password, role);
      
      if (!admin.isValid()) {
        throw new Error('Invalid admin data');
      }

      // Hash password
      await admin.hashPassword();

      const query = `
        INSERT INTO admins (username, email, password, role, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, role, created_at
      `;

      const values = [
        admin.username,
        admin.email,
        admin.password,
        admin.role,
        admin.createdAt
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find admin by username or email
  static async findByUsernameOrEmail(identifier) {
    try {
      const query = `
        SELECT * FROM admins 
        WHERE username = $1 OR email = $1
        LIMIT 1
      `;
      
      const result = await pool.query(query, [identifier]);
      
      if (result.rows.length === 0) {
        return null;
      }

      return Admin.fromDatabaseFormat(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Find admin by ID
  static async findById(id) {
    try {
      const query = `
        SELECT * FROM admins 
        WHERE id = $1
        LIMIT 1
      `;
      
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }

      return Admin.fromDatabaseFormat(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Update last login time
  static async updateLastLogin(id) {
    try {
      const query = `
        UPDATE admins 
        SET last_login = $1 
        WHERE id = $2
        RETURNING id, username, email, role, last_login
      `;
      
      const result = await pool.query(query, [new Date(), id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get all admins (for super admin)
  static async getAllAdmins() {
    try {
      const query = `
        SELECT id, username, email, role, created_at, last_login
        FROM admins 
        ORDER BY created_at DESC
      `;
      
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Check if admin exists by username or email
  static async adminExists(username, email) {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM admins 
        WHERE username = $1 OR email = $2
      `;
      
      const result = await pool.query(query, [username, email]);
      return result.rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete admin (for super admin)
  static async deleteAdmin(id) {
    try {
      const query = `
        DELETE FROM admins 
        WHERE id = $1
        RETURNING id, username, email
      `;
      
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminService;