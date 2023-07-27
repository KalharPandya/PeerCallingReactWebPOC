// import { createContext, useState, useRef, useEffect } from "react";
// import { io } from "socket.io-client";
// import Peer from "simple-peer";

// const SocketContext = createContext();
// const socket = io("http://localhost:8080");
// const ContextProvider = ({ children }) => {
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [stream, setStream] = useState();
//   const [name, setName] = useState("");
//   const [call, setCall] = useState({});
//   const [me, setMe] = useState("");
//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         // myVideo.current.srcObject = currentStream;
//         if (myVideo.current) {
//           myVideo.current.srcObject = currentStream;
//         }
//       });

//     socket.on("me", (id) => setMe(id));
//     socket.on("callUser", ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);
//     const peer = new Peer({ initiator: false, trickle: false, stream });
//     peer.on("signal", (data) => {
//       socket.emit("answerCall", { signal: data, to: call.from });
//     });
//     peer.on("stream", (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });
//     peer.signal(call.signal);
//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });
//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name,
//       });
//     });
//     peer.on("stream", (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });
//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });
//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//     window.location.reload();
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         call,
//         callAccepted,
//         myVideo,
//         userVideo,
//         stream,
//         name,
//         setName,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };
// export { ContextProvider, SocketContext };

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
  const [auth, setAuth] = useState(false); //
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
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const authorizeUser = (email) => {
    socket.emit("authorizeUser", { email });
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // Modify the callUser function to accept an email instead of an ID
  const callUser = (email) => {
    console.log("callUser: " + email);
    console.log("me: " + me);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        email,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
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
        auth,
        setAuth,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        authorizeUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
