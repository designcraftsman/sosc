const pool = require('../config/db');
const ContactSubmission = require('../models/ContactSubmission');

class ContactService {
    async createSubmission(name, email, subject, message) {
        const query = `
            INSERT INTO contact_submissions (name, email, subject, message, created_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const values = [name, email, subject || '', message];
        
        try {
            const result = await pool.query(query, values);
            const dbRow = result.rows[0];
            
            // Create ContactSubmission instance from database result
            const submission = new ContactSubmission(dbRow.name, dbRow.email, dbRow.message, dbRow.subject);
            submission.id = dbRow.id;
            submission.submissionDate = dbRow.created_at;
            submission.status = dbRow.status;
            
            return submission;
        } catch (error) {
            console.error('Database error in createSubmission:', error);
            throw error;
        }
    }

    async getAllSubmissions() {
        const query = `
            SELECT * FROM contact_submissions 
            ORDER BY created_at DESC
        `;
        
        try {
            const result = await pool.query(query);
            
            // Convert database rows to ContactSubmission instances
            return result.rows.map(row => {
                const submission = new ContactSubmission(row.name, row.email, row.message, row.subject);
                submission.id = row.id;
                submission.submissionDate = row.created_at;
                submission.status = row.status;
                return submission;
            });
        } catch (error) {
            console.error('Database error in getAllSubmissions:', error);
            throw error;
        }
    }

    async getSubmissionById(id) {
        const query = `
            SELECT * FROM contact_submissions 
            WHERE id = $1
        `;
        
        try {
            const result = await pool.query(query, [id]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            const row = result.rows[0];
            const submission = new ContactSubmission(row.name, row.email, row.message, row.subject);
            submission.id = row.id;
            submission.submissionDate = row.created_at;
            submission.status = row.status;
            
            return submission;
        } catch (error) {
            console.error('Database error in getSubmissionById:', error);
            throw error;
        }
    }

    async deleteSubmissionById(id) {
        const query = `
            DELETE FROM contact_submissions 
            WHERE id = $1
            RETURNING *
        `;
        
        try {
            const result = await pool.query(query, [id]);
            return result.rows.length > 0;
        } catch (error) {
            console.error('Database error in deleteSubmissionById:', error);
            throw error;
        }
    }

    async updateSubmissionStatus(id, status) {
        const query = `
            UPDATE contact_submissions 
            SET status = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `;
        
        try {
            const result = await pool.query(query, [status, id]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            const row = result.rows[0];
            const submission = new ContactSubmission(row.name, row.email, row.message, row.subject);
            submission.id = row.id;
            submission.submissionDate = row.created_at;
            submission.status = row.status;
            
            return submission;
        } catch (error) {
            console.error('Database error in updateSubmissionStatus:', error);
            throw error;
        }
    }
}
module.exports = new ContactService();