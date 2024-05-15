import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordTextField() {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur(e) {
    if (e.target.value === "") {
      setFilled(false);
    }
    setFocused(false);
  }

  function handleChange(e) {
    if (e.target.value !== "") {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  return (
    <FormControl  
      sx={{ m: 1}} 
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
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
        }
        label="Password"
      />
    </FormControl>
  );
}

export default PasswordTextField;
