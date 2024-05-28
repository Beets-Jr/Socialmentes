import { Link } from 'react-router-dom'
import { auth } from '../../Database/FirebaseConfig.mjs'

import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material'
import { PiUserCircleFill } from 'react-icons/pi'
import LogoutIcon from './Icons/LogoutIcon'

function stringAvatar(name){

  const nameParts = name.split(' ');
  const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : `${nameParts[0][0]}`;

  return {
    sx:{
      bgcolor: '#FFFFFF',
    },
    children: initials,
  };

}

function Header({title}) {

  // Recupera o usuário que está logado
  // const user = auth.currentUser

  // Usuário para teste e estilização
  // const user = {
  //   fullName:'João da Silva',
  //   photo: 'src/Components/Header/Icons/fotoTeste.png'
  // }

  // Usuário sem foto para teste
  const user = {
    fullName: 'José Antônio',
    photo: null
  }

  const logout = () => {
    auth.signOut()
  }

  return (
    <AppBar position='static' sx={{background: '#FFFFFF', width: '100%', borderRadius: '0 0 15px 15px', height: '15vh', display: 'flex', justifyContent: 'center'}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>

        {/* Título do Header */}
        <Typography
          variant='h4'
          component='div'
          sx={{fontFamily: 'var(--font-title)', color: 'var(--color-blue-4)', marginLeft: '50px', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, '@media (max-width: 600px)': {marginLeft: '0px'}}}>
          {title}
        </Typography>
            
        {/* Se o usuário existir deve ser exibido o seu nome e sua foto, caso contrário, deve-se exibir uma opção para o login*/}
        {user ? 
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5vw', '@media (max-width: 600px)': {gap: '0px'}}}>

            {/* Caixa de texto para quando o usuário está logado */}
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>         
              <Typography
                variant='subtitle2'
                component='div'
                sx={{fontFamily: 'var(--font-title)', color: 'var(--color-blue-2)', fontSize: { xs: '0.75rem', sm: '1rem' }}}>
              {user.fullName}
              </Typography>

              <Typography
                variant='subtitle2'
                component={Link}
                to = '/conta'
                sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-1)', textDecoration: 'none', fontSize: { xs: '0.75rem', sm: '1rem' }}}>
              Editar Perfil
              </Typography>
            </Box>

            {/* Exibe a foto do usuário caso ela exista ou um avatar com as suas iniciais caso não exista */}
            {user.photo ? 
              <Avatar src={user.photo} sx={{width: '50px', height: '50px', border: '2.5px solid var(--color-blue-1)'}}></Avatar>
              :
              <Avatar {...stringAvatar(user.fullName)} sx={{width: '50px', height: '50px', border: '2.5px solid var(--color-blue-1)'}}></Avatar>
            }

            {/* Botão de logout */}
            <IconButton onClick={logout} >
              <LogoutIcon/>
            </IconButton>
          </Box>
          :
          <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center', gap:'10px'}}>

            {/* Texto que redireciona para o login se o usuário estiver deslogado */}
            <Typography
              variant='h5'
              component={Link}
              to = '/login'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none', fontSize: { xs: '1rem', sm: '1.25rem' }}}>
            Login
            </Typography>

            <PiUserCircleFill style={{color:'var(--color-blue-3)', width:'50px', height:'50px'}}/>

          </Box>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header