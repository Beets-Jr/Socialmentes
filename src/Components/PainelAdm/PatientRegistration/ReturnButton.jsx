import { Button } from '@mui/material'
import React from 'react'

const SButton = () => {
  return (
    <Button
      sx={{
        borderRadius: '10px',
        fontSize: '15px',
        fontFamily: 'var(--font-sub)',
        height: '45px',
        width: '15%',
        border: '2px solid #5095D5',
      }}
      variant="outlined" color="primary" type="button">Voltar</Button>
  )
}

export default SButton