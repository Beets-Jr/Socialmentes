import React from "react";
import Button from "@mui/joy/Button";

import Google from "../Images/google.png"
import Facebook from "../Images/facebook.png"

const SocialLoginButton = ({ onClick, provider }) => {
  return (
    <Button
      sx={{
        mt: 1,
        backgroundColor: provider === "Google" ? "#DB4437" : "#4267B2",
        "&:hover": {
          backgroundColor: provider === "Google" ? "#d63031" : "#385898",
        },
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {provider === "Google" ? (
        <img src= {Google} />
      ) : (
        <img src={Facebook} />
      )}
    </Button>
  );
};

export default SocialLoginButton;
