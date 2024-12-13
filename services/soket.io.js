const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Permitir todas las conexiones; ajusta según sea necesario.
    },
  });

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Escucha actualizaciones de ubicación desde el repartidor
    socket.on("update-location", (data) => {
      const { orderId, location, eta } = data;

      // Emite la nueva ubicación a los clientes conectados
      io.emit(`order-update-${orderId}`, { location, eta });
      console.log(`Actualización para orden ${orderId}:`, data);
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;


