import { Button } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';


const SaveButton = ({ handleSubmit }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        background: 'linear-gradient(to right, #7DB9F0, #5095D5)',
        color: 'white',
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
      variant="outlined" color="primary" onClick={handleSubmit}
    >Salvar</Button>
  )
}

export default SaveButton