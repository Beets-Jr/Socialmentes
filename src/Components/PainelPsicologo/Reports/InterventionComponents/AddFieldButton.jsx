import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const AddFieldButton = ({ handleClick, vin }) => {
  return (
    <Grid item xs={0.6} lg={0.6} md={0.6}>
      <Button
        onClick={handleClick}
        variant='contained'
        sx={{
          backgroundColor: 'var(--color-blue-3)',
          color: 'white',
          width: '100%',
          borderRadius: '20px',
          paddingTop: '5px 0',
          height: '66px',
          marginTop: vin ? '27px' : '0px'
        }}>
        <AddIcon />
      </Button>
    </Grid >
  )
}

export default AddFieldButton