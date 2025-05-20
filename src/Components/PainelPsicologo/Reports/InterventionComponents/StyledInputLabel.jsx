import { InputLabel } from '@mui/material'
import React from 'react'

const StyledInputLabel = ({ name = '', label }) => {
  return (
    <InputLabel
      htmlFor={name}
      id={name}
      sx={{
        color: 'var(--color-blue-4)',
        fontFamily: 'var(--font-sub)',
        fontWeight: '500',
        fontSize: '16px',
        marginBottom: '5px'
      }}>
      {label}
    </InputLabel>
  )
}

export default StyledInputLabel