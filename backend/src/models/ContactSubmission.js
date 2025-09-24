class ContactSubmission {
    constructor(name, email, message, subject = '') {
        this.id = null; // Will be set from database
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = 'unread';
        this.submissionDate = new Date();
        this.updatedAt = new Date();
    }

    // Method to convert to database format
    toDbFormat() {
        return {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
            status: this.status
        };
    }

    // Method to create from database row
    static fromDbRow(row) {
        const submission = new ContactSubmission(row.name, row.email, row.message, row.subject);
        submission.id = row.id;
        submission.status = row.status;
        submission.submissionDate = row.created_at;
        submission.updatedAt = row.updated_at;
        return submission;
    }

    // Method to validate submission data
    isValid() {
        return this.name && 
               this.name.trim().length > 0 &&
               this.email && 
               this.email.includes('@') &&
               this.message && 
               this.message.trim().length > 0;
    }
}

module.exports = ContactSubmission;
