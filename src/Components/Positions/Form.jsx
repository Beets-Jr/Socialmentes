import { Box, Stack, Typography, Dialog, Button, Avatar, Divider, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkIcon from "@mui/icons-material/Work";
import SyncAltIcon from "@mui/icons-material/SyncAlt"

import { useState, useEffect } from 'react';

import { db } from "../../Database/FirebaseConfig.mjs"
import { doc, updateDoc } from 'firebase/firestore/lite';

import DialogConfirmation from "../ElementsInterface/DialogConfirmation";

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
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function Form({ open, handleClose, photo, name, initialPosition, userID}) {
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const availablePositions = ['Paciente', 'Responsável', 'Administrador', 'Psicólogo'];
  const [positionChanged, setPositionChanged] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmedChange, setConfirmedChange] = useState(false);

  

  const handlePositionChange = (position) => {
    setCurrentPosition(position);
    setPositionChanged(initialPosition !== position);
  }

  const handleConfirmChange = async () => {
    const getUserDocRef = doc(db, 'userProfiles', userID);
    try {
      await updateDoc(getUserDocRef,{ position: currentPosition });
      console.log('Position updated successfully!');
      setPositionChanged(false); // Reset após mudança feita com sucesso 
      setConfirmedChange(true); // set a confimação de update
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
  
  useEffect(() => {
    if (confirmedChange) {
      window.location.reload();
    }
  }, [confirmedChange]);

  return (
    <>
    <Dialog 
      open={open} 
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '30px',
          minWidth:'70vw',
        },
      }}
    >
        <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', m:'1vw'}}>
        <Typography sx={{color:'var(--color-gray-5)', fontFamily:'var(--font-text)', fontSize: { xs: '0.5rem', sm: '0.8rem', md: '1.0rem' },}}>Fechar</Typography>
        <IconButton 
          onClick={handleClickClose} 
          sx={{
            color:'var(--color-blue-3)', 
            '&:hover': { 
              boxShadow: 'none',
              backgroundColor: 'transparent', 
            },
          }}
        >
          <CancelIcon sx={{fontSize: { xs: '1rem', sm: '1.5rem' }, }} />
        </IconButton>
      </Box>
      
      { photo ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar // recebe a foto de perfil 
            alt={`${name}'s profile picture`}
            src={photo}
            sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', minWidth:'47px', width:'4vw', minHeight: '47px', height: '4vw'}}
          />
        </Box>
      ) : (
        <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
      >
          <Avatar {...stringAvatar(name)} sx={{ margin: 'auto', width: '10vw', height: '10vw', border: '2px solid var(--color-gray-3)'}} /> 
      </Box>
      )}

      <Typography
        sx={{
          color: "var(--color-gray-5)", 
          fontFamily: "var(--font-text)",
          textAlign: "center", 
          fontWeight: '500', 
          mt: '1vh'
        }}
      >
        {name}
      </Typography>

      <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2
        }}
      >
        <WorkIcon 
          sx={{
              mr: 1, mb:0.2,
              color: "var(--color-gray-3)",
              fontSize: 15,
          }}
        />
        <Typography
          sx={{
              fontFamily: "var(--font-text)",
              fontWeight: "400",
              color: "var(--color-gray-5)", 
              textAlign: "center",
              fontSize: 15,
          }}
        >
          {currentPosition}
        </Typography>
      </Box>

      <Divider 
        variant="middle"
        sx={{
          height: '2px',
          width: '40%', 
          background: 'linear-gradient(90deg, var(--color-blue-1) 0%, var(--color-blue-2) 50.5%, var(--color-blue-1) 100.01%)', 
          margin: '0 auto', 
          border: 'none'
        }}
      />

      <Typography
        sx={{
          color: "var(--color-gray-4)", 
          fontFamily: "var(--font-text)",
          textAlign: "center", 
          fontWeight:'500',
        }}
      >
        Cargos
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mb:'20px' }}>
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{
            display:'flex', 
            justifyContent:'center', 
            margin:'5px auto'
          }}
        >
          { availablePositions.map((position, index) => (
            <Button 
              key={index} 
              variant='outlined'
              sx={{
                fontFamily: "var(--font-text)",
                fontWeight: "400",
                margin: '0 auto ',
                padding: '0 auto',
                color: currentPosition !== position ? "var(--color-gray-5)" : "white",
                border: currentPosition !== position ? "1px solid var(--color-gray-3)" : "1px solid transparent", // Borda transparente para o gradiente
                background: currentPosition !== position ? "none" : " var(--color-blue-3)",
                WebkitBackgroundClip: currentPosition !== position ? "none" : "text", // Faz o texto ter a cor do gradiente
                WebkitTextFillColor: currentPosition !== position ? "initial" : "transparent", // Faz o texto ter a cor do gradiente
                // Borda com cor do gradiente
                '&.Mui-selected': {
                  border: currentPosition !== position ? "1px solid var(--color-gray-3)" : "1px solid var(--color-blue-2)",
                  background: "linear-gradient(0deg, var(--color-blue-2) 100%, var(--color-blue-3) 100%)",
                  WebkitBackgroundClip: currentPosition !== position ? "none" : "text", // Faz o texto ter a cor do gradiente
                  WebkitTextFillColor: currentPosition !== position ? "initial" : "transparent", // Faz o texto ter a cor do gradiente
                },
                '&:hover': {

                }
              }}
              onClick={() => handlePositionChange(position)}
            >
              {position}
            </Button>
          ))}
        </Stack>

        { positionChanged && (
          <Button 
            variant="contained" 
            endIcon={<SyncAltIcon sx={{transform: 'rotate(90deg)'}} />}
            sx={{
              background: 'linear-gradient(to left, var(--color-blue-4), var(--color-blue-2))',
              fontFamily: 'var(--font-title)',
              fontWeight: '600',
              fontSize: { xs: '0.5rem', sm: '0.8rem', md: '1.0rem' }, 
              maxWidth:'40vw', 
              margin:'auto', 
              padding: '0px 40px'
            }}
            onClick={handleConfirmChange}
          >
              CONFIRMAR TROCA
          </Button>
        )}
      </Box>
      
    </Dialog>

    <DialogConfirmation 
        open={confirmDialogOpen} 
        onClose={handleConfirmDialogClose}
        onConfirm={handleDiscardChanges}
      />
    </>
  )
}

export default Form