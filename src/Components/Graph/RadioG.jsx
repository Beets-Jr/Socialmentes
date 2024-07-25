import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function RadioG({ value, onChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"
        sx={{
          color: 'var(--color-gray-4)',
          fontSize: '15px',
          fontFamily: 'var(--font-sub)',

        }}
      >Parcialmente adquiridos:</FormLabel>
      <RadioGroup
        aria-label="parcialmente-adquiridos"
        name="parcialmente-adquiridos"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="nao-mostrar" control={<Radio />} label="Não mostrar"
          sx={{
            color: 'var(--color-gray-4)',
            fontSize: '15px',
            fontFamily: 'var(--font-sub)',
          }}
        />
        <FormControlLabel value="mostrar" control={<Radio />} label="Mostrar"
          sx={{
            color: 'var(--color-gray-4)',
            fontSize: '15px',
            fontFamily: 'var(--font-sub)',
          }} />
        <FormControlLabel value="somar" control={<Radio />} label="Somar"
          sx={{
            color: 'var(--color-gray-4)',
            fontSize: '15px',
            fontFamily: 'var(--font-sub)',
          }} />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioG;
