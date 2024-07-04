import React from 'react';
import { Select, MenuItem, Grid, Typography, OutlinedInput } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SInputLabel from './SInputLabel';

const expandAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg); // Completa a rotação
  }
`;

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: '20px',
      border: '3px solid #E0E0E0',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
};

const StyledSelect = styled(Select)({
  width: '100%',
  borderRadius: '20px',
  padding: '5px 0',
  fontFamily: 'var(--font-sub)',
  fontSize: '16px',

  '& .MuiSelect-icon': {
    transition: 'transform 0.5s ease',
  },

  '&.MuiSelect-iconOpen .MuiSelect-icon': {
    animation: `${expandAnimation} 0.7s linear`,
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E0E0', // Remoção do efeito do hover
  },
});

const StyledMenuItem = styled(MenuItem)({
  borderRadius: '5px',
  margin: '0 20px',
  height: '25px',
  color: 'var(--color-gray-5)',
  fontFamily: 'var(--font-sub)',
  fontWeight: '400',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: 'var(--color-blue-2)',
  },
  '&.Mui-selected': {
    background: 'white',
  },
});

const SSelectBox = ({ xs, name, label, error = null, handleChange, value, options, useCustomOptions = false, ...props }) => {
  const validValues = useCustomOptions ? options.map(option => option[1]) : options;
  const isValidValue = validValues.includes(value);

  return (
    <Grid item xs={xs}>
      <SInputLabel label={label} name={name} />

      <StyledSelect
        id={name}
        name={name}
        MenuProps={MenuProps}
        labelId={name}
        value={isValidValue ? value : ''}
        onChange={handleChange}
        {...props}
        IconComponent={KeyboardArrowDownOutlinedIcon}
        input={
          <OutlinedInput
            notched
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E0E0E0',
                borderWidth: '2px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-blue-3)',
              },
              svg: {
                fontSize: '2rem',
                color: 'var(--color-gray-5)',
              }
            }}
          />
        }
        fullWidth
        error={error ? true : false}
      >
        <StyledMenuItem value="" disabled>---</StyledMenuItem>
        {options.map((option) => (
          <StyledMenuItem
            key={useCustomOptions ? option[1] : option}
            value={useCustomOptions ? option[1] : option}>
            {useCustomOptions ? option[0] : option}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {error && <Typography sx={{ color: 'red', fontSize: '12px' }}>{error}</Typography>}
    </Grid>
  );
};

export default SSelectBox;
