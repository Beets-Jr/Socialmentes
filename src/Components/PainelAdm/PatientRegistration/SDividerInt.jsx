import { Grid } from '@mui/material'
import React from 'react'
import SInputLabel from './SInputLabel'

const SDividerInt = () => {
  return (
    <>
      <Grid item xs={12}>
        <SInputLabel label="Equipe intervenção" />
      </Grid>

      <div style={{
        height: '3px',
        width: '100%',
        backgroundColor: 'var(--color-blue-2)',
        margin: '0 10px 30px 10px',
      }}>

      </div>
    </>
  )
}

export default SDividerInt