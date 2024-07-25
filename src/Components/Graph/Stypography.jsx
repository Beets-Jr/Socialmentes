import { Box, Typography } from '@mui/material'
import React from 'react'

const Stypography = ({ label, data }) => {
  return (
    <Box style={{
      display: 'flex',
    }}>
      <Typography
        sx={
          {
            color: 'var(--color-blue-3)',
            fontWeight: '500',
            fontSize: '16px',
            fontFamily: 'var(--font-sub)',
          }
        }
      >{label}</Typography>
      <span style={{
        marginLeft: '5px',
        color: 'var(--color-blue-3)',
        fontFamily: 'var(--font-sub)',
      }}
      >
        {data}
      </span>
    </Box>
  )
}

export default Stypography