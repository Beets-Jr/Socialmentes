import { Link } from 'react-router-dom'
import { auth } from '../../Database/FirebaseConfig.mjs'

import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { PiUserCircleFill } from 'react-icons/pi'
import LogoutIcon from './Icons/LogoutIcon'

function Header({title}) {

  const user = auth.currentUser

  return (
    <AppBar position='static' sx={{background: '#FFFFFF', width: '80vw', marginLeft: '20vw'}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>

        <Typography
          variant='h4'
          component='div'
          sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-4)', marginLeft: '50px'}}>
          {title}
        </Typography>
            
        {user ? 
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              {user.fullName}
              <Typography
              variant='h6'
              component={Link}
              to = '/conta'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none'}}>
              Editar Perfil
              </Typography>
            </Box>
            {user.photo ? 
              <img src={user.photo} alt='Foto do usuário'/> :
              <div>
                {/* Lógica do avatar */}
              </div>
            }
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