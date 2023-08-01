import { useState, useContext } from "react";
import { BiPhoneCall, BiPhoneOff, BiSolidEnvelope } from "react-icons/bi";
import { SocketContext } from "../Context";

const Options = () => {
  const {
    callAccepted,
    callEnded,
    leaveCall,
    callUser,
    auth,
    setRoomID,
    RoomID,
    createRoom,
    joinRoom,
  } = useContext(SocketContext);
  const [emailToCall, setEmailToCall] = useState("");


  const handleCallByEmail = () => {
    console.log("emailToCall: " + emailToCall);
    callUser(emailToCall);
    // if (emailToCall.includes("@")) {
    //   // If it contains '@', consider it as an email and call by email
    //   callUser(emailToCall);
    // }
    // else {
    //   // Otherwise, consider it as an ID and call by ID
    //   callUserById(emailToCall);
    // }
  };

  const handleCreateRoom = () => {
    console.log("option room: " + RoomID)
    createRoom(RoomID); // change to local context later for RoomID
  };

  const handleJoinRoom = () => {
    joinRoom(RoomID); // change to local context later for RoomID
  };

  return (
    auth && (
      <div style={styles.container}>
        <div style={styles.subcontainer}>
          <div style={styles.arrangebutton}>
            <label>Email to call</label>
            <input
              type="text"
              value={emailToCall}
              onChange={(e) => setEmailToCall(e.target.value)}
              placeholder="Enter email to call"
              style={{ width: "100%", marginTop: "10px" }}
            />
            <button onClick={handleCallByEmail} style={styles.callStyle}>
              <BiPhoneCall style={{ marginRight: "8px" }} />
              Call by Email
            </button>
            <label>Create RoomID</label>
            <input
              type="text"
              value={RoomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Enter Room Name"
              style={{ width: "100%", marginTop: "10px" }}
            />
            <button onClick={handleCreateRoom} style={styles.createRoom}>
              <BiSolidEnvelope style={{ marginRight: "8px" }} />
              Create Room
            </button>

            <label>Join RoomID</label>
            <input
              type="text"
              value={RoomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Enter Room Name"
              style={{ width: "100%", marginTop: "10px" }}
            />
            <button onClick={handleJoinRoom} style={styles.createRoom}>
              <BiSolidEnvelope style={{ marginRight: "8px" }} />
              Join Room
            </button>
            {callAccepted && !callEnded && (
              <button onClick={leaveCall} style={styles.hangup}>
                <BiPhoneOff style={{ marginRight: "8px" }} />
                Hang Up
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "35px 0",
    padding: "0",
  },
  subcontainer: {
    padding: "10px",
    border: "2px solid black",
  },
  arrangebutton: {
    display: "flex",
    flexDirection: "column",
    margin: "12px 0",
  },
  hangup: {
    marginTop: "10px",
    backgroundColor: "teal",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  createRoom: {
    marginTop: "10px",
    backgroundColor: "teal",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  callStyle: {
    marginTop: "10px",
    backgroundColor: "teal",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Options;
