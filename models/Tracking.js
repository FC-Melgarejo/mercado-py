const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  events: [
    {
      status: { type: String, required: true }, // Ej: 'empaquetado', 'en tránsito'
      location: { 
        lat: { type: Number }, 
        lng: { type: Number }, 
        description: String 
      },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  currentLocation: { 
    lat: { type: Number },
    lng: { type: Number }
  },
  eta: { type: Date }, // Tiempo estimado de llegada
});

const Tracking = mongoose.model('Tracking', trackingSchema);
module.exports = Tracking;
