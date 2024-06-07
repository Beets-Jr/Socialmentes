/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material'
import { PiUserCircleFill } from 'react-icons/pi'
import LogoutIcon from './Icons/LogoutIcon'
import { AppContext } from "../../../Contexts/AppContext"
import { useContext } from "react"
import { useAuth } from '../../../Contexts/AuthContext'
import styles from './Styles/Header.module.css'

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

function Header() {
  
  const {title} = useContext(AppContext);

  // Recupera o usuário que está logado
  const {user} = useAuth();

  const {logout} = useAuth();

  return (
    <AppBar position='static' className={styles.headerBackground} sx={{background: '#FFFFFF'}}>
      <Toolbar className={styles.headerContentBox}>

        {/* Título do Header */}
        <Typography
          variant='h4'
          component='div'
          className={styles.headerTitle}
          sx={{fontFamily: 'var(--font-title)', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, '@media (max-width: 600px)': {marginLeft: '0px'}}}>
          {title}
        </Typography>
            
        {/* Se o usuário existir deve ser exibido o seu nome e sua foto, caso contrário, deve-se exibir uma opção para o login*/}
        {user && user.fullName ? 
          <Box className={styles.headerUserBox} sx={{gap: '1.5vw', '@media (max-width: 600px)': {gap: '0px'}}}>

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
                to = '/conta'//mudar depois
                sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-1)', textDecoration: 'none', fontSize: { xs: '0.75rem', sm: '1rem' }}}>
              Editar Perfil
              </Typography>
            </Box>

            {/* Exibe a foto do usuário caso ela exista ou um avatar com as suas iniciais caso não exista */}
            {user.photoUrl ? 
              <Avatar className={styles.headerAvatar} src={user.photoUrl}></Avatar>
              :
              <Avatar className={styles.headerAvatar} {...stringAvatar(user.fullName)}></Avatar>
            }

            {/* Botão de logout */}
            <IconButton onClick={logout} >
              <LogoutIcon/>
            </IconButton>
          </Box>
          :
          <Box className={styles.headerUserBox} sx={{gap: '10px'}}>

            {/* Texto que redireciona para o login se o usuário estiver deslogado */}
            <Typography
              variant='h5'
              component={Link}
              to = '/login'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none', fontSize: { xs: '1rem', sm: '1.25rem' }}}>
            Login
            </Typography>

            <PiUserCircleFill className={styles.headerUserIcon}/>

          </Box>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header