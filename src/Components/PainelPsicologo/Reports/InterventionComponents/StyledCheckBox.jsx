import React from 'react';
import { Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

const daysOfWeek = [
  { label: 'Segunda-feira', value: 0 },
  { label: 'Terça-feira', value: 1 },
  { label: 'Quarta-feira', value: 2 },
  { label: 'Quinta-feira', value: 3 },
  { label: 'Sexta-feira', value: 4 },
];

const DailyOption = ({ label, name, checked, handleDayChange, error }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={handleDayChange}
          sx={{
            color: 'var(--color-gray-4)',
            '&.Mui-checked': {
              color: 'var(--color-blue-3)',
            },

          }}
        />
      }
      label={
        <Typography
          sx={{
            color: error ? 'red' : 'var(--color-gray-4)',
            fontFamily: 'var(--font-sub)',
            fontWeight: '500',
            marginLeft: '-5px',

          }}
        >
          {label}
        </Typography>
      }
    />
  );
};

const StyledCheckBox = ({ item, index, handleDayChange, error = null }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-around',
        padding: '10px',
        marginBottom: {
          xs: '0',
          md: '10px',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {daysOfWeek.map((day) => (
          <DailyOption
            key={day.value}
            label={day.label}
            name={`cronogram[${index}].dayWeek[${day.value}]`}
            checked={item.dayWeek.includes(day.value)}
            handleDayChange={() => handleDayChange(index, day.value)}
            error={error}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StyledCheckBox;
