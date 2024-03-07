const app = require("express")();
const server = require("http").createServer(app);
const options = {
    // Websocket options
}
const io = require("socket.io")(server, options);


module.exports = {
    app,
    io,
    server
}