const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

// POST - Submit contact form
router.post('/submit-form', contactController.submitForm);

// GET - Get all contact submissions
router.get('/contact-submissions', contactController.getAllSubmissions);

// GET - Get specific contact submission by ID
router.get('/contact-submissions/:id', contactController.getSubmissionById);

// PUT - Update submission status
router.put('/contact-submissions/:id/status', contactController.updateSubmissionStatus);

// DELETE - Delete contact submission by ID
router.delete('/contact-submissions/:id', contactController.deleteSubmissionById);

module.exports = router;