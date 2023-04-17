// Mui
import { Box } from "@mui/material";

// Project Imports
import Logo from "../../Assets/Images/AmmanLogo.png";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

const Auth = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <div>
      <Box position="absolute" right="3rem" top="3rem">
        <img
          src={Logo}
          style={{
            width: "5rem",
          }}
          alt="Logo"
        />
      </Box>
      {newUser ? (
        <Register setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
    </div>
  );
};

export default Auth;
