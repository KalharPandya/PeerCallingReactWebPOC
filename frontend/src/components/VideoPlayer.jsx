// import { Grid, Box, Heading } from "@chakra-ui/react";
// import { SocketContext } from "../Context";
// import { useContext } from "react";

// const VideoPlayer = () => {
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
//     useContext(SocketContext);

//   return (
//     <Grid justifyContent="center" templateColumns="repeat(2, 1fr)" mt="12">
//       {/* my video */}
//       {stream && (
//         <Box>
//           <Grid colSpan={1}>
//             <Heading as="h5">{name || "Name"}</Heading>
//             <video playsInline muted ref={myVideo} autoPlay width="600" />
//           </Grid>
//         </Box>
//       )}
//       {/* user's video */}
//       {callAccepted && !callEnded && (
//         <Box>
//           <Grid colSpan={1}>
//             <Heading as="h5">{call.name || "Name"}</Heading>
//             <video playsInline ref={userVideo} autoPlay width="600" />
//           </Grid>
//         </Box>
//       )}
//     </Grid>
//   );
// };
// export default VideoPlayer;

import { useContext } from "react";
import { SocketContext } from "../Context";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(2, 1fr)",
        marginTop: "12px",
      }}
    >
      {/* my video */}
      {stream && (
        <div style={{ gridColumn: "1", textAlign: "center" }}>
          <h5 style={{ fontSize: "18px", marginBottom: "10px" }}>
            {name || "Name"}
          </h5>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            width="600"
            style={{ maxWidth: "100%", borderRadius: "4px" }}
          />
        </div>
      )}
      {/* user's video */}
      {callAccepted && !callEnded && (
        <div style={{ gridColumn: "2", textAlign: "center" }}>
          <h5 style={{ fontSize: "18px", marginBottom: "10px" }}>
            {call.name || "Name"}
          </h5>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            width="600"
            style={{ maxWidth: "100%", borderRadius: "4px" }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
