import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization');

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token required'
            });
        }

        // Remove 'Bearer ' if present
        const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;

        try {
            // Verify token
            const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export default authMiddleware;