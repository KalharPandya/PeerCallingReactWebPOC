import { useAuth0 } from "@auth0/auth0-react";
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
      <div style={styles.container}>
        <img src={user.picture} alt={user.name} style={styles.profileImage} />
      </div>
    )
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
};
export default Profile;
