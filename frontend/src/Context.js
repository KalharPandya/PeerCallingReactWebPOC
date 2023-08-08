import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
// const socket = io("http://localhost:8080");
const socket = io(process.env.REACT_APP_API_URL);
const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [RoomID, setRoomID] = useState("");
  const [auth, setAuth] = useState(false);
  const [Username, setUsername] = useState(false);
  // const [joinroomid, setJoinroomID] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signalData }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signalData });
      // console.log("useEffect signal: " + JSON.stringify(call));
      // socket.emit("callReceived");
      // answerCall();
    });

  }, []);

  const authorizeUser = (email) => {
    socket.emit("authorizeUser", { email });
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      // socket.emit("answerCall", { signal: data, to: call.from, room: RoomID });
      // console.log("answerCall signal: "+signal)
      socket.emit("answerCall", { signalData: data, to: call.from, room: RoomID });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    console.log("call signal: " + JSON.stringify(call));
    peer.signal(call.signalData);
    connectionRef.current = peer;
  };

  const callUser = () => {
    console.log("me: " + me);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: me,
        name,
        room: RoomID,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    // socket.on("new", () => {
    //   console.log("new");
    //   callUser();
    // });
    // if (!callAccepted) {
    //   callUser();
    // }
    connectionRef.current = peer;
  };

  const createRoom = (roomID) => {
    console.log("create room: " + roomID);
    socket.emit("createRoom", { roomID });
    // callUser();
    socket.on("new", () => {
      console.log("new");
      callUser();
    });
  };

  const joinRoom = (roomID) => {
    console.log("join: " + roomID);
    socket.emit("joinRoom", { roomID });
    socket.on("answer", () => {
      console.log("join answerCall");
      console.log("call signal: " + JSON.stringify(call));
      // answerCall();
    });
    // answerCall();
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        Username,
        auth,
        RoomID,
        setAuth,
        setName,
        setUsername,
        setRoomID,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        authorizeUser,
        createRoom,
        joinRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
