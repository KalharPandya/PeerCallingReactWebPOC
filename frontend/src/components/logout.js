// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";
// const LogoutButton = () => {
//   const { logout } = useAuth0();
//   return (
//     <button
//       onClick={() =>
//         logout({ logoutParams: { returnTo: window.location.origin } })
//       }
//     >
//       Log Out
//     </button>
//   );
// };

// export default LogoutButton;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const buttonStyle = {
    backgroundColor: "#4299E1",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <button
      onClick={
        isAuthenticated
          ? () => logout({ returnTo: window.location.origin })
          : loginWithRedirect
      }
      style={buttonStyle}
    >
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
};

export default AuthButton;
