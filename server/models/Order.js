const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number }
    }
  ],
  orderType: {
    type: String,
    enum: ['product', 'service'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['CBE', 'Telebirr', 'Binance'],
    required: true
  },
  paymentProofUrl: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);