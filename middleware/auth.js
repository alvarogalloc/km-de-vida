/**
 * Authentication middleware for Express routes.
 * Verifies that requests include valid user authentication.
 * 
 * NOTE: This is a basic implementation. In production, you would:
 * - Use JWT tokens or session cookies
 * - Verify tokens against a secret key
 * - Check token expiration
 * - Store sessions in Redis or similar
 */

/**
 * Middleware to verify user is authenticated.
 * Currently checks for userId in request body.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function requireAuth(req, res, next) {
    // In a real app, you'd verify a JWT token or session cookie here
    // For this prototype, we check if userId is provided
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
        return res.status(401).json({
            error: 'Authentication required',
            message: 'Please log in to perform this action'
        });
    }

    req.userId = userId;
    next();
}

/**
 * Middleware to verify user owns the resource they're trying to modify.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function requireOwnership(req, res, next) {
    // This would check if the user owns the resource
    // Implementation depends on your data model
    next();
}

/**
 * Sanitize user input to prevent injection attacks.
 * 
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/[<>]/g, '') // Remove < and > to prevent XSS
        .substring(0, 1000); // Limit length
}
