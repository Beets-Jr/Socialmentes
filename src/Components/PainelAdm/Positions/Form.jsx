import { Box, Stack, Typography, Dialog, Button, Avatar, Divider, IconButton, ButtonBase, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkIcon from "@mui/icons-material/Work";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


import { useState } from 'react';

import { db } from "../../../Database/FirebaseConfig.mjs"
import { doc, updateDoc } from 'firebase/firestore';

import DialogConfirmation from "../../ElementsInterface/DialogConfirmation";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
      sx: {
          bgcolor: stringToColor(name),
          margin: 'auto', border: '2px solid var(--color-gray-3)', 
          width:'150px', height: '150px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ').length > 1 ? name.split(' ')[1][0] : name.split(' ')[0][1]}`,
  };
}

const positionIcons = {
  "Paciente": <PersonOutlineIcon sx={{ mr: 1, mb:0.2, color: "var(--color-gray-3)", fontSize: 18, }}></PersonOutlineIcon>,
  "Responsável": <GroupIcon sx={{ mr: 1, mb:0.2, color: "var(--color-gray-3)", fontSize: 18, }}></GroupIcon>,
  "Administrador": <AdminPanelSettingsIcon sx={{ mr: 1, mb:0.2, color: "var(--color-gray-3)", fontSize: 20, }}></AdminPanelSettingsIcon>,
  "Psicólogo": <WorkIcon sx={{ mr: 1, mb:0.2, color: "var(--color-gray-3)", fontSize: 18, }}></WorkIcon>
}

function getPositionIcon(position) {
  return positionIcons[position];
}

// eslint-disable-next-line react/prop-types
function Form({ open, handleClose, photo, name, initialPosition, userID, setConfirmedChange}) {
  const [currentPosition, setCurrentPosition] = useState(initialPosition); // armazena o cargo atual 
  const availablePositions = ['Paciente', 'Responsável', 'Administrador', 'Psicólogo']; // lista de cargos possíveis 
  const [positionChanged, setPositionChanged] = useState(false); // indica se o cargo mudou 
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // controla a visibilidade do diálogo de confirmação de saída
  

  const handlePositionChange = (newPosition) => {
    if(currentPosition !== newPosition) {
      setCurrentPosition(newPosition);
      setPositionChanged(newPosition !== initialPosition); 
    }
  }

  const handleConfirmChange = async () => {
    const getUserDocRef = doc(db, 'userProfiles', userID);
    try {
      await updateDoc(getUserDocRef,{ position: currentPosition });
      console.log('Position updated successfully!');
      setPositionChanged(false); // Reset após mudança feita com sucesso 
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  const handleClickClose = () => {
    if (positionChanged) {
      setConfirmDialogOpen(true);
    } else {
      setConfirmedChange(true); // set a confimação de update
      handleClose(); // Esperar a conclusão da função assíncrona
    }

  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  }

  const handleDiscardChanges = () => {
    setConfirmDialogOpen(false);
    setPositionChanged(false);
    setConfirmedChange(true); // set a confimação de update
    handleClose();
  };
  

  return (
    <>
    <Dialog open={open} sx={{'& .MuiPaper-root': { borderRadius: '30px', width:'1041px', height:'606px', maxWidth:'1041px'}, }} >
      <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', m:'1vw'}}>
        <Typography sx={{color:'var(--color-gray-5)', fontFamily:'var(--font-text)', fontSize: { xs: '0.5rem', sm: '0.8rem', md: '1.0rem' },}}>Fechar</Typography>
        <IconButton onClick={handleClickClose} sx={{ color:'var(--color-blue-3)', '&:hover': { boxShadow: 'none', backgroundColor: 'transparent', }, }} >
          <CancelIcon sx={{fontSize: { xs: '1rem', sm: '1.5rem' }, }} />
        </IconButton>
      </Box>
      
      { photo ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
          <Avatar // recebe a foto de perfil 
            alt={`${name}'s profile picture`} src={photo}
            sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', width:'150px', height: '150px'}}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
          <Avatar {...stringAvatar(name)} /> 
        </Box>
      )}

      <Typography sx={{ color: "var(--color-gray-5)", fontFamily: "var(--font-text)", textAlign: "center", fontWeight: '500', mt: '1vh', fontSize:'32px' }} >
        {name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }} >
        {getPositionIcon(currentPosition)}
        <Typography sx={{ fontFamily: "var(--font-text)", fontWeight: "400", color: "var(--color-gray-5)", textAlign: "center", fontSize: '20px', }} >
          {currentPosition}
        </Typography>
      </Box>

      <Divider variant="middle"
        sx={{
          height: '2px', width: '40%', margin: '0 auto 10px auto', border: 'none',
          background: 'linear-gradient(90deg, var(--color-blue-1) 0%, var(--color-blue-2) 50.5%, var(--color-blue-1) 100.01%)',
        }}
      />

      <Typography sx={{ color: "var(--color-gray-5)", fontFamily: "var(--font-text)", textAlign: "center", fontWeight:'500', fontSize:'18px'}} >
        CARGOS
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb:'20px', mt:'20px', }}>
        <Stack direction="row" spacing={2}  sx={{ display:'flex', justifyContent:'center', margin:'5px 110px'}} >
          <Grid container spacing={2} justifyContent="center" alignItems='center'>
            { availablePositions.map((position, index) => (
              <Grid display="flex" justifyContent="center" alignItems="center" item xs={12} sm={6} md={6} lg={3} key={index} >
                <ButtonBase key={index} onClick={() => handlePositionChange(position)} sx={{borderRadius:'5px'}}>
                  <Box
                    sx={{ 
                      display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative',
                      margin: '0 auto', padding: '0 auto', width:'190px', height:'40px',
                      color: currentPosition !== position ? "var(--color-gray-5)" : "transparent",
                      border: currentPosition !== position ? "2px solid var(--color-gray-3)" : "2px solid transparent", // Borda transparente para o gradiente
                      background: currentPosition !== position ? "none" : "linear-gradient(to bottom, var(--color-blue-2) 0%, var(--color-blue-4) 80%)",
                      WebkitBackgroundClip: currentPosition !== position ? "none" : "text", // Faz o texto ter a cor do gradiente
                      WebkitTextFillColor: currentPosition !== position ? "initial" : "transparent", // Faz o texto ter a cor do gradiente
                      borderRadius: '5px', overflow:'hidden',    
                      
                      '&::after': (currentPosition === position && !positionChanged) ? { // Para arredondar a borda com gradiente
                        content: '""', 
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        border: '2px solid transparent',
                        borderImage: 'linear-gradient(to bottom, var(--color-blue-2), var(--color-blue-4)) 1',
                        borderRadius: '5px',
                        pointerEvents: 'none' // Evita que o pseudo-elemento interfira nos eventos do mouse
                      } : {},  

                      '&.active': { // Adding a class for active state
                        border: "2px solid #92C8FB", 
                        background: "linear-gradient(to right, #AFD6FA 0%, var(--color-blue-2) 100%)",
                        color: "var(--color-gray-1)", 
                        WebkitBackgroundClip: "none" , 
                        WebkitTextFillColor: "initial", 
                      },
                      '&:hover': {
                        color: "transparent",
                        border: "2px solid transparent",
                        background: "linear-gradient(to bottom, var(--color-blue-2) 0%, var(--color-blue-4) 80%)",
                        WebkitBackgroundClip: "text", // Faz o texto ter a cor do gradiente
                        WebkitTextFillColor: "transparent", // Faz o texto ter a cor do gradiente
                        overflow: 'hidden',
                        position: 'relative', // Necessário para posicionar o pseudo-elemento ::after
                        '&::after': {
                          content: '""', 
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          border: '2px solid transparent',
                          borderImage: 'linear-gradient(to bottom, var(--color-blue-2), var(--color-blue-4)) 1',
                          borderRadius: '5px',
                          pointerEvents: 'none'
                        }
                      }
                    }}
                    className={positionChanged && currentPosition === position ? 'active' : ''}
                  >
                      <Typography sx={{fontFamily: "var(--font-text)", fontWeight: "400", fontSize:'20px'}}>
                          {position}
                      </Typography>
                  </Box>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Box sx={{ visibility: positionChanged ? 'visible' : 'hidden', display: 'flex', justifyContent: 'center', width: '100%', mt:'40px' }} >
          <Button variant="contained" endIcon={<SyncAltIcon sx={{transform: 'rotate(90deg)'}} />} onClick={handleConfirmChange}
            sx={{
              background: 'linear-gradient(90deg, var(--color-blue-2) 0%, var(--color-blue-3) 100%)',
              border:'1px solid #65AAEA',
              fontFamily: 'var(--font-title)', fontSize:'16px',
              fontWeight: '600', 
              width:'386px', height:'40px',
              margin:'auto', padding: '0px auto'
            }}
          >
              CONFIRMAR TROCA
          </Button>
        </Box>
      </Box>
      
    </Dialog>

    <DialogConfirmation open={confirmDialogOpen} onClose={handleConfirmDialogClose} onConfirm={handleDiscardChanges} />
    </>
  )
}

export default Form