import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";
// import { React, useContext } from "react";
// import { SocketContext } from "../Context";
// const Profile = () => {
//   const { user, isAuthenticated, isLoading, error } = useAuth0();
//   const { auth, setAuth, authorizeUser } = useContext(SocketContext);
//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   if (error) {
//     return error.message;
//   }
//   if (isAuthenticated && auth === false) {
//     console.log("send auth");
//     setAuth(true);
//     authorizeUser(user.email);
//     // setMail(true);
//     // } else if (!isAuthenticated && auth === true) {
//     //   setAuth(false);
//     //   authorizeUser(""); // could lead to leak as per my understanding after logout
//   }
//   return (
//     isAuthenticated && (
//       <div>
//         <h1>isAuthenticated</h1>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// };

// export default Profile;

import { React, useContext, useEffect } from "react";
import { SocketContext } from "../Context";

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const { auth, setAuth, authorizeUser } = useContext(SocketContext);

  useEffect(() => {
    if (isAuthenticated && auth === false) {
      console.log("send auth");
      setAuth(true);
      authorizeUser(user.email);
    }
  }, [isAuthenticated, auth, setAuth, authorizeUser]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return error.message;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
