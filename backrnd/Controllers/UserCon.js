import User from '../Models/User-Model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user and select specific fields
        const user = await User.findOne({ email, password }).select('_id name email');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Generate token with user ID
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response with user details and token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Login failed' 
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }

        // Create new user
        const user = await User.create({ 
            name, 
            email, 
            password 
        });

        // Generate token for new user
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Registration failed' 
        });
    }
};

const listUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {    
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
};

export { loginUser, registerUser, listUsers, deleteUser };
