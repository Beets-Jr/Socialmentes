import { Button } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';


const ReturnButton = () => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        borderRadius: '10px',
        fontSize: '15px',
        fontFamily: 'var(--font-sub)',
        height: '45px',
        width: '15%',
        border: '2px solid #5095D5',
        [theme.breakpoints.down('lg')]: {
          width: '25%',
        },
        [theme.breakpoints.down('md')]: {
          width: '35%',
        },
      }}
      variant="outlined" color="primary" type="button">Voltar</Button>
  )
}

export default ReturnButton