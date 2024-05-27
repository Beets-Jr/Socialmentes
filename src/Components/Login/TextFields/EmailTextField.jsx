import React, { useState } from "react";
import { TextField } from "@mui/material";
import EmailIcon from "../Images/EmailIcon";
import EmailIconFocused from "../Images/EmailIconFocused";

import "../../../Styles/variables.css"

function EmailTextField({ email, setEmail }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={
        <span style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-text)", fontWeight: "500"}}>
          {isFocused ? <EmailIconFocused /> : <EmailIcon />}
         <div style={{ marginLeft: "8px"}} >E-mail</div> 
        </span>
      }
      value={email}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default EmailTextField;
