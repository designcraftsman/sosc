-- Create admins table for CMS authentication
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'administrator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_role ON admins(role);

-- Update existing users to have 'administrator' role
UPDATE admins SET role = 'administrator' WHERE role IN ('admin', 'super_admin');

-- Insert default administrator user (password: admin123)
-- Note: This is a hashed version of 'admin123' - change this in production!
INSERT INTO admins (username, email, password, role) 
VALUES (
    'admin', 
    'admin@sosc.com', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeVMskdliEBpe8zQC', 
    'administrator'
) 
ON CONFLICT (username) DO UPDATE SET role = 'administrator';