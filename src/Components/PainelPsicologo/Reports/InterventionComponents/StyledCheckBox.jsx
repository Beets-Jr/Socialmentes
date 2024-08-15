import React from 'react'
import { Checkbox, FormControlLabel, Box, Typography } from '@mui/material';



const DailyOption = ({ label, name }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          sx={{
            color: 'var(--color-gray-4)',
            '&.Mui-checked': {
              color: 'var(--color-blue-3)',
            },
            '& .MuiSvgIcon-root': { fontSize: 19 }
          }}
        />

      }
      label={
        <Typography sx={{
          color: 'var(--color-gray-4)',
          fontFamily: 'var(--font-sub)',
          fontWeight: '500',
          fontSize: '15px',
          marginTop: '2px',
          marginLeft: '-5px'
        }}>
          {label}
        </Typography>
      }
    />


  )
}

const StyledCheckBox = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          justifyContent: 'space-around',
          padding: '10px',
          marginBottom: '10px'
        }} >

        <Box sx={{ display: 'flex', gap: 2 }}>
          <DailyOption label="Segunda-feira" name="monday" />
          <DailyOption label="Terça-feira" name="tuesday" />
          <DailyOption label="Quarta-feira" name="wednesday" />
          <DailyOption label="Quinta-feira" name="thursday" />
          <DailyOption label="Sexta-feira" name="friday" />

        </Box>
      </Box >
    </>
  )
}

export default StyledCheckBox