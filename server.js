const app = require("./src/app");
const {createServer} = require("http");
const {Server} = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log("a user connected");  
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}); 




