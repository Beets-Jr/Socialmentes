import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'

// eslint-disable-next-line no-unused-vars
import { AppBar, List, ListItemButton, ListItemIcon, ListItemText, Box, IconButton } from '@mui/material'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import { BsPersonFillAdd } from "react-icons/bs"
import { MdOutlineManageAccounts } from "react-icons/md";
import { AppContext } from '../../../Contexts/AppContext'
import { useAuth } from '../../../Contexts/AuthContext'
import { HomeIcon } from '../../../Assets/Icons/HomeIcon'
import { GraphIcon } from '../../../Assets/Icons/GraphIcon'
import { ScheduleIcon } from '../../../Assets/Icons/ScheduleIcon'

import styles from './Styles/Sidebar.module.css'

// Seta as opções da sidebar para cada cargo possível
const sidebarAllOptions = {
  sidebarOptionsAdm: [
    { icon: <ArticleOutlinedIcon style={{ color: '#FFFFFF' }} />, text: 'Pacientes', to: '/painel-adm/pacientes' },
    { icon: <MdOutlineManageAccounts fontSize={22} style={{ marginLeft: 2, color: '#FFFFFF' }} />, text: 'Cargos', to: '/painel-adm/cargos' },
    { icon: <BsPersonFillAdd fontSize={22} style={{ color: '#FFFFFF' }} />, text: 'Cadastros', to: '/painel-adm/cadastros' },
    { icon: <SettingsOutlinedIcon style={{ color: '#FFFFFF' }} />, text: 'Opções', to: '/painel-adm/opcoes' }
  ],
  sidebarOptionsPsy: [
    { icon: <HomeIcon />, text: 'Home', to: '/painel-psi/home' },
    { icon: <EditNoteRoundedIcon style={{ color: '#FFFFFF' }} />, text: 'Pacientes', to: '/painel-psi/pacientes' },
    { icon: <GraphIcon />, text: 'Relatórios', to: '/painel-psi/relatorios' },
    { icon: <ScheduleIcon />, text: 'Agenda', to: '/painel-psi/agenda' },
    { icon: <SettingsOutlinedIcon style={{ marginLeft: -2, color: '#FFFFFF' }} />, text: 'Instrumentos', to: '/painel-psi/instrumentos' }
  ]
};

function Sidebar() {

  const { open, setOpen } = useContext(AppContext);
  const { user } = useAuth();
  const location = useLocation();

  // Função para mostrar/ocultar a sidebar
  const toggleSidebar = () => {
    setOpen(!open)
  }

  // define quais opções serão exibidas na sidebar com base no cargo
  const sidebarOptions = user?.position === 'Administrador' ?
    sidebarAllOptions.sidebarOptionsAdm : user.position === 'Psicólogo' ?
      sidebarAllOptions.sidebarOptionsPsy : null;

  return (
    <AppBar
      position='sticky'
      className={styles.sbBackground}
      sx={{
        width: open ? '20vw' : '5vw',
        minWidth: open ? '160px' : '50px',
        transition: 'width 0.5s ease',
        '@media (max-width: 600px)': {
          boxShadow: open ? '2px 0 5px rgba(0, 0, 0, 0.75)' : '2px 0 5px rgba(0, 0, 0, 0.4)',
          width: open ? '70vw' : '15vw'
        }
      }}
    >

      {/* Box com a logo no topo da sidebar */}
      <Box className={styles.sbContainerLogo}>
        {open ?
          <img src='../src/Components/PainelAdm/Sidebar/Icons/LogoSocialMentes1.png' alt="logo" style={{ height: '25vh', userSelect: 'none' }} />
          :
          <IconButton onClick={toggleSidebar} sx={{ color: 'var(--color-blue-3)' }}>
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
              <ListItemText primary={opt.text} sx={{ fontFamily: 'var(--font-text)', color: '#FFFFFF' }} />
            )}

          </ListItemButton>
        )}
      </List>

      {/* Botão para recolher a sidebar */}
      {open && (
        <Box className={styles.sbToogleBtn}>
          <IconButton onClick={toggleSidebar} sx={{ color: '#FFFFFF' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

    </AppBar>
  )
}

export default Sidebar