const jwt = require('jsonwebtoken');
const AdminService = require('../services/AdminService');
const Admin = require('../models/Admin');

class AuthController {
  
  // Admin login
  static async login(req, res) {
    try {
      const { identifier, password } = req.body;

      // Validate input
      if (!identifier || !password) {
        return res.status(400).json({
          error: 'Username/email and password are required'
        });
      }

      // Find admin by username or email
      const admin = await AdminService.findByUsernameOrEmail(identifier);
      
      if (!admin) {
        return res.status(401).json({
          error: 'Invalid credentials',
          message: 'Username/email or password is incorrect'
        });
      }

      // Check password
      const isValidPassword = await Admin.comparePassword(password, admin.password);
      
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Invalid credentials',
          message: 'Username/email or password is incorrect'
        });
      }

      // Update last login
      await AdminService.updateLastLogin(admin.id);

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username, 
          role: admin.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Return token and admin info (without password)
      res.json({
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: new Date()
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred during login'
      });
    }
  }

  // Register new admin (only for administrators or initial setup)
  static async register(req, res) {
    try {
      const { username, email, password, role = 'administrator' } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({
          error: 'Username, email, and password are required'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long'
        });
      }

      // Check if admin already exists
      const adminExists = await AdminService.adminExists(username, email);
      
      if (adminExists) {
        return res.status(409).json({
          error: 'Admin already exists',
          message: 'An admin with this username or email already exists'
        });
      }

      // Create new admin
      const newAdmin = await AdminService.createAdmin(username, email, password, role);

      res.status(201).json({
        message: 'Admin created successfully',
        admin: {
          id: newAdmin.id,
          username: newAdmin.username,
          email: newAdmin.email,
          role: newAdmin.role,
          createdAt: newAdmin.created_at
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred during registration'
      });
    }
  }

  // Verify token and get current user
  static async me(req, res) {
    try {
      const admin = await AdminService.findById(req.user.id);
      
      if (!admin) {
        return res.status(404).json({
          error: 'Admin not found'
        });
      }

      res.json({
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      });

    } catch (error) {
      console.error('Me endpoint error:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  // Logout (client-side token removal, server just confirms)
  static async logout(req, res) {
    res.json({
      message: 'Logout successful',
      note: 'Please remove token from client storage'
    });
  }

  // Change password
  static async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const adminId = req.user.id;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          error: 'Current password and new password are required'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: 'New password must be at least 6 characters long'
        });
      }

      // Get current admin
      const admin = await AdminService.findById(adminId);
      
      if (!admin) {
        return res.status(404).json({
          error: 'Admin not found'
        });
      }

      // Verify current password
      const isValidCurrentPassword = await Admin.comparePassword(currentPassword, admin.password);
      
      if (!isValidCurrentPassword) {
        return res.status(401).json({
          error: 'Current password is incorrect'
        });
      }

      // Hash new password
      const tempAdmin = new Admin('', '', newPassword);
      await tempAdmin.hashPassword();

      // Update password in database
      const query = `
        UPDATE admins 
        SET password = $1 
        WHERE id = $2
        RETURNING id, username, email
      `;
      
      const pool = require('../config/Db');
      const result = await pool.query(query, [tempAdmin.password, adminId]);

      res.json({
        message: 'Password changed successfully',
        admin: result.rows[0]
      });

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;