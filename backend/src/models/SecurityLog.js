class SecurityLog {
    constructor(logType, email = null, ipAddress = null, userAgent = null, payload = null) {
        this.logType = logType;
        this.email = email;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.payload = payload;
    }

    isValid() {
        return (
            this.logType && 
            this.logType.trim().length > 0
        );
    }

    // Validate log type
    static isValidLogType(type) {
        const validTypes = [
            'XSS_ATTEMPT',
            'SQL_INJECTION',
            'BRUTE_FORCE',
            'RATE_LIMIT_EXCEEDED',
            'SUSPICIOUS_ACTIVITY',
            'MALFORMED_REQUEST',
            'CSRF_ATTEMPT'
        ];
        return validTypes.includes(type);
    }
}

module.exports = SecurityLog;
