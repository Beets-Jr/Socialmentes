import { Link, useLocation } from 'react-router-dom'
import { useContext} from 'react'

// eslint-disable-next-line no-unused-vars
import { AppBar, List, ListItemButton, ListItemIcon, ListItemText, Box, IconButton, Drawer, useMediaQuery } from '@mui/material'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BsPersonFillAdd } from "react-icons/bs"
import { AppContext } from '../../../Contexts/AppContext'
import styles from './Styles/Sidebar.module.css'

// Armazena as opções que serão exibidas ao usuário na sidebar
const sidebarOptions = [
  { icon: <ArticleOutlinedIcon style={{color:'#FFFFFF'}}/>, text:'Pacientes' , to:'/painel-adm/pacientes' },
  { icon: <ManageAccountsOutlinedIcon style={{color:'#FFFFFF'}}/>, text:'Cargos' , to:'/painel-adm/cargos' },
  { icon: <BsPersonFillAdd style={{color:'#FFFFFF'}}/>, text:'Cadastros' , to:'/painel-adm/cadastros' },
  { icon: <SettingsOutlinedIcon style={{color:'#FFFFFF'}}/>, text:'Opções' , to:'/painel-adm/opcoes' }
]

function Sidebar() {

  const {open, setOpen} = useContext(AppContext);
  const location = useLocation()

  // Função para mostrar/ocultar a sidebar
  const toggleSidebar = () => {
    setOpen(!open)
  }

  return (
    <AppBar
      position='sticky'
      className={styles.sbBackground}
      sx={{
        width: open ? '20vw' : '5vw',
        transition: 'width 0.5s ease',
        '@media (max-width: 600px)': {
          boxShadow: open ? '2px 0 5px rgba(0, 0, 0, 0.75)' : '2px 0 5px rgba(0, 0, 0, 0.4)',
          position: open ? 'fixed' : 'sticky',
          width: open ? '70vw' : '15vw'
        }
      }}
    >

      {/* Box com a logo no topo da sidebar */}
      <Box className={styles.sbContainerLogo}>
        {open ?
          <img src='../src/Components/PainelAdm/Sidebar/Icons/LogoSocialMentes1.png' alt="logo" style={{height:'25vh', userSelect: 'none'}}/>
          :
          <IconButton onClick={toggleSidebar} sx={{color: 'var(--color-blue-3)'}}>
            <MenuIcon />
          </IconButton>
        }
      </Box>

      {/* Lista para as opções da sidebar */}
      <List component='nav' className={styles.sbListOpt}>
        {sidebarOptions.map((opt, i) =>
          <ListItemButton
            component={Link}
            to={opt.to}
            className={styles.sbOpt}
            sx={{ // Condição para exibir um destaque quando o usuário estiver naquela página
                  backgroundColor: location.pathname === opt.to ? 'rgba(100%, 100%, 100%, 0.24)' : 'transparent',
                  '&::after': location.pathname === opt.to ? {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '5px',
                    backgroundColor: '#FFFFFF',
                  } : {}
                }}
            key={i}
          >

            {/* Exibe o ícone e o nome da opção do sidebar (se estiver aberta) */}
            <ListItemIcon>
              {opt.icon}
            </ListItemIcon>
            {open && (
              <ListItemText primary={opt.text} sx={{fontFamily:'var(--font-text)', color:'#FFFFFF'}} />
            )}

          </ListItemButton>
        )}
      </List>

      {/* Botão para recolher a sidebar */}
      {open && (
        <Box className={styles.sbToogleBtn}>
          <IconButton onClick={toggleSidebar} sx={{color: '#FFFFFF'}}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

    </AppBar>
  )
}

export default Sidebar