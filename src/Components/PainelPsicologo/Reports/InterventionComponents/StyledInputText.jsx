import React from 'react'
import { TextField, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import StyledInputLabel from './StyledInputLabel';


const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-blue-3)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-blue-3)',
    },

  },
});


const StyledInputText = ({ xs = 12, md = 6, lg, name, label, error = null, handleChange, value, ...props }) => {
  return (
    <Grid item xs={xs} lg={lg} md={md}>
      {label && <StyledInputLabel label={label} name={name} />}
      <StyledTextField
        id={name}
        maxRows={4}
        multiline
        InputProps={{
          style: {
            fontFamily: 'var(--font-sub)',
            fontSize: '16px',
            borderRadius: '20px',
            paddingLeft: '15px',
            marginBottom: '10px',
            minHeight: '4rem',
          },
        }}

        name={name}
        value={value}
        onChange={handleChange}
        error={error ? true : false}
        {...props}
        fullWidth />
      {error && <Typography sx={{ color: 'red', fontSize: '12px' }}>{error}</Typography>}
    </Grid>
  )
}





export default StyledInputText