# SOSC CMS - Simplified Administrator Authentication

## 🎯 System Overview
The SOSC CMS now uses a simplified authentication system with a single "administrator" role, making it easy to manage and maintain.

## 👤 Administrator Access

### Credentials
**All users have the same administrator role:**

1. **Primary Administrator**
   - Username: `admin`
   - Email: `admin@sosc.com`
   - Password: `admin123`

2. **Secondary Administrator**
   - Username: `moderator`
   - Email: `moderator@sosc.com`
   - Password: `admin123`

⚠️ **Change these passwords immediately in production!**

## 🔧 System Features

### Single Role Design
- **Role**: `administrator` (only one role type)
- **Access**: Full access to all CMS features
- **Permissions**: Manage contact submissions, change passwords, logout

### Security Features
- ✅ JWT token authentication
- ✅ Bcrypt password hashing
- ✅ Protected API endpoints
- ✅ Secure session management
- ✅ Automatic logout on token expiration

## 🚀 How to Use

### For Administrators:
1. **Access**: Navigate to CMS URL
2. **Login**: Use any of the administrator credentials above
3. **Manage**: Full access to contact form submissions
4. **Security**: Change password via settings dropdown
5. **Logout**: Secure logout via settings menu

### Interface Features:
- **Professional Login**: Clean, branded login interface
- **Dashboard Access**: Full contact submission management
- **Filtering & Sorting**: Advanced message management tools
- **Status Updates**: Mark messages as read/unread
- **Message Actions**: Reply via email, delete messages
- **Password Management**: Change password securely

## 🔒 Technical Details

### Database Schema
```sql
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'administrator',  -- Single role
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

### API Endpoints
```
Authentication:
POST   /api/auth/login           - Administrator login
GET    /api/auth/me             - Get current admin info
POST   /api/auth/logout         - Logout
PUT    /api/auth/change-password - Change password

Protected CMS:
GET    /api/contact-submissions           - Get all submissions
GET    /api/contact-submissions/:id       - Get specific submission
PUT    /api/contact-submissions/:id/status - Update message status
DELETE /api/contact-submissions/:id       - Delete message

Public:
POST   /api/submit-form         - Submit contact form (public)
```

## 🧪 Testing

### Quick Test
```bash
# Verify administrators
node verify-admins.js

# Test authentication
node test-auth.js

# Clean up roles (if needed)
node cleanup-roles.js
```

### Expected Results:
- ✅ Two administrators with 'administrator' role
- ✅ Valid password hashes
- ✅ Successful login with credentials
- ✅ Protected endpoints accessible with token

## 📋 Maintenance

### Adding New Administrators:
```sql
INSERT INTO admins (username, email, password, role) 
VALUES ('newadmin', 'newadmin@sosc.com', 'hashed_password', 'administrator');
```

### Password Reset:
```bash
# Use verify-admins.js script to reset passwords to 'admin123'
node verify-admins.js
```

### Role Consistency:
```bash
# Ensure all users have 'administrator' role
node cleanup-roles.js
```

## ✅ Benefits of Single Role System

1. **Simplicity**: No complex role hierarchy
2. **Maintenance**: Easier to manage and understand
3. **Security**: Clear, consistent permissions
4. **Scalability**: Easy to add new administrators
5. **User Experience**: Consistent interface for all users

## 🎉 Summary

The SOSC CMS now features:
- ✅ **Single Administrator Role**: Simplified access control
- ✅ **Secure Authentication**: JWT + bcrypt protection
- ✅ **Professional Interface**: Clean, branded login experience
- ✅ **Full CMS Access**: Complete contact management features
- ✅ **Easy Maintenance**: Simple role structure
- ✅ **Production Ready**: Complete security implementation

The system is ready for production use with secure, simplified administrator access! 🚀