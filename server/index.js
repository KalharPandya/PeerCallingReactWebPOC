const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Store the socket.id and email-id mapping
const socketToEmail = {};

io.on("connection", (socket) => {
  socket.emit("me", socket.id); // not sure if we need to have a me stored and commincated with peer check into this
  console.log("socketID: " + socket.id);
  socket.on("authorizeUser", ({ email }) => {
    console.log("auth received");
    // Store the email-id in association with the socket.id
    socketToEmail[socket.id] = email;
    // right now it is imp but look into alternative to not send actual socket.id in communication

    console.log(socketToEmail);

    // Respond with a success message // not required right now
    // socket.emit("userAuthorized", { success: true });

    // Notify other peers that a new user has been authorized // not required right now
    // socket.broadcast.emit("userAuthorized", { email, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    // Remove the socket.id and email-id mapping when a user disconnects
    delete socketToEmail[socket.id];
    console.log(socketToEmail);

    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ email, signalData, from, name }) => {
    // Look up the socket.id associated with the email
    console.log("call email: " + email);
    console.log("call from: " + from);
    console.log("call name: " + name);
    const userSocketId = Object.keys(socketToEmail).find(
      (socketId) => socketToEmail[socketId] == email
    );
    console.log("email->socket: " + userSocketId);
    if (userSocketId) {
      // from = userSocketId;
      // If the email is associated with a socket.id, forward the call request
      io.to(userSocketId).emit("callUser", { signal: signalData, from, name });
    } else {
      // If the email is not associated with any socket.id, respond with an error
      socket.emit("callUserError", { error: "User not found" });
    }
  });

  socket.on("answerCall", (data) => {
    console.log("data to: " + data.to);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/*

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

*/

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
