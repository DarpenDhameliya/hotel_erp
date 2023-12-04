const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
var bodyParser = require("body-parser");
var cors = require("cors");
const Roomsocket = require("./Sockets/IndexSocket");
var port = process.env.PORT
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", Roomsocket)

server.listen(8002, (req, res) => {
    console.log(`Server is listening on port 8002`);
});
