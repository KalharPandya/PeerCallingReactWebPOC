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
// import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
// import { SocketContext } from "../Context";

// const Options = () => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
//     useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState("");

//   return (
//     <Container maxW="1200px" m="35px 0" p="0">
//       <Box p="10px" border="2px" borderColor="black" borderStyle="solid">
//         <FormControl
//           display="flex"
//           flexDirection="column"
//           noValidate
//           aria-autocomplete="none"
//         >
//           <Grid templateColumns="repeat(2, 1fr)" mt="12">
//             <Grid colSpan={1} p="6">
//               <Heading as="h6"> Account Info </Heading>
//               <FormLabel>Username</FormLabel>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 width="100%"
//               />
//               <CopyToClipboard text={me} mt="20">
//                 <Button
//                   leftIcon={<BiClipboard />}
//                   colorScheme="teal"
//                   variant="solid"
//                 >
//                   Copy ID
//                 </Button>
//               </CopyToClipboard>
//             </Grid>
//             <Grid colSpan={1} p="6">
//               <Heading as="h6"> Make a Call </Heading>
//               <FormLabel> User id to call </FormLabel>
//               <Input
//                 type="text"
//                 value={idToCall}
//                 onChange={(e) => setIdToCall(e.target.value)}
//                 width="100%"
//               />
//               {callAccepted && !callEnded ? (
//                 <Button
//                   leftIcon={<BiPhoneOff />}
//                   onClick={leaveCall}
//                   mt="20"
//                   colorScheme="teal"
//                   variant="info"
//                 >
//                   Hang up
//                 </Button>
//               ) : (
//                 <Button
//                   leftIcon={<BiPhoneCall />}
//                   onClick={() => callUser(idToCall)}
//                   mt="20"
//                   colorScheme="teal"
//                   variant="solid"
//                 >
//                   Call
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//         </FormControl>
//       </Box>
//     </Container>
//   );
// };
// export default Options;

import { useState, useContext } from "react";
import {
  Button,
  Input,
  FormLabel,
  Heading,
  Grid,
  Box,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
import { SocketContext } from "../Context";

const Options = () => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const [emailToCall, setEmailToCall] = useState(""); // New state to store the entered email

  const handleCallByEmail = () => {
    // Implement the functionality to initiate a call by email
    // You can use the entered "emailToCall" to initiate the call
    // For example, you can use a socket event to send the email and initiate the call
    // Here's a hypothetical socket event, modify it according to your server's socket logic
    // socket.emit("callByEmail", { email: emailToCall });
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

  return (
    <Container maxW="1200px" m="35px 0" p="0">
      <Box p="10px" border="2px" borderColor="black" borderStyle="solid">
        <FormControl
          display="flex"
          flexDirection="column"
          noValidate
          aria-autocomplete="none"
        >
          <Grid templateColumns="repeat(2, 1fr)" mt="12">
            <Grid colSpan={1} p="6">
              <Heading as="h6"> Account Info </Heading>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                width="100%"
              />
              <CopyToClipboard text={me} mt="20">
                <Button
                  leftIcon={<BiClipboard />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Copy ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid colSpan={1} p="6">
              <Heading as="h6"> Make a Call </Heading>
              <FormLabel> User id or Email to call </FormLabel>
              <Input
                type="text"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                placeholder="Enter user id or email"
                width="100%"
              />
              {/* New input for email address */}
              <Input
                type="text"
                value={emailToCall}
                onChange={(e) => setEmailToCall(e.target.value)}
                placeholder="Enter email to call"
                width="100%"
              />
              {callAccepted && !callEnded ? (
                <Button
                  leftIcon={<BiPhoneOff />}
                  onClick={leaveCall}
                  mt="20"
                  colorScheme="teal"
                  variant="info"
                >
                  Hang up
                </Button>
              ) : (
                <>
                  {/* Buttons for calling by id or email */}
                  <Button
                    leftIcon={<BiPhoneCall />}
                    onClick={() => callUser(idToCall)}
                    mt="20"
                    colorScheme="teal"
                    variant="solid"
                  >
                    Call by ID
                  </Button>
                  <Button
                    leftIcon={<BiPhoneCall />}
                    onClick={handleCallByEmail}
                    mt="10"
                    colorScheme="teal"
                    variant="solid"
                  >
                    Call by Email
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Options;
