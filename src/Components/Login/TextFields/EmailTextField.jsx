import React, { useState } from "react";
import { TextField } from "@mui/material";
import EmailIcon from "../Icons/EmailIcon";

function EmailTextField() {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

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
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: "15px",
            borderColor: "#727272", // cor da borda
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "#5095D5", // cor da borda ao passar o mouse
          },
          "&.Mui-focused fieldset": {
            borderColor: "#5095d5",
            borderWidth: "3px",
            borderRadius: "15px", // manter a borda arredondada
            pointerEvents: "none", // permitir a interação com o campo
          },
          "& .MuiOutlinedInput-input": {
            color: " #727272",
            fontFamily: "Fira Sans",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
          },
        },
      }}
    />
  );
}

export default EmailTextField;
