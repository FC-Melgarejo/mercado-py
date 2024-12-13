const express = require('express');
const Product = require('../models/Product');
const verifyToken = require('../middlewares/authMiddleware');
const verifySeller = require('../middlewares/roleMiddleware');
const router = express.Router();

// Crear un producto
router.post('/', verifyToken, verifySeller, async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;
    try {
      const product = new Product({ name, description, price, category, stock, images });
      await product.save();
      res.status(201).json({ message: 'Producto creado exitosamente', product });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  });

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Actualizar un producto
router.put('/:id', verifyToken, verifySeller, async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, stock, images }, { new: true });
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(200).json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });

// Eliminar un producto
router.delete('/:id', verifyToken, verifySeller, async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

module.exports = router;
