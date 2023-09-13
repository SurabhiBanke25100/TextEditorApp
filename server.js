const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);


// Socket.io connection logic
io.on('connection', (socket) => {
    console.log('connected...');


    //for multiple connections
    socket.on("message", (msg) => {

        io.emit('message', msg);
        //socket.broadcast.emit('message', msg);

    });

});


// Serve static files (e.g., CSS, JavaScript) from the "frontend" directory
app.use(express.static(__dirname + '/frontend'));


// Serve the HTML file when accessing the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//Start the server
server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});