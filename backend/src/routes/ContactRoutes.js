const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');
const { authenticateAdmin } = require('../middlewares/Auth');

// POST - Submit contact form (public - no auth required)
router.post('/submit-form', contactController.submitForm);

// Protected admin routes - require authentication
router.get('/contact-submissions', authenticateAdmin, contactController.getAllSubmissions);
router.get('/contact-submissions/export/csv', authenticateAdmin, contactController.exportSubmissionsCSV);
router.get('/contact-submissions/:id', authenticateAdmin, contactController.getSubmissionById);
router.put('/contact-submissions/:id/status', authenticateAdmin, contactController.updateSubmissionStatus);
router.delete('/contact-submissions/:id', authenticateAdmin, contactController.deleteSubmissionById);

module.exports = router;