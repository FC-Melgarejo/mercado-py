// Importaciones de dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require("http");
const initializeSocket = require("./services/soket.io");  // Archivo de configuración de socket.io
const trackingRoutes = require("./routes/trakingRoute");

// Rutas adicionales de la API
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

// Configuración del servidor y puerto
const app = express();
const server = http.createServer(app);

// Inicializar Socket.io con el servidor HTTP
const io = initializeSocket(server);

// Middleware para que las rutas puedan usar socket.io
app.use((req, res, next) => {
  req.io = io;  // Añade socket.io al request
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log para confirmar que las rutas están siendo leídas
console.log('Registrando rutas...');

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api", trackingRoutes);

// Verificación de las rutas y log de acceso
app.all('/api/*', (req, res, next) => {
  console.log(`Ruta ${req.originalUrl} accesada con método ${req.method}`);
  next(); // Sigue el flujo de la ruta
});

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Bienvenido a MercadoPy API');
});

// Conexión a la base de datos MongoDB
console.log('DB_URL:', process.env.DB_URL);

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB: ', err));

// Iniciar servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


