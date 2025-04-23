const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { ethers } = require("ethers");
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const wallet = ethers.Wallet.createRandom(); // Create a random wallet
    const walletAddress = wallet.address; // Get wallet address
    const walletPrivateKey = wallet.privateKey;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      walletAddress, // Store the wallet address
      walletPrivateKey, 
    });
    await newUser.save();

    req.session.user = newUser;

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or account type' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    req.session.user = user;
    req.session.role = user.role;
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Check session route
router.get('/check-session', (req, res) => {
    if (req.session.user) {
      res.status(200).json({ success: true, user: req.session.user });
    } else {
      res.status(401).json({ success: false, message: 'No active session' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});


// Get user profile data
router.get('/user', (req, res) => {
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ message: 'No active session' });
    }
  });
  
  

module.exports = router;
