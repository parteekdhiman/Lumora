import { validateEmail, sanitizeInput } from "@/utils/security";
import { SESSION_CONFIG } from "@/config/security";

// Email service simulation for frontend-only implementation with security enhancements
class EmailService {
  // Simulate sending email notification with security measures
  static sendNotification(to: string, subject: string, message: string) {
    // Validate input parameters
    if (!to || !subject || !message) {
      console.error('Email service: Missing required parameters');
      return Promise.resolve({ success: false, error: 'Missing required parameters' });
    }

    // Validate email format
    if (!validateEmail(to)) {
      console.error('Email service: Invalid email format');
      return Promise.resolve({ success: false, error: 'Invalid email format' });
    }

    // Sanitize inputs to prevent XSS attacks
    const sanitizedTo = sanitizeInput(to);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // In a real application, this would call an API endpoint
    // For frontend-only implementation, we'll simulate with console logs and localStorage
    
    const email = {
      id: Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      to: sanitizedTo,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    try {
      // Store in localStorage to simulate email history
      const emails = JSON.parse(localStorage.getItem("emails") || "[]");
      emails.push(email);
      localStorage.setItem("emails", JSON.stringify(emails));
    } catch (error) {
      console.error('Email service: Failed to store email in localStorage', error);
    }
    
    console.log(`📧 Email sent to ${sanitizedTo}: ${sanitizedSubject}`);
    return Promise.resolve({ success: true, email });
  }
  
  // Send application confirmation to job seeker
  static sendApplicationConfirmation(jobSeekerEmail: string, jobTitle: string, companyName: string) {
    // Validate input parameters
    if (!jobSeekerEmail || !jobTitle || !companyName) {
      return Promise.resolve({ success: false, error: 'Missing required parameters' });
    }

    const subject = `Application Received for ${sanitizeInput(jobTitle)} at ${sanitizeInput(companyName)}`;
    const message = `Thank you for applying for the ${sanitizeInput(jobTitle)} position at ${sanitizeInput(companyName)}. 
    Your application has been received and is currently under review. 
    We will contact you if there are any updates regarding your application status.`;
    
    return this.sendNotification(jobSeekerEmail, subject, message);
  }
  
  // Send application alert to employer
  static sendApplicationAlert(employerEmail: string, jobTitle: string, applicantName: string) {
    // Validate input parameters
    if (!employerEmail || !jobTitle || !applicantName) {
      return Promise.resolve({ success: false, error: 'Missing required parameters' });
    }

    const subject = `New Application for ${sanitizeInput(jobTitle)}`;
    const message = `${sanitizeInput(applicantName)} has applied for the ${sanitizeInput(jobTitle)} position. 
    Please review their application in your dashboard.`;
    
    return this.sendNotification(employerEmail, subject, message);
  }
  
  // Send interview request
  static sendInterviewRequest(jobSeekerEmail: string, jobTitle: string, companyName: string, details: string) {
    // Validate input parameters
    if (!jobSeekerEmail || !jobTitle || !companyName || !details) {
      return Promise.resolve({ success: false, error: 'Missing required parameters' });
    }

    const subject = `Interview Request for ${sanitizeInput(jobTitle)} at ${sanitizeInput(companyName)}`;
    const message = `Congratulations! You have been selected for an interview for the ${sanitizeInput(jobTitle)} position at ${sanitizeInput(companyName)}.
    
    Interview Details:
    ${sanitizeInput(details)}
    
    Please confirm your availability or suggest alternative times.`;
    
    return this.sendNotification(jobSeekerEmail, subject, message);
  }
  
  // Send application status update
  static sendApplicationStatusUpdate(jobSeekerEmail: string, jobTitle: string, companyName: string, status: string) {
    // Validate input parameters
    if (!jobSeekerEmail || !jobTitle || !companyName || !status) {
      return Promise.resolve({ success: false, error: 'Missing required parameters' });
    }

    const subject = `Application Status Update for ${sanitizeInput(jobTitle)} at ${sanitizeInput(companyName)}`;
    const message = `Your application for the ${sanitizeInput(jobTitle)} position at ${sanitizeInput(companyName)} has been updated.
    
    Current Status: ${sanitizeInput(status)}
    
    Please check your dashboard for more details.`;
    
    return this.sendNotification(jobSeekerEmail, subject, message);
  }
}

export default EmailService;