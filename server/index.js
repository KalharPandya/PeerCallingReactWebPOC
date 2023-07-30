const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const socketToEmail = {};

app.use(cors());
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  console.log("socketID: " + socket.id);
  socket.on("authorizeUser", ({ email }) => {
    console.log("auth received");
    socketToEmail[socket.id] = email;
    // right now it is imp but look into alternative to not send actual socket.id in communication

    console.log(socketToEmail);

    // Respond with a success message // not required right now
    // socket.emit("userAuthorized", { success: true });

    // Notify other peers that a new user has been authorized // not required right now
    // socket.broadcast.emit("userAuthorized", { email, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    delete socketToEmail[socket.id];
    console.log(socketToEmail);

    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ email, signalData, from, name }) => {
    console.log("call email: " + email);
    console.log("call from: " + from);
    console.log("call name: " + name);
    // Look up the socket.id associated with the email
    const userSocketId = Object.keys(socketToEmail).find(
      (socketId) => socketToEmail[socketId] == email
    );
    console.log("email->socket: " + userSocketId);
    if (userSocketId) {
      io.to(userSocketId).emit("callUser", { signal: signalData, from, name });
    } else {
      socket.emit("callUserError", { error: "User not found" });
    }
  });

  socket.on("answerCall", (data) => {
    console.log("data to: " + data.to);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// idea/flow //

// when not authorized using auth0 we can still use ID by copying ID and sending that ID to the other peer via other communication means(current implemented 26 July 2023)

// when authorized use email-id to initiate communication

//peer gets connected gets socket.id for individual peer
// assign each socket.id with email-id after auth0

// idea for future change //

// have error msg for the event when a peer enters a email-id to call but server doesn't have it associated with any socket.id

// both peers first need to register themselves with each other then only they can communicate as of right now(26 July 2023) any peer can receive call from any peer(this can lead to spam), it will be like add each other in their a trusted contact list. this can be done using socket.broadcast and sending a "friend request to peer"

// search for better way to associate each socket.id with email-id

// doubt //

// when the app is closed will the peer recieve the call or app needs to be running or running in backgorund

//For 28-07-2023
//task
// make that only authorized user are able to send call to each other and add rooms to join

//implement
//socket->email only when user clicks on create a room

//idea
//create a single unique id for room so that any user can join
