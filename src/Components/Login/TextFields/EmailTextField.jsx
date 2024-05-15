import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from '@mui/material/OutlinedInput';
import MailIcon from "@mui/icons-material/Mail";

function EmailTextField() {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

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
      <InputLabel>E-mail</InputLabel>
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <MailIcon />
          </InputAdornment>
        }
        label="E-mail"
      />
    </FormControl>
  );
}

export default EmailTextField;
