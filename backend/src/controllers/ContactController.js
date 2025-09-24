const ContactService = require('../services/ContactService');
const ContactSubmission = require('../models/ContactSubmission');
const MailService = require('../services/MailService');

exports.submitForm = async (req, res) => {  
    try {
        const { name, email, subject, message } = req.body;
        console.log('Form Data Received:', { name, email, subject, message });

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
