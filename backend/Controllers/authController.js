const User= require('../Models/user')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Name, email and password are required' 
            })
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            })
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            })
        }

        // Check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Generate token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )

        // Set cookie for development
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // false for HTTP in development
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        // Success response
        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: token // Optional: send token in response for mobile apps
        })

    } catch (error) {
        console.error('Registration Error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        })
    }
}


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })

        res.json({
            success: true,
            message: 'Logged out successfully'
        })

    } catch (error) {
        console.error('Logout Error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error during logout'
        })
    }
}