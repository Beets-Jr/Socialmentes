import { InputLabel } from '@mui/material'
import React from 'react'

const SInputLabel = ({ name = '', label }) => {
  return (
    <InputLabel
      htmlFor={name}
      id={name}
      sx={{
        color: 'var(--color-blue-3)',
        fontFamily: 'var(--font-sub)',
        fontSize: '16px',
        marginBottom: '5px'
      }}>
      {label}
    </InputLabel>
  )
}

export default SInputLabel