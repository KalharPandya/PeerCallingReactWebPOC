// import { Box, Heading, Container } from "@chakra-ui/react";
// import Notifications from "./components/Notifications";
// import Options from "./components/Options";
// import VideoPlayer from "./components/VideoPlayer";

// function App() {
//   return (
//     <Box>
//       <Container maxW="1200px" mt="8">
//         <Heading as="h2" size="2xl">
//           {" "}
//           P2P Video Call{" "}
//         </Heading>
//         <VideoPlayer />
//         <Options />
//         <Notifications />
//       </Container>
//     </Box>
//   );
// }
// export default App;

import React from "react";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          padding: "20px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <h2
          style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}
        >
          P2P Video Call
        </h2>
        <VideoPlayer />
        <Options />
        <Notifications />
      </div>
    </div>
  );
}

export default App;
