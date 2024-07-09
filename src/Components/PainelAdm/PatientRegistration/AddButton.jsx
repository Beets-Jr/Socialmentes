import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const AddButton = ({ handleClick }) => {
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
          marginTop: '27px',
          height: '66px',
        }}>
        <AddIcon />
      </Button>
    </Grid >
  )
}

export default AddButton