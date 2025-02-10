import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });                                           // Aqui se inicializa la aplicación con next
const handler = app.getRequestHandler();

const onlineUsers = []

const addUser = (username, socketId) => {
  const isExist = onlineUsers.find(user => user.socketId === socketId)
  if(!isExist){
    onlineUsers.push({ username, socketId })
    console.log(username + " added");
  }
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("user removed!");
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {              // Cuando un cliente se conecta al servidor WebSocket, se ejecuta esta función.
    socket.on("newUser", (username) => {         // Se genera un socket único para ese cliente. socket es un objeto que representa la conexión entre el servidor y el cliente. Este socket escucha un evento "newUser" enviado por el cliente.
      addUser(username, socket.id);              // Llama a la función addUser para agregar el usuario a la lista de conectados.
    });

    socket.on("disconnect", () => {              // Cuando el cliente se desconecta del servidor, 
      removeUser(socket.id);                     // llama a la función removeUser para eliminar el usuario de la lista de conectados.
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});