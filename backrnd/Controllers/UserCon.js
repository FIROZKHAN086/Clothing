import User from '../Models/usermodel.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    res.status(200).json(user);
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User already exists' });
    }
}

const user = async (req, res) => {  
    const users = await User.find();
    res.status(200).json(users);
}

export { loginUser, registerUser, user };
