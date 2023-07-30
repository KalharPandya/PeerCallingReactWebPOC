// import { useContext } from "react";
// import { Box, Button, Heading } from "@chakra-ui/react";
// import { SocketContext } from "../Context";

// const Notifications = () => {
//   const { answerCall, call, callAccepted } = useContext(SocketContext);

//   return (
//     <>
//       {call.isReceivingCall && !callAccepted && (
//         <Box display="flex" justifyContent="space-around" mb="20">
//           <Heading as="h3"> {call.name} is calling </Heading>
//           <Button
//             variant="outline"
//             onClick={answerCall}
//             border="1px"
//             borderStyle="solid"
//             borderColor="black"
//           >
//             Answer Call
//           </Button>
//         </Box>
//       )}
//     </>
//   );
// };
// export default Notifications;

import React, { useContext } from "react";
import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ fontSize: "20px", margin: "0" }}>
            {call.name} is calling
          </h3>
          <button
            onClick={answerCall}
            style={{
              padding: "8px 16px",
              border: "1px solid black",
              borderRadius: "4px",
              backgroundColor: "#4299E1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Answer Call
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
