const express = require('express');
const router = express.Router();
const crypto = require("node:crypto");
const {
    generateRegistrationOptions,
    verifyRegistrationResponse,
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} = require('@simplewebauthn/server');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
// const base64url = require('base64url');

// Polyfill Web Crypto API if needed
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}

// Utility function for base64url encoding
function toBase64Url(buffer) {
  if (!Buffer.isBuffer(buffer)) {
      throw new Error('Input must be a Buffer');
  }
  return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

// 1️⃣ Begin registration
router.post('/generate-registration-options', async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const options = await generateRegistrationOptions({
      rpName: 'Concert Booking App',
      rpID: 'localhost',
      userID: Buffer.from(user._id, 'utf8'),
      userName: user.email,
      userDisplayName: user.name,
      timeout: 60000,
      attestationType: 'indirect',
      authenticatorSelection: {
        residentKey: 'discouraged',
        userVerification: 'preferred',
      },
    });
    
    req.session.currentChallenge = options.challenge;
    res.json(options);
  } catch (error) {
    console.error('Error generating registration options:', error);
    res.status(500).json({ error: 'Failed to generate WebAuthn options' });
  }
});  


// 2️⃣ Verify response and store ticket
router.post('/verify-registration', async (req, res) => {
  const { authenticationResult } = req.body;
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const verification = await verifyRegistrationResponse({
      response: authenticationResult,
      expectedChallenge: req.session.currentChallenge,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
    });

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credential } = registrationInfo;
      const uint8Array = new Uint8Array(verification.registrationInfo.credential.publicKey);
      const buffer = Buffer.from(uint8Array);

        await User.findByIdAndUpdate(user._id, {
          $set: {
            webauthn: {
              publicKey: buffer,
              credentialId: toBase64Url(Buffer.from(credential.id)),
              counter: credential.counter,
            },
          },
        });
        
      return res.status(201).json({ success: true, message: 'Ticket booked!' });
    }

    res.status(400).json({ success: false, message: 'WebAuthn verification failed' });
  } catch (error) {
    console.error("WebAuthn error:", error);
    res.status(500).json({ success: false, message: 'Server error during WebAuthn' });
  }
});

// 3️⃣ Generate authentication options for QR check-in
router.post('/generate-authentication-options', async (req, res) => {
    const { eventId } = req.body;
    const user = req.session.user;
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    try {
        // Verify ticket exists for this event
        const ticket = await Ticket.findOne({ userId: user._id, eventId });
        if (!ticket) return res.status(404).json({ error: 'Valid ticket not found for this event' });

        const options = await generateAuthenticationOptions({
          rpID: 'localhost',
        });

        req.session.currentChallenge = options.challenge;
        res.json(options);
    } catch (error) {
        console.error('Error generating auth options:', error);
        res.status(500).json({ error: 'Failed to generate authentication options' });
    }
});

function bufferToUint8Array(buffer) {
  return new Uint8Array(buffer);
}

// 4️⃣ Verify authentication for event check-in
router.post('/verify-authentication', async (req, res) => {
    const { eventId, authenticationResponse } = req.body;
    const user = req.session.user;

    if (!user || !eventId) {
        return res.status(401).json({ error: 'Authentication session expired' });
    }

    try {
        // Verify ticket exists
        const ticket = await Ticket.findOne({ userId: user._id, eventId });
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

        const backToUint8Array = bufferToUint8Array(ticket.publicKey);

        const verification = await verifyAuthenticationResponse({
            response: authenticationResponse,
            expectedChallenge: req.session.currentChallenge,
            expectedOrigin: 'http://localhost:3000',
            expectedRPID: 'localhost',
            credential: {
              id:  Buffer.from(ticket.credentialId, 'base64'),
              publicKey: backToUint8Array,
              counter: ticket.counter ||0,
            },
        });

        if (verification.verified) {
            // Mark ticket as used
            await Ticket.findByIdAndUpdate(ticket._id, { status: 'Used' });
            return res.json({ success: true, message: 'Event check-in successful!' });
        }

        res.status(400).json({ success: false, message: 'Authentication failed' });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, message: 'Server error during authentication' });
    }
});

module.exports = router;