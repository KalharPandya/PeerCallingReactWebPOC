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
    console.log(socketToEmail);
  });

  socket.on("createRoom", ({ roomID, }) => {

    // console.log("create room: " + roomID);
    // console.log(([socketToEmail[socket.id]]) == false)
    // console.log("create adapter: " + io.sockets.adapter.rooms.has(roomID));
    if ([socketToEmail[socket.id]] != false) {
      if (io.sockets.adapter.rooms.has(roomID) == false) {
        socket.join(roomID);
        // socket.emit("handleCreate")
        console.log("created room: " + roomID);
      }
      else {
        console.log("Error: room already exist");
      }
    }
    else {
      console.log("Error: reload webpage");
    }
  });

  socket.on("joinRoom", ({ roomID, }) => {
    if (socketToEmail[socket.id] != false) {
      console.log("adapter: " + io.sockets.adapter.rooms.has(roomID));
      if (io.sockets.adapter.rooms.has(roomID) == true) {
        socket.join(roomID);
        console.log("joined room: " + roomID);
      }
      else {
        console.log("Error: room doesnt exist");
      }
    }
    else {
      console.log("Error: reload webpage");
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnet");
    const allMember = [...io.sockets.adapter.rooms];
    console.log("allMember: " + allMember);
    if (allMember == false) {
      console.log("room deleted");
    }
    delete socketToEmail[socket.id];
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ signalData, from, name, room }) => {
    io.to(room).emit("callUser", { signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.room).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



/*
call flow
keshav -> kalhar

keshav clicks on Call invokes callUser emits callUser to socket
socket sends signal to address mentioned in signal by emitting callUser
kalhar receives call from keshav (receives in useEffect sets isReceivingCall)
kalhar clicks on answer call invokes answerCall emits answerCall to socket
server emits callAccepted with kalhar signal
keshav receives callAccepted and sets setCallAccepted and stream is in 'call' useState
in this both peer objects are set upped and then they take care of transfer of signal

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
