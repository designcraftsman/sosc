const SecurityService = require('../services/SecurityService');
const SecurityLog = require('../models/SecurityLog');

// Report security attack
exports.reportAttack = async (req, res) => {
    try {
        const { type, email, payload } = req.body;
        
        // Validate log type
        if (!SecurityLog.isValidLogType(type)) {
            return res.status(400).json({ 
                error: 'Invalid log type',
                validTypes: ['XSS_ATTEMPT', 'SQL_INJECTION', 'BRUTE_FORCE', 'RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'MALFORMED_REQUEST', 'CSRF_ATTEMPT']
            });
        }

        // Get IP address from request
        const ipAddress = req.ip || 
                         req.headers['x-forwarded-for'] || 
                         req.connection.remoteAddress || 
                         req.socket.remoteAddress;

        // Get user agent
        const userAgent = req.headers['user-agent'];

        // Create security log
        const log = await SecurityService.createLog(
            type,
            email,
            ipAddress,
            userAgent,
            payload
        );

        console.log('🚨 SECURITY ALERT:', {
            type,
            email,
            ip: ipAddress,
            timestamp: new Date().toISOString()
        });

        res.status(200).json({ 
            message: 'Security incident logged successfully',
            logId: log.id 
        });
    } catch (error) {
        console.error('Error logging security incident:', error);
        res.status(500).json({ error: 'Failed to log security incident' });
    }
};

// Get all security logs - Admin only
exports.getAllLogs = async (req, res) => {
    try {
        const { type, email, ip, startDate, endDate, page = 1, limit = 50 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            logType: type,
            email,
            ipAddress: ip,
            startDate,
            endDate,
            limit: parseInt(limit),
            offset: parseInt(offset)
        };

        const result = await SecurityService.getAllLogs(filters);

        res.status(200).json({
            success: true,
            data: result.logs,
            pagination: {
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / limit),
                hasMore: result.hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching security logs:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch security logs' 
        });
    }
};

// Get security statistics - Admin only
exports.getStatistics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const stats = await SecurityService.getStatistics(startDate, endDate);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching security statistics:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch security statistics' 
        });
    }
};

// Get log by ID - Admin only
exports.getLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await SecurityService.getLogById(id);

        if (!log) {
            return res.status(404).json({ 
                success: false,
                error: 'Security log not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: log
        });
    } catch (error) {
        console.error('Error fetching security log:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch security log' 
        });
    }
};

// Delete old logs - Admin only
exports.cleanupOldLogs = async (req, res) => {
    try {
        const { daysOld = 90 } = req.body;
        
        const deletedCount = await SecurityService.deleteOldLogs(parseInt(daysOld));

        res.status(200).json({
            success: true,
            message: `Deleted ${deletedCount} old security logs`,
            deletedCount
        });
    } catch (error) {
        console.error('Error cleaning up old logs:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to cleanup old logs' 
        });
    }
};
