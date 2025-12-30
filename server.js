require("dotenv").config();
const app = require("./src/app");
const {createServer} = require("http");
const {Server} = require("socket.io");
const generateResponse = require("./service/ai.service");

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


    // socket.on("message", (msg)=>{
    //     console.log( msg);
    //     io.emit("chat message", msg);
    // });

    socket.on("ai-message", async (data)=>{
      const response = await generateResponse(data.message);
      console.log("AI Response:", response);
      socket.emit("ai-response", { message: response });
     });






});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}); 




