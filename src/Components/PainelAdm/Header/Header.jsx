/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, useMediaQuery, styled } from '@mui/material'
import { PiUserCircleFill } from 'react-icons/pi'
import LogoutIcon from './Icons/LogoutIcon'
import { AppContext } from "../../../Contexts/AppContext"
import { useContext } from "react"
import { useAuth } from '../../../Contexts/AuthContext'

import styles from './Styles/Header.module.css'

// Componente que torna o texto responsivo de acordo com o tamanho da tela
const Title = styled(Typography)((props) => ({
  [props.theme.breakpoints.up('xs')]: {
    fontSize: '1.5rem'
  },
  [props.theme.breakpoints.up('sm')]: {
    fontSize: '2rem'
  },
  [props.theme.breakpoints.up('md')]: {
    fontSize: '2.5rem'
  },
  [props.theme.breakpoints.up('lg')]: {
    fontSize: '3rem'
  }
}));

const Text = styled(Typography)((props) => ({
  [props.theme.breakpoints.up('xs')]: {
    fontSize: '0.75rem'
  },
  [props.theme.breakpoints.up('sm')]: {
    fontSize: '1rem'
  }
}))

// Função que pega as iniciais do nome do usuário para gerar o avatar com as suas letras
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

function treatName(name) {
  const nameParts = name.split(' ');
  let fullName = nameParts[0];
  for (let i = 1; i < nameParts.length; i++) {
    fullName = fullName.concat( /[a-z]/gm.test(nameParts[i][0]) ? '' : ` ${nameParts[i][0]}.`);
  }
  return fullName;
}

function Header() {

  const isMobile = useMediaQuery('(max-width: 600px)');

  const {title, subtitle} = useContext(AppContext);

  // Recupera o usuário que está logado
  const {user} = useAuth();

  const {logout} = useAuth();

  return (
    <AppBar position='static' className={styles.headerBackground} sx={{background: '#FFFFFF'}}>
      <Toolbar className={styles.headerContentBox}>

        {/* Título e subtítulo do Header */}
        <Box
          display='flex'
          flexDirection='column'
        >
          <Title
            variant='h4'
            component='div'
            className={styles.headerTitle}
            sx={{fontFamily: 'var(--font-title)', '@media (max-width: 600px)': {marginLeft: '0px'}}}>
          {title}
          </Title>
          <Text
            variant='subtitle2'
            sx={{fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)'}}>
          {subtitle}
          </Text>
        </Box>
            
        {/* Se o usuário existir deve ser exibido o seu nome e sua foto, caso contrário, deve-se exibir uma opção para o login*/}
        {user && user.fullName ? 
          <Box className={styles.headerUserBox} sx={{gap: '1.5vw', '@media (max-width: 600px)': {gap: '0px'}}}>

            {/* Caixa de texto para quando o usuário está logado */}
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

              <Text
                className={styles.nameContainer}
                variant='subtitle2'
                component='div'
                sx={{fontFamily: 'var(--font-title)', color: 'var(--color-blue-2)'}}>
              { isMobile ? treatName(user.fullName) : user.fullName }
              </Text>

              <Text
                variant='subtitle2'
                component={Link}
                to = '/conta'//mudar depois
                sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-1)', textDecoration: 'none'}}>
              Editar Perfil
              </Text>
              
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
            <Text
              variant='h5'
              component={Link}
              to = '/login'
              sx={{fontFamily: 'var(--font-text)', color: 'var(--color-blue-3)', textDecoration: 'none'}}>
            Login
            </Text>

            <PiUserCircleFill className={styles.headerUserIcon}/>

          </Box>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header