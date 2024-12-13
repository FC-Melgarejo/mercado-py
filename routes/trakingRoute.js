const express = require("express");
const Tracking = require("../models/Tracking"); // Importa tu modelo
const router = express.Router();

// Actualiza la ubicación de un pedido
router.post("/tracking/update", async (req, res) => {
  const { orderId, location, eta } = req.body;

  try {
    // Actualiza la base de datos
    const tracking = await Tracking.findOne({ order: orderId });
    if (!tracking) {
      return res.status(404).json({ message: "Seguimiento no encontrado" });
    }

    tracking.currentLocation = location;
    tracking.eta = eta;
    tracking.events.push({
      status: "en tránsito",
      location,
    });
    await tracking.save();

    // Emite la actualización a los clientes
    req.io.emit(`order-update-${orderId}`, { location, eta });

    res.status(200).json({ message: "Ubicación actualizada exitosamente" });
  } catch (error) {
    console.error("Error actualizando la ubicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
