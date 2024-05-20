import React from "react";
import { TextField } from "@mui/material";
import EmailIcon from "../Images/EmailIcon"

function EmailTextField({ email, setEmail }) {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={
        <span style={{ display: "flex", alignItems: "center" }}>
          <EmailIcon />
          E-mail
        </span>
      }
      value={email}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default EmailTextField;
