const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  status: { 
    type: String, 
    enum: ['pendiente', 'pagado', 'en preparación', 'empaquetado', 'en tránsito', 'entregado'], 
    default: 'pendiente' 
  },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  tracking: { type: mongoose.Schema.Types.ObjectId, ref: 'Tracking' }, // Relación con el seguimiento
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

