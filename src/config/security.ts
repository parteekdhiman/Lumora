// Security configuration for the job portal application

// Password policy
export const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: false,
  requireLowercase: false,
  requireNumbers: true,
  requireSpecialChars: false,
  allowedSpecialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

// Session configuration
export const SESSION_CONFIG = {
  localStorageKey: 'user',
  usersStorageKey: 'users',
  applicationsStorageKey: 'applications',
  conversationsStorageKey: 'conversations',
  maxSessionAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Input validation rules
export const INPUT_VALIDATION = {
  maxNameLength: 100,
  maxEmailLength: 254,
  maxPhoneLength: 20,
  maxMessageLength: 1000,
  maxCoverLetterLength: 5000,
};

// Security headers (for documentation purposes)
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
};

// Rate limiting configuration (for API calls in a real application)
export const RATE_LIMITING = {
  maxRequestsPerMinute: 60,
  maxFailedLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes in milliseconds
};

// Data retention policies
export const DATA_RETENTION = {
  applicationHistoryDays: 365,
  messageHistoryDays: 180,
  sessionTimeoutMinutes: 30,
};

// Export all configurations
export default {
  PASSWORD_POLICY,
  SESSION_CONFIG,
  INPUT_VALIDATION,
  SECURITY_HEADERS,
  RATE_LIMITING,
  DATA_RETENTION,
};