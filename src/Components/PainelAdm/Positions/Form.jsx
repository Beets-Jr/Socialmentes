import { Box, Stack, Typography, Dialog, Button, Avatar, Divider, IconButton, ButtonBase, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useState } from 'react';
import DialogConfirmation from "../../ElementsInterface/DialogConfirmation";
import PhotoAvatar from "./Avatar/PhotoAvatar";
import NameAvatar from "./Avatar/NameAvatar";
import PositionIcons from "./Icons/PositionIcons";
import styles from "./styles/Form.module.css";
import { updateUserPosition } from '../../../Services/userProfileService';
import Logo from '../../../Assets/LogoSocialMentes1.png';

function getPositionIcon(position) {
  return PositionIcons[position];
}

// eslint-disable-next-line react/prop-types
function Form({ open, handleClose, photo, name, initialPosition, userID, setConfirmedChange }) {
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const availablePositions = ['Psicólogo', 'Responsável', 'Administrador'];
  const [positionChanged, setPositionChanged] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handlePositionChange = (newPosition) => {
    if (currentPosition !== newPosition) {
      setCurrentPosition(newPosition);
      setPositionChanged(newPosition !== initialPosition);
    }
  };

  const handleConfirmChange = async () => {
    const success = await updateUserPosition(userID, currentPosition);
    if (success) {
      setPositionChanged(false);
      setConfirmedChange(true); // set a confirmação de update
      handleClose(); // Esperar a conclusão da função assíncrona
    }
  };

  const handleClickClose = () => {
    if (positionChanged) {
      setConfirmDialogOpen(true);
    } else {
      setConfirmedChange(true);
      handleClose();
    }
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleDiscardChanges = () => {
    setConfirmDialogOpen(false);
    setPositionChanged(false);
    setConfirmedChange(true);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { borderRadius: '30px', width: '1041px', height: '606px', maxWidth: '1041px' } }}>
        <Box className={styles.exitContainer}>
          <Typography className={styles.exitText}>Fechar</Typography>
          <IconButton onClick={handleClickClose} className={styles.exitButton}>
            <CancelIcon />
          </IconButton>
        </Box>

        <Box className={styles.avatarContainer}>
          {photo ? (
            <PhotoAvatar photoUrl={photo} altText={name} size='150px' />
          ) : (<NameAvatar name={name} size='150px' />)}
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

        <Divider variant="middle" className={styles.divider} />

        <Typography className={styles.positionTitle}>
          CARGOS
        </Typography>

        <Box className={styles.positionsContainer}>
          <Stack direction="row" spacing={2} className={styles.positionsStack}>
            <Grid container spacing={2} justifyContent="center" alignItems='center'>
              {availablePositions.map((position, index) => (
                <Grid display="flex" justifyContent="center" alignItems="center" item xs={12} sm={8} md={7} lg={4} key={index}>
                  <ButtonBase key={index} onClick={() => handlePositionChange(position)} sx={{ borderRadius: '5px' }}>
                    <Box
                      className={positionChanged && currentPosition === position ? styles.positionButtonBoxActive : currentPosition === position && !positionChanged ? styles.positionButtonBox : styles.availablePositionButtonBox}
                    >
                      <Typography sx={{ fontFamily: "var(--font-text)", fontSize: '20px' }}>
                        {position}
                      </Typography>
                    </Box>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Box sx={{ visibility: positionChanged ? 'visible' : 'hidden' }} className={styles.confirmationContainer}>
            <Button variant="contained" endIcon={<SyncAltIcon sx={{ transform: 'rotate(90deg)' }} />} onClick={handleConfirmChange}
              className={styles.confirmationText}
            >
              CONFIRMAR TROCA
            </Button>
          </Box>
        </Box>
      </Dialog>
      <DialogConfirmation
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        onConfirm={handleDiscardChanges}
        messageTitle="Você tem certeza que deseja sair?"
        message="As mudanças que você deseja fazer ainda não foram salvas!"
        confirmButtonText="Sair"
        cancelButtonText="Cancelar"
        confirmButtonColor="var(--color-gray-4)"
        cancelButtonColor="var(--color-gray-4)"
        confirmButtonBorderColor="var(--color-gray-3)"
        cancelButtonBorderColor="var(--color-gray-3)"
        confirmButtonHoverColor="white"
        cancelButtonHoverColor="white"
        confirmButtonHoverBackground="linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))"
        cancelButtonHoverBackground="linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))"
        confirmButtonHoverBorderColor="var(--color-blue-3)"
        cancelButtonHoverBorderColor="var(--color-blue-3)"
        logoSrc={Logo}
        logoAlt="socialmentes-logo"
      />
      
    </>
  )
}

export default Form;
