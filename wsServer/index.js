const expressWs = require("express-ws");

const clients = {};

module.exports = (app) => {
  expressWs(app);

  app.ws("/ws/user", (wsClient) => {
    const id = Math.random();
    console.log("new client:", id);

    clients[id] = wsClient;

    wsClient.on("message", (data) => {
      console.log(data, id);

      process.myEvents.emit("webSocketData", {
        data: data,
        send: (sendData) => {
          wsClient.send(sendData);
        },
      });
    });

    wsClient.on("close", () => {
      console.log("client close", id);
      delete clients[id];
    });
  });
};
