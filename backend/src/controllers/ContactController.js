const ContactService = require('../services/ContactService');
const ContactSubmission = require('../models/ContactSubmission');
const MailService = require('../services/MailService');
const SecurityService = require('../services/SecurityService');

// Helper function to detect malicious content
const detectMaliciousContent = (data) => {
    const maliciousPatterns = [
        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<img[^>]+onerror/gi,
        /eval\s*\(/gi,
        /document\.cookie/gi,
        /<embed[\s\S]*?>/gi,
        /<object[\s\S]*?>/gi
    ];
    
    const allContent = Object.values(data).join(' ');
    return maliciousPatterns.some(pattern => pattern.test(allContent));
};

exports.submitForm = async (req, res) => {  
    try {
        const { name, email, subject, message } = req.body;
        console.log('Form Data Received:', { name, email, subject, message });

        // Detect malicious content before processing
        const isMalicious = detectMaliciousContent({ name, email, subject, message });
        
        if (isMalicious) {
            // Log security incident
            const ipAddress = req.ip || 
                             req.headers['x-forwarded-for'] || 
                             req.connection.remoteAddress || 
                             req.socket.remoteAddress;
            
            await SecurityService.createLog(
                'XSS_ATTEMPT',
                email,
                ipAddress,
                req.headers['user-agent'],
                { name, email, subject, message }
            );
            
            console.log('🚨 XSS Attack detected and logged:', {
                email,
                ip: ipAddress,
                timestamp: new Date().toISOString()
            });
            
            // Silent rejection - attacker thinks it succeeded
            return res.status(200).json({ 
                message: 'Form submitted successfully'
            });
        }

        // Create a ContactSubmission instance for validation
        const submissionData = new ContactSubmission(name, email, message, subject);
        
        // Validate the submission data
        if (!submissionData.isValid()) {
            return res.status(400).json({ 
                error: 'Invalid submission data. Name, valid email, and message are required.' 
            });
        }

        // Save to database
        const submission = await ContactService.createSubmission(name, email, subject, message);
        
        // Send emails (admin notification + client confirmation)
        const emailResult = await MailService.sendContactFormEmails({
            ...submission,
            submissionDate: submission.submissionDate
        });

        // Respond with success (even if emails fail, the form submission succeeded)
        const response = {
            message: 'Form submitted successfully',
            submission: submission
        };

        // Add email status if there were issues
        if (!emailResult.success) {
            response.emailWarning = 'Form saved but there was an issue sending notification emails';
            response.emailDetails = emailResult;
        } else {
            response.emailsSent = {
                adminNotification: emailResult.adminEmail.success,
                clientConfirmation: emailResult.clientEmail.success
            };
        }

        res.status(201).json(response);
    
    } catch(error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.exportSubmissionsCSV = async (req, res) => {
    try {
        const submissions = await ContactService.getAllSubmissions();
        
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ error: 'No submissions found' });
        }

        // Create CSV headers
        const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Status', 'Submission Date'];
        
        // Create CSV rows
        const csvRows = [];
        csvRows.push(headers.join(','));
        
        submissions.forEach(submission => {
            const row = [
                submission.id,
                `"${submission.name || ''}"`,
                `"${submission.email || ''}"`,
                `"${submission.subject || ''}"`,
                `"${(submission.message || '').replace(/"/g, '""')}"`, // Escape quotes
                `"${submission.status || 'unread'}"`,
                `"${new Date(submission.submissionDate).toLocaleString('fr-FR')}"`
            ];
            csvRows.push(row.join(','));
        });
        
        const csvContent = csvRows.join('\n');
        
        // Set headers for file download
        const filename = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', Buffer.byteLength(csvContent, 'utf8'));
        
        // Add BOM for proper Excel UTF-8 handling
        res.write('\ufeff');
        res.write(csvContent);
        res.end();
        
    } catch(error) {
        console.error('Error exporting CSV:', error);
        res.status(500).json({ error: 'Error exporting data' });
    }
};

exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await ContactService.getAllSubmissions();
        res.status(200).json({ 
            submissions,
            count: submissions.length 
        });
    } catch(error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params; 
        
        // Validate ID is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid submission ID' });
        }
        
        const submission = await ContactService.getSubmissionById(id);
        if (submission) {
            res.status(200).json({ submission });
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } catch(error) {
        console.error('Error fetching submission by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteSubmissionById = async (req, res) => {
    try {
        const { id } = req.params; 
        
        // Validate ID is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid submission ID' });
        }
        
        const deleted = await ContactService.deleteSubmissionById(id);
        if (deleted) {
            res.status(200).json({ message: `Submission with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } catch(error) {
        console.error('Error deleting submission by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validate ID is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid submission ID' });
        }
        
        // Validate status
        const validStatuses = ['unread', 'read', 'responded', 'closed'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
            });
        }
        
        const submission = await ContactService.updateSubmissionStatus(id, status);
        
        if (submission) {
            res.status(200).json({ 
                message: 'Submission status updated successfully',
                submission 
            });
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } catch(error) {
        console.error('Error updating submission status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
