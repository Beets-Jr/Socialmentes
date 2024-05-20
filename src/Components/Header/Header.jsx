import { AppBar, Toolbar, Typography } from '@mui/material'
import LogoutIcon from './LogoutIcon'


function Header({title}) {
  return (
    <>
      <AppBar position='static' sx={{background: "#FFFFFF", width: "80vw", marginLeft: "20vw"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography
            variant='h3'
            component='div'
            sx={{fontFamily: "var(--font-text)", color: "var(--color-blue-4)", marginLeft:"50px"}}>
            {title}
          </Typography>
          <LogoutIcon />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header