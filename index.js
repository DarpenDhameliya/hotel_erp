const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
var bodyParser = require("body-parser");
const mongoconnect = require('./db')

var cors = require("cors");
const Roomsocket = require("./Socket/IndexSocket");
mongoconnect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection" , Roomsocket)

// app.use("/app", require("./routs/RoomChat"));

server.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});