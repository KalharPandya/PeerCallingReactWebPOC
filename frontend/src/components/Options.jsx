// import { useState, useContext } from "react";
// import {
//   Button,
//   Input,
//   FormLabel,
//   Heading,
//   Grid,
//   Box,
//   Container,
//   FormControl,
// } from "@chakra-ui/react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import {
//   BiClipboard,
//   BiPhoneCall,
//   BiPhoneOff,
//   BiSolidEnvelope,
// } from "react-icons/bi";
// import { SocketContext } from "../Context";

// const Options = () => {
//   const {
//     me,
//     callAccepted,
//     name,
//     setName,
//     callEnded,
//     leaveCall,
//     callUser,
//     auth,
//   } = useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState("");
//   const [emailToCall, setEmailToCall] = useState("");

//   const handleCallByEmail = () => {
//     console.log("emailToCall: " + emailToCall);
//     callUser(emailToCall);
//     // if (emailToCall.includes("@")) {
//     //   // If it contains '@', consider it as an email and call by email
//     //   callUser(emailToCall);
//     // }
//     // else {
//     //   // Otherwise, consider it as an ID and call by ID
//     //   callUserById(emailToCall);
//     // }
//   };

//   const handleCreateRoom = () => {};

//   return (
//     auth && (
//       <Container maxW="1200px" m="35px 0" p="0">
//         <Box p="10px" border="2px" borderColor="black" borderStyle="solid">
//           <FormControl
//             display="flex"
//             flexDirection="column"
//             noValidate
//             aria-autocomplete="none"
//           >
//             <Grid templateColumns="repeat(2, 1fr)" mt="12">
//               <Grid colSpan={1} p="6">
//                 <Heading as="h6"> Account Info </Heading>
//                 <FormLabel>Username</FormLabel>
//                 <Input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   width="100%"
//                 />
//                 <CopyToClipboard text={me} mt="20">
//                   <Button
//                     leftIcon={<BiClipboard />}
//                     colorScheme="teal"
//                     variant="solid"
//                   >
//                     Copy ID
//                   </Button>
//                 </CopyToClipboard>
//               </Grid>
//               <Grid colSpan={1} p="6">
//                 <Heading as="h6"> Make a Call </Heading>
//                 <FormLabel> User id or Email to call </FormLabel>
//                 <Input
//                   type="text"
//                   value={idToCall}
//                   onChange={(e) => setIdToCall(e.target.value)}
//                   placeholder="Enter user id or email"
//                   width="100%"
//                 />
//                 <Input
//                   type="text"
//                   value={emailToCall}
//                   onChange={(e) => setEmailToCall(e.target.value)}
//                   placeholder="Enter email to call"
//                   width="100%"
//                 />
//                 {callAccepted && !callEnded ? (
//                   <Button
//                     leftIcon={<BiPhoneOff />}
//                     onClick={leaveCall}
//                     mt="20"
//                     colorScheme="teal"
//                     variant="info"
//                   >
//                     Hang up
//                   </Button>
//                 ) : (
//                   <>
//                     {/* <Button
//                       leftIcon={<BiPhoneCall />}
//                       onClick={() => callUser(idToCall)}
//                       mt="20"
//                       colorScheme="teal"
//                       variant="solid"
//                     >
//                       Call by ID
//                     </Button> */}
//                     <Button
//                       leftIcon={<BiPhoneCall />}
//                       onClick={handleCallByEmail}
//                       mt="10"
//                       colorScheme="teal"
//                       variant="solid"
//                     >
//                       Call by Email
//                     </Button>
//                     <Button
//                       leftIcon={<BiSolidEnvelope />}
//                       onClick={handleCreateRoom}
//                       mt="10"
//                       colorScheme="teal"
//                       variant="solid"
//                     >
//                       Create Room
//                     </Button>
//                   </>
//                 )}
//               </Grid>
//             </Grid>
//           </FormControl>
//         </Box>
//       </Container>
//     )
//   );
// };

// export default Options;

import { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  BiClipboard,
  BiPhoneCall,
  BiPhoneOff,
  BiSolidEnvelope,
} from "react-icons/bi";
import { SocketContext } from "../Context";

const Options = () => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    auth,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
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

  const handleCreateRoom = () => {};

  return (
    auth && (
      <div
        style={{
          maxWidth: "600px",
          margin: "35px 0",
          padding: "0",
        }}
      >
        <div style={{ padding: "10px", border: "2px solid black" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "12px 0",
            }}
          >
            <label>Email to call</label>
            <input
              type="text"
              value={emailToCall}
              onChange={(e) => setEmailToCall(e.target.value)}
              placeholder="Enter email to call"
              style={{ width: "100%", marginTop: "10px" }}
            />
            <button
              onClick={handleCallByEmail}
              style={{
                marginTop: "10px",
                backgroundColor: "teal",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <BiPhoneCall style={{ marginRight: "8px" }} />
              Call by Email
            </button>
            <button
              onClick={handleCreateRoom}
              style={{
                marginTop: "10px",
                backgroundColor: "teal",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <BiSolidEnvelope style={{ marginRight: "8px" }} />
              Create Room
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Options;
