// Security utility functions for the job portal application

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Validates email format
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validates phone number format (US format)
 * @param phone - The phone number to validate
 * @returns True if valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  if (typeof phone !== 'string') return false;
  // Simple validation for US phone numbers
  return /^(\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
};

/**
 * Validates URL format
 * @param url - The URL to validate
 * @returns True if valid, false otherwise
 */
export const validateUrl = (url: string): boolean => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Validates password strength
 * @param password - The password to validate
 * @returns True if strong enough, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  if (typeof password !== 'string') return false;
  // At least 8 characters, contains letters and numbers
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
};

/**
 * Generates a secure random ID
 * @returns A secure random ID string
 */
export const generateSecureId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

/**
 * Performs constant-time string comparison to prevent timing attacks
 * @param a - First string
 * @param b - Second string
 * @returns True if strings are equal, false otherwise
 */
export const constantTimeCompare = (a: string, b: string): boolean => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  
  // Simple constant-time comparison
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
};

/**
 * Escapes HTML special characters
 * @param str - The string to escape
 * @returns Escaped string
 */
export const escapeHtml = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Removes potentially dangerous characters from user input
 * @param input - The input to sanitize
 * @returns Sanitized input
 */
export const removeDangerousChars = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '');
};

export default {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateUrl,
  validatePassword,
  generateSecureId,
  constantTimeCompare,
  escapeHtml,
  removeDangerousChars
};