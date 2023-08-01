import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SocketContext } from "../Context";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { setName } = useContext(SocketContext);
  
  return (
    <button
      onClick={
        isAuthenticated
          ? () => logout({ returnTo: window.location.origin })
          : loginWithRedirect
      }
      style={authButtonStyle}
    >
      {isAuthenticated ? "Log Out" : "Log In"}
      {isAuthenticated ? setName(user.name) : setName("UnkownUser")}
    </button>
  );
};

const authButtonStyle = {
  backgroundColor: "#c200ff",
  color: "white",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "10px",
  cursor: "pointer",
  marginRight: "10px",
};
export default AuthButton;
