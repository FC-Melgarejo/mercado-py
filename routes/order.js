const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Crear un pedido
router.post('/', async (req, res) => {
    const { product, buyer, seller } = req.body;
    try {
        const order = new Order({ product, buyer, seller });
        await order.save();
        res.status(201).json({ message: 'Pedido creado exitosamente', order });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
});

// Actualizar el estado del pedido
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ message: 'Estado del pedido actualizado', order });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
    }
});

// Agregar una ubicación de seguimiento
router.post('/:id/tracking', async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });

        order.tracking.push({ location });
        await order.save();
        res.status(200).json({ message: 'Seguimiento actualizado', order });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el seguimiento' });
    }
});

// Obtener el seguimiento de un pedido
router.get('/:id/tracking', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('product buyer seller', 'name email');
        if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });

        res.status(200).json(order.tracking);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el seguimiento' });
    }
});

module.exports = router;
