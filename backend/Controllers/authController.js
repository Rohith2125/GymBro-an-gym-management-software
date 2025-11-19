// controllers/authController.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Enter all fields' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashpassword })
        
        const token = jwt.sign(
            {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                authType: 'local'
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true only in production with HTTPS
            sameSite: 'lax',
            maxAge: 3600000
        })

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { name: newUser.name, email: newUser.email } 
        })

    } catch (err) {
        console.error("Register Error:", err)
        res.status(500).json({ message: 'Registration failed', error: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Enter all fields' })
        }

        const user = await User.findOne({ email })
        if (!user) { 
            return res.status(401).json({ message: 'Invalid email or password' }) 
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { 
            return res.status(401).json({ message: 'Invalid email or password' }) 
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000
        })

        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                id: user._id,
                name: user.name, 
                email: user.email 
            } 
        })

    } catch (err) {
        console.error("Login Error:", err)
        res.status(500).json({ message: 'Login failed', error: err.message })
    }
}

exports.googleLogin = async (req, res) => {
    try {
        console.log('Received request body:', req.body) // Debug log

        const { token } = req.body

        if (!token) {
            return res.status(400).json({ message: 'Token is required' })
        }

        console.log('Verifying token with Client ID:', process.env.GOOGLE_CLIENT_ID) // Debug log

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()
        console.log('Google payload:', payload) // Debug log

        const { name, email, sub: googleId } = payload

        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                name,
                email,
                password: null,
                authType: 'google',
                googleId
            })
            console.log('New user created:', user) // Debug log
        } else {
            console.log('Existing user found:', user) // Debug log
        }

        const jwtToken = jwt.sign(
            { 
                id: user._id, 
                name: user.name,
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000
        })

        res.status(200).json({ 
            message: 'Google login successful', 
            user: { 
                name: user.name, 
                email: user.email 
            } 
        })

    } catch (error) {
        console.error("Google Login Error:", error)
        res.status(400).json({ 
            message: 'Failed to login with Google', 
            error: error.message,
            details: error.toString() // More detailed error for debugging
        })
    }
}