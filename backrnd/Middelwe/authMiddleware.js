import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authorization token required' 
            });
        }

        // Extract token from header
        const token = authHeader.split(' ')[1];

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Add user info to request
            req.user = {
                _id: decoded.userId
            };

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error in auth middleware'
        });
    }
};

