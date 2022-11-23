const express = require('express');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const app = express();
const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

var port = 3000;
const httpServer = app.listen(port, () => {
    console.log(`Server running on ${port}.`);
})

const io = new Server(httpServer,{
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});
io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {

})