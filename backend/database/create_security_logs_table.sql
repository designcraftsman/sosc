-- Create the security_logs table
CREATE TABLE IF NOT EXISTS security_logs (
    id SERIAL PRIMARY KEY,
    log_type VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    payload JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_security_logs_type ON security_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_security_logs_email ON security_logs(email);
CREATE INDEX IF NOT EXISTS idx_security_logs_ip ON security_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at DESC);

-- Comment on the table
COMMENT ON TABLE security_logs IS 'Logs for security incidents including XSS attempts, suspicious activities, and attack patterns';
COMMENT ON COLUMN security_logs.log_type IS 'Type of security incident: XSS_ATTEMPT, SQL_INJECTION, BRUTE_FORCE, etc.';
COMMENT ON COLUMN security_logs.payload IS 'JSON data containing the malicious payload and additional context';
