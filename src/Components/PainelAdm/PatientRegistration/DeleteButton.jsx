import { Button, Grid } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const DeleteButton = ({ onClick }) => {
  return (
    <Grid item xs={0.6} lg={0.6} md={0.6}>
      <Button
        onClick={onClick}
        variant='contained'
        sx={{
          backgroundColor: 'red',
          color: 'white',
          width: '100%',
          borderRadius: '20px',
          paddingTop: '5px 0',
          marginTop: '27px',
          height: '66px',
        }}>
        <RemoveCircleOutlineIcon />
      </Button>
    </Grid >
  )
}

export default DeleteButton