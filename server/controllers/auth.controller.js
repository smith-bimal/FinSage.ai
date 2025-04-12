import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const fetchUserData = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Fetch user data error:", error);
        res.status(500).json({ message: "Server error while fetching user data" });
    }
};

export const registerUser = async (req, res) => {
    try {
        // Extract all submitted fields
        const { email, password, firstName, lastName, phone, address } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user with all provided fields
        const user = new User({ 
            email, 
            password: hashedPassword,
            firstName,
            lastName,
            name: `${firstName} ${lastName}`, // For backward compatibility
            phone,
            address
        });
        
        await user.save();

        // Create a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Return token and user object (excluding password)
        const userToReturn = user.toObject();
        delete userToReturn.password;
        
        res.status(201).json({ 
            user: userToReturn,
            token,
            message: 'User registered successfully' 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Return user object excluding password
        const userToReturn = user.toObject();
        delete userToReturn.password;
        
        res.json({ 
            user: userToReturn,
            token 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};