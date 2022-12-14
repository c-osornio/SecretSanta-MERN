const express = require('express');
const app = express();
const cors = require('cors') 
const port = 8000;
const socket = require('socket.io');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))  

app.use(express.json(), express.urlencoded({ extended: true }));

// config
require("./config/mongoose.config");

// routes
require("./routes/user.routes")(app);
require("./routes/party.routes")(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

// io.on("connection", socket => {
//     console.log('socket id: ' + socket.id);
//     socket.on("new_product", (data) => {
//         socket.broadcast.emit("receive_products", data)
//     });
//     socket.on("remove_product", (data) => {
//         socket.broadcast.emit("receive_removal", data)
//     });
// });