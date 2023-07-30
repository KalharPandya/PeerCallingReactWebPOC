import React from "react";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

import LogoutButton from "./components/authentication";
import Profile from "./components/profile";
import { Auth0Provider } from "@auth0/auth0-react";
import { ContextProvider } from "./Context";

function App() {
  return (
    <div style={styles.appContainer}>
      <div style={styles.appSubContainer}>
        <h2 style={styles.mainHeading}>P2P Video Call</h2>
        <ContextProvider>
          <Auth0Provider
            domain="p2ptst.us.auth0.com"
            clientId="o2h7MVVifQArEw5qFyG6o7fDxM6cL5xX"
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <LogoutButton />
            <Profile />
            <VideoPlayer />
            <Options />
            <Notifications />
          </Auth0Provider>
        </ContextProvider>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #78ffd6, #a8f0c6)",
    fontFamily: "Arial, sans-serif",
  },
  appSubContainer: {
    maxWidth: "1200px",
    padding: "20px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  mainHeading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1de2a7",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  },
};

export default App;
