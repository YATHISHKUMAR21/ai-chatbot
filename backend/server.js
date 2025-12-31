require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./service/ai.service");

const httpServer = createServer(app);

const io = new Server(httpServer, {});

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai-message", async (userMessage) => {
    try {
      console.log("User prompt:", userMessage);

      // 1️⃣ Store user message
      chatHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
      });

      // 2️⃣ Generate AI response
      const aiResponse = await generateResponse(chatHistory);

      // 3️⃣ Store AI response
      chatHistory.push({
        role: "model",
        parts: [{ text: aiResponse }]
      });

      // 4️⃣ Send response back to client
      socket.emit("ai-response", aiResponse);

    } catch (error) {
      console.error("AI error:", error);
      socket.emit("ai-response", "Something went wrong 😓");
    }
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
