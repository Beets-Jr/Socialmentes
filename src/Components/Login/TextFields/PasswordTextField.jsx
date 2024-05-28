import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "../Images/Icons/LockIcon"
import LockIconFocused from "../Images/Icons/LockIconFocused";

import "../../../Styles/variables.css"

function PasswordTextField({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
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
      type={showPassword ? "text" : "password"}
      label={
        <span style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-text)", fontWeight: "500"}}>
          {isFocused ? <LockIconFocused /> : <LockIcon />}
          <div style={{ marginLeft: "8px"}} >Senha</div> 
        </span>
      }
      value={password}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default PasswordTextField;