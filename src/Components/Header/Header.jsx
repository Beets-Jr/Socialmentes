import { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'

import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import LogoutIcon from './Icons/LogoutIcon'
import { PiUserCircleFill } from "react-icons/pi";

function Header({title}) {

  return (
    <AppBar position='static' sx={{background: '#FFFFFF', width: '80vw', marginLeft: '20vw'}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>

        <Typography
          variant='h4'
          component='div'
          sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-4)', marginLeft:'50px'}}>
          {title}
        </Typography>
            
        {userData ? 
          <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
            <Box>
              {userData.fullName}
              <Typography
              variant='h6'
              component={Link}
              to = '/conta'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none'}}>
              Editar Perfil
              </Typography>
            </Box>
            <img src={userData.photoUrl} alt='Foto do usuário'/>
            {/* <LogoutIcon/> */}
          </Box>
          :
          <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center', gap:'10px'}}>
            <Typography
              variant='h6'
              component={Link}
              to = '/login'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none'}}>
            Login
            </Typography>
            <PiUserCircleFill style={{color:'var(--color-blue-3)', width:'40px', height:'40px'}}/>
          </Box>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header