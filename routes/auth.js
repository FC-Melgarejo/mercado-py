const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body; // Consistencia con los campos
    try {
        console.log('Datos recibidos:', { name, email, password, role });

        // Verifica si el usuario ya existe
        const userExists = await User.findOne({ email });
        console.log('Usuario ya existe:', email);
        if (userExists) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', hashedPassword);

        // Crea y guarda el usuario
        const newUser = new User({ name, email, password: hashedPassword, role });
        
        await newUser.save();
        console.log('Usuario creado:', newUser);

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        if (!res.headersSent) {  // Verifica si los encabezados ya han sido enviados
            res.status(500).json({ error: "Error al registrar usuario" });
        }
    }
});

// Ruta para iniciar sesión (login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Busca el usuario por email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales incorrectas' });

         // Genera un token JWT usando la clave secreta del entorno
         const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET, // Clave secreta desde el entorno
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;



