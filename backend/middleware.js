const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authMiddleware = function(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Authorization header missing or not properly formatted"
        });
    }

    // For example, if authHeader is "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", then split(' ') will produce:
    // ['Bearer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...']
    // The [1] accesses the second element of the array, which is the actual token.
    // So token will contain the actual token
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = {
    authMiddleware
};
