import { app, connectDB } from "./app";
import { Server } from "socket.io";
import http from "http";
import { Order } from "./models/Order";
import { setupSwagger } from "./swaggerSetup";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN },
});

(app as any).io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join-kitchen", (restaurantSlug) => {
    socket.join(`kitchen-${restaurantSlug}`);
  });

  socket.on("join-order-tracking", (orderId) => {
    socket.join(`order-${orderId}`);
  });
});

setupSwagger(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
});
