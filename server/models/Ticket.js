const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Valid', 'Used', 'Expired'], default: 'Valid' },
  credentialId: { type: String, required: true }, // WebAuthn credential ID if needed
  publicKey: { type: Buffer, required: true },     // WebAuthn public key for verification
  counter: { type: Number, default: 0 },
});

module.exports = mongoose.model('Ticket', ticketSchema);