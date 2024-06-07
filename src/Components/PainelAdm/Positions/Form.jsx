import { Box, Stack, Typography, Dialog, Button, Avatar, Divider, IconButton, ButtonBase, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

import { useState } from 'react';

import { db } from "../../../Database/FirebaseConfig.mjs"
import { doc, updateDoc } from 'firebase/firestore';

import DialogConfirmation from "../../ElementsInterface/DialogConfirmation";
import PhotoAvatar from "./Avatar/PhotoAvatar";
import NameAvatar from "./Avatar/NameAvatar";
import PositionIcons from "./Icons/PositionIcons";
import styles from "./styles/Form.module.css";

function getPositionIcon(position) {
  return PositionIcons[position];
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
    <Dialog open={open} sx={{'& .MuiPaper-root': { borderRadius: '30px', width:'1041px', height:'606px', maxWidth:'1041px'}}} >
      <Box className={styles.exitContainer}>
        <Typography className={styles.exitText}>Fechar</Typography>
        <IconButton onClick={handleClickClose} className={styles.exitButton}>
          <CancelIcon/>
        </IconButton>
      </Box>
      
      <Box className={styles.avatarContainer}>
        { photo ? ( // ve se a foto é nula ou não
          <PhotoAvatar photoUrl={photo} altText={name} size='150px'/>
        ) : ( <NameAvatar name={name} size='150px'/> )}
      </Box>

      <Typography className={styles.nameText}>
        {name}
      </Typography>

      <Box className={styles.positionContainer} >
        {getPositionIcon(currentPosition)}
        <Typography className={styles.positionText}>
          {currentPosition}
        </Typography>
      </Box>

      <Divider variant="middle" className={styles.divider}/>

      <Typography className={styles.positionTitle} >
        CARGOS
      </Typography>
      
      <Box className={styles.positionsContainer}>
        <Stack direction="row" spacing={2}  className={styles.positionsStack} >
          <Grid container spacing={2} justifyContent="center" alignItems='center'>
            { availablePositions.map((position, index) => (
              <Grid display="flex" justifyContent="center" alignItems="center" item xs={12} sm={6} md={6} lg={3} key={index} >
                <ButtonBase key={index} onClick={() => handlePositionChange(position)} sx={{borderRadius:'5px'}}>
                  <Box                  
                    className={positionChanged && currentPosition === position ? styles.positionButtonBoxActive : currentPosition === position && !positionChanged ? styles.positionButtonBox : styles.availablePositionButtonBox}
                  >
                      <Typography sx={{fontFamily: "var(--font-text)", fontSize:'20px'}}>
                          {position}
                      </Typography>
                  </Box>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Box sx={{ visibility: positionChanged ? 'visible' : 'hidden'}} className={styles.confirmationContainer}>
          <Button variant="contained" endIcon={<SyncAltIcon sx={{transform: 'rotate(90deg)'}} />} onClick={handleConfirmChange}
            className={styles.confirmationText}
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