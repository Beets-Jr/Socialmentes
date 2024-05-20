import { AppBar, Toolbar, Typography } from '@mui/material'


function Header({title}) {
  return (
    <>
      <AppBar position='static' >
        <Toolbar>
          <Typography variant='h2' component='div' >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header