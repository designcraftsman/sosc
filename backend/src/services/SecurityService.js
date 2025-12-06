const db = require('../config/Db');
const SecurityLog = require('../models/SecurityLog');

class SecurityService {
    // Create a new security log
    static async createLog(logType, email = null, ipAddress = null, userAgent = null, payload = null) {
        const query = `
            INSERT INTO security_logs 
            (log_type, email, ip_address, user_agent, payload)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        
        const values = [
            logType,
            email,
            ipAddress,
            userAgent,
            payload ? JSON.stringify(payload) : null
        ];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating security log:', error);
            throw error;
        }
    }

    // Get all security logs with filters
    static async getAllLogs(filters = {}) {
        const { logType, email, ipAddress, startDate, endDate, limit = 100, offset = 0 } = filters;
        
        let query = 'SELECT * FROM security_logs WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (logType) {
            query += ` AND log_type = $${paramCount}`;
            values.push(logType);
            paramCount++;
        }

        if (email) {
            query += ` AND email = $${paramCount}`;
            values.push(email);
            paramCount++;
        }

        if (ipAddress) {
            query += ` AND ip_address = $${paramCount}`;
            values.push(ipAddress);
            paramCount++;
        }

        if (startDate) {
            query += ` AND created_at >= $${paramCount}`;
            values.push(startDate);
            paramCount++;
        }

        if (endDate) {
            query += ` AND created_at <= $${paramCount}`;
            values.push(endDate);
            paramCount++;
        }

        query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        try {
            const result = await db.query(query, values);
            
            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM security_logs WHERE 1=1';
            const countValues = [];
            let countParamCount = 1;

            if (logType) {
                countQuery += ` AND log_type = $${countParamCount}`;
                countValues.push(logType);
                countParamCount++;
            }

            if (email) {
                countQuery += ` AND email = $${countParamCount}`;
                countValues.push(email);
                countParamCount++;
            }

            if (ipAddress) {
                countQuery += ` AND ip_address = $${countParamCount}`;
                countValues.push(ipAddress);
                countParamCount++;
            }

            if (startDate) {
                countQuery += ` AND created_at >= $${countParamCount}`;
                countValues.push(startDate);
                countParamCount++;
            }

            if (endDate) {
                countQuery += ` AND created_at <= $${countParamCount}`;
                countValues.push(endDate);
            }

            const countResult = await db.query(countQuery, countValues);
            const total = parseInt(countResult.rows[0].count);

            return {
                logs: result.rows,
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            };
        } catch (error) {
            console.error('Error fetching security logs:', error);
            throw error;
        }
    }

    // Get log by ID
    static async getLogById(id) {
        const query = 'SELECT * FROM security_logs WHERE id = $1';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching security log by ID:', error);
            throw error;
        }
    }

    // Delete old logs (cleanup)
    static async deleteOldLogs(daysOld = 90) {
        const query = `
            DELETE FROM security_logs 
            WHERE created_at < NOW() - INTERVAL '${daysOld} days'
            RETURNING *
        `;
        
        try {
            const result = await db.query(query);
            return result.rows.length;
        } catch (error) {
            console.error('Error deleting old security logs:', error);
            throw error;
        }
    }

    // Get statistics
    static async getStatistics(startDate = null, endDate = null) {
        let query = `
            SELECT 
                log_type,
                COUNT(*) as count,
                COUNT(DISTINCT email) as unique_emails,
                COUNT(DISTINCT ip_address) as unique_ips
            FROM security_logs
            WHERE 1=1
        `;
        
        const values = [];
        let paramCount = 1;

        if (startDate) {
            query += ` AND created_at >= $${paramCount}`;
            values.push(startDate);
            paramCount++;
        }

        if (endDate) {
            query += ` AND created_at <= $${paramCount}`;
            values.push(endDate);
        }

        query += ` GROUP BY log_type ORDER BY count DESC`;

        try {
            const result = await db.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error fetching security statistics:', error);
            throw error;
        }
    }
}

module.exports = SecurityService;
