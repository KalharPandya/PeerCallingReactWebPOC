import { useContext } from "react";
import { SocketContext } from "../Context";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div style={styles.container}>
      {stream && (
        <div style={styles.myVideoContainer}>
          <h5 style={styles.myname}>{name}</h5>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={styles.myvideo}
          />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div style={styles.userVideoContainer}>
          <h5 style={styles.username}>{call.name || "Name"}</h5>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={styles.uservideo}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginTop: "20px",
  },
  userVideoContainer: {
    gridColumn: "2",
    textAlign: "center",
    backgroundColor: "#1de2a7",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  myVideoContainer: {
    gridColumn: "1",
    textAlign: "center",
    backgroundColor: "#1de2a7",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  username: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "white",
  },
  myname: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "white",
  },
  uservideo: {
    maxWidth: "100%",
    borderRadius: "4px",
  },
  myvideo: {
    maxWidth: "100%",
    borderRadius: "4px",
  },
};

export default VideoPlayer;
