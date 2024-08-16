import { Typography } from '@mui/material'
import React from 'react'

const StyledTitle = ({ text }) => {
  return (
    <Typography variant="h4" sx={{
      fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)', marginTop: '2rem', marginBottom: {
        xs: '0.5rem',
        md: '1rem'
      },
      fontSize: { xs: '1.5rem', sm: '1.8rem', xl: '2.5rem' }
    }}>
      {text}
    </Typography>
  )
}

export default StyledTitle