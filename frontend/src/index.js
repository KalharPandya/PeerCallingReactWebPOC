// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";
// import { ContextProvider } from "./Context";
// import { createRoot } from "react-dom/client";
// import { Auth0Provider } from "@auth0/auth0-react";
// // import LoginButton from "./components/login";
// import LogoutButton from "./components/logout";
// import Profile from "./components/profile";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <ChakraProvider>
//         <Auth0Provider
//           domain="p2ptst.us.auth0.com"
//           clientId="o2h7MVVifQArEw5qFyG6o7fDxM6cL5xX"
//           authorizationParams={{
//             redirect_uri: window.location.origin,
//           }}
//         >
//           {/* <LoginButton /> */}
//           <LogoutButton />
//           <Profile />
//         </Auth0Provider>
//         <App />,
//       </ChakraProvider>
//     </ContextProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./Context";
import { createRoot } from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import Profile from "./components/profile";

const root = createRoot(document.getElementById("root"));

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const authButtonStyle = {
  backgroundColor: "#4299E1",
  color: "white",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  marginRight: "10px",
};

const ModernApp = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Auth0Provider
          domain="p2ptst.us.auth0.com"
          clientId="o2h7MVVifQArEw5qFyG6o7fDxM6cL5xX"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <div style={containerStyle}>
            <div style={{ marginBottom: "20px" }}>
              <LogoutButton style={authButtonStyle} />
              <Profile />
            </div>
            <App />
          </div>
        </Auth0Provider>
      </ContextProvider>
    </React.StrictMode>
  );
};

root.render(<ModernApp />);

// root.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <ChakraProvider>

//         <App />
//       </ChakraProvider>
//     </ContextProvider>
//   </React.StrictMode>
// );
