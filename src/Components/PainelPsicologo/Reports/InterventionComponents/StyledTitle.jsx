import { Typography } from '@mui/material'
import React from 'react'

const StyledTitle = ({ text }) => {
  return (
    <Typography variant="h4" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)', marginY: '1rem' }}>
      {text}
    </Typography>
  )
}

export default StyledTitle