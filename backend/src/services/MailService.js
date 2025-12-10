const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService {
    constructor() {
        // Create transporter with configuration from environment variables
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                // Accept self-signed certificates in development
                rejectUnauthorized: process.env.NODE_ENV === 'production'
            }
        });

        // Verify transporter configuration
        this.verifyConnection();
    }

    async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log('✓ Email server is ready to send messages');
        } catch (error) {
            console.error('✗ Email server configuration error:', error.message);
        }
    }

    // Send notification email to admin when new form is submitted
    async sendAdminNotification(submissionData) {
        const { name, email, subject, message, id, submissionDate } = submissionData;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f8f9fa; }
                    .info-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                    .label { font-weight: bold; color: #2c3e50; }
                    .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📧 Nouvelle demande de contact</h1>
                        <p>Une nouvelle soumission a été reçue sur votre site web</p>
                    </div>
                    
                    <div class="content">
                        <div class="info-box">
                            <p><span class="label">ID de soumission:</span> #${id}</p>
                            <p><span class="label">Date:</span> ${new Date(submissionDate).toLocaleString('fr-FR')}</p>
                        </div>
                        
                        <div class="info-box">
                            <p><span class="label">Nom:</span> ${name}</p>
                            <p><span class="label">Email:</span> ${email}</p>
                            <p><span class="label">Sujet:</span> ${subject || 'Aucun sujet'}</p>
                        </div>
                        
                        <div class="info-box">
                            <p class="label">Message:</p>
                            <p style="background-color: #ecf0f1; padding: 10px; border-radius: 3px;">${message}</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Email automatique - ${process.env.COMPANY_NAME}</p>
                        <p>${process.env.COMPANY_ADDRESS}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const textContent = `
Nouvelle demande de contact reçue

ID de soumission: #${id}
Date: ${new Date(submissionDate).toLocaleString('fr-FR')}

Informations du contact:
Nom: ${name}
Email: ${email}
Sujet: ${subject || 'Aucun sujet'}

Message:
${message}

---
Email automatique - ${process.env.COMPANY_NAME}
${process.env.COMPANY_ADDRESS}
        `;

        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL,
                subject: `🔔 Nouvelle demande de contact de ${name}`,
                text: textContent,
                html: htmlContent,
            });

            console.log('✓ Admin notification email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('✗ Failed to send admin notification:', error);
            return { success: false, error: error.message };
        }
    }

    // Send confirmation email to client
    async sendClientConfirmation(submissionData) {
        const { name, email, subject, message } = submissionData;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #27ae60; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f8f9fa; }
                    .message-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                    .footer { background-color: #2c3e50; color: white; padding: 15px; text-align: center; margin-top: 20px; }
                    .contact-info { text-align: center; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✅ Message reçu avec succès</h1>
                        <p>Merci de nous avoir contactés !</p>
                    </div>
                    
                    <div class="content">
                        <div class="message-box">
                            <p>Bonjour <strong>${name}</strong>,</p>
                            <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
                            <p>Notre équipe examinera votre demande et vous répondra dans les plus brefs délais, généralement sous 24-48 heures.</p>
                        </div>
                        
                        <div class="message-box">
                            <h3>Récapitulatif de votre message:</h3>
                            <p><strong>Sujet:</strong> ${subject || 'Aucun sujet'}</p>
                            <p><strong>Message:</strong></p>
                            <p style="background-color: #ecf0f1; padding: 10px; border-radius: 3px;">${message}</p>
                        </div>
                        
                        <div class="contact-info">
                            <h3>Informations de contact:</h3>
                            <p>📧 Email: ${process.env.ADMIN_EMAIL}</p>
                            <p>📞 Téléphone: ${process.env.COMPANY_PHONE}</p>
                            <p>📍 Adresse: ${process.env.COMPANY_ADDRESS}</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Cordialement,<br>L'équipe ${process.env.COMPANY_NAME}</p>
                        <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const textContent = `
Bonjour ${name},

Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.

Notre équipe examinera votre demande et vous répondra dans les plus brefs délais, généralement sous 24-48 heures.

Récapitulatif de votre message:
Sujet: ${subject || 'Aucun sujet'}
Message: ${message}

Informations de contact:
Email: ${process.env.ADMIN_EMAIL}
Téléphone: ${process.env.COMPANY_PHONE}
Adresse: ${process.env.COMPANY_ADDRESS}

Cordialement,
L'équipe ${process.env.COMPANY_NAME}

Cet email a été envoyé automatiquement, merci de ne pas y répondre.
        `;

        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `Confirmation de réception - ${process.env.COMPANY_NAME}`,
                text: textContent,
                html: htmlContent,
            });

            console.log('✓ Client confirmation email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('✗ Failed to send client confirmation:', error);
            return { success: false, error: error.message };
        }
    }

    // Send both emails (admin notification + client confirmation)
    async sendContactFormEmails(submissionData) {
        try {
            console.log('📧 Sending contact form emails...');
            
            // Send both emails in parallel
            const [adminResult, clientResult] = await Promise.all([
                this.sendAdminNotification(submissionData),
                this.sendClientConfirmation(submissionData)
            ]);

            return {
                success: adminResult.success && clientResult.success,
                adminEmail: adminResult,
                clientEmail: clientResult
            };
        } catch (error) {
            console.error('✗ Failed to send contact form emails:', error);
            return {
                success: false,
                error: error.message,
                adminEmail: { success: false },
                clientEmail: { success: false }
            };
        }
    }

    // Test email functionality
    async sendTestEmail(toEmail) {
        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
                to: toEmail,
                subject: '🧪 Test Email - Configuration Successful',
                text: 'This is a test email to verify your email configuration is working correctly.',
                html: '<h2>✅ Email Configuration Test</h2><p>This is a test email to verify your email configuration is working correctly.</p>',
            });

            console.log('✓ Test email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('✗ Failed to send test email:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new MailService();