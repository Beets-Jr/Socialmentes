import { Grid } from '@mui/material'
import React from 'react'
import SInputLabel from './SInputLabel'

const SDivider = () => {
  return (
    <>
      <Grid item xs={3}>
        <SInputLabel label="Acompanhamento externo" />
      </Grid>

      <Grid item xs={3.5}>
        <SInputLabel label="Nome" />
      </Grid>
      <Grid item xs={1.9}>
        <SInputLabel label="Telefone" />
      </Grid>
      <Grid item xs={3}>
        <SInputLabel label="E-mail" />
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

export default SDivider