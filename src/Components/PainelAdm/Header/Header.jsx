/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material'
import { PiUserCircleFill } from 'react-icons/pi'
import LogoutIcon from './Icons/LogoutIcon'
import { AppContext } from "../../../Contexts/AppContext"
import { useContext } from "react"
import { useAuth } from '../../../Contexts/AuthContext'

import styles from './Styles/Header.module.css'
import styled, {css} from 'styled-components'

// Variáveis para criação de um título e um texto que sejam responsivos de acordo com o tamanho da tela
const breakpoints = {
  xs: '(max-width: 600px)',
  sm: '(min-width: 600px) and (max-width: 960px)',
  md: '(min-width: 960px) and (max-width: 1280px)',
  lg: '(min-width: 1280px)'
}

const fontSizeStyles = {
  title: css`
    @media ${breakpoints.xs} {
      font-size: 1.5rem;
    }
    @media ${breakpoints.sm} {
      font-size: 2rem;
    }
    @media ${breakpoints.md} {
      font-size: 2.5rem;
    }
    @media ${breakpoints.lg} {
      font-size: 3rem;
    }
  `,
  text: css`
    @media ${breakpoints.xs} {
    font-size: 0.75rem;
    }
    @media ${breakpoints.sm} {
      font-size: 1rem;
    }
  `
}

// Componente que torna o texto responsivo de acordo com o tamanho da tela
const Title = styled(Typography)`
  ${fontSizeStyles.title}
`

const Text = styled(Typography)`
  ${fontSizeStyles.text}
`

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

function Header() {
  
  const {title} = useContext(AppContext);

  // Recupera o usuário que está logado
  const {user} = useAuth();

  const {logout} = useAuth();

  return (
    <AppBar position='static' className={styles.headerBackground} sx={{background: '#FFFFFF'}}>
      <Toolbar className={styles.headerContentBox}>

        {/* Título do Header */}
        <Title
          variant='h4'
          component='div'
          className={styles.headerTitle}
          sx={{fontFamily: 'var(--font-title)', '@media (max-width: 600px)': {marginLeft: '0px'}}}>
        {title}
        </Title>
            
        {/* Se o usuário existir deve ser exibido o seu nome e sua foto, caso contrário, deve-se exibir uma opção para o login*/}
        {user && user.fullName ? 
          <Box className={styles.headerUserBox} sx={{gap: '1.5vw', '@media (max-width: 600px)': {gap: '0px'}}}>

            {/* Caixa de texto para quando o usuário está logado */}
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

              <Text
                variant='subtitle2'
                component='div'
                sx={{fontFamily: 'var(--font-title)', color: 'var(--color-blue-2)'}}>
              {user.fullName}
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