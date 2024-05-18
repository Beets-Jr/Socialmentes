import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "../Icons/LockIcon";

function PasswordTextField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      type={showPassword ? "text" : "password"}
      label={
        <span style={{ display: "flex", alignItems: "center" }}>
          <LockIcon />
          Senha
        </span>
      }
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
      sx={{
        width: "100%", 
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: "15px",
            borderColor: "#727272", // cor da borda
            borderWidth: "2px"
          },
          "&:hover fieldset": {
            borderColor: "#5095D5", // cor da borda ao passar o mouse
          },
          '&.Mui-focused fieldset' : {
            borderColor: '#5095d5', 
            borderWidth: '3px',
            borderRadius: '15px', // manter a borda arredondada
            pointerEvents: 'none', // permitir a interação com o campo
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

export default PasswordTextField;
