import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogConfirmation({
  open, 
  onClose, // ação do botão da direita
  onConfirm, // ação do botão da esquerda
  messageTitle, 
  message, 
  confirmButtonText, // texto do botão à esquerda 
  cancelButtonText, // texto do botão à direita
  confirmButtonColor, // cor do texto do botão à esquerda
  cancelButtonColor, // cor do texto do botão à direita
  confirmButtonHoverColor, // cor do texto do botão à esquerda passando mouse
  cancelButtonHoverColor, // cor do texto do botão à direita passando mouse
  confirmButtonBorderColor, // cor da borda do botão à esquerda
  cancelButtonBorderColor, // cor da borda do botão à direita
  confirmButtonHoverBackground, // cor ao fundo do botão à esquerda passando mouse
  cancelButtonHoverBackground, // cor do fundo do botão à direita passando mouse
  confirmButtonHoverBorderColor, // cor da borda do botão à esquerda passando mouse
  cancelButtonHoverBorderColor, // cor da borda do botão à direita passando mouse
  logoSrc, // caminho para a imagem 
  logoAlt
}) {
  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-confirmation-title"
      aria-describedby="dialog-confirmation-description"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '30px',
        },
      }}
    > 
      <img 
        src={logoSrc}
        alt={logoAlt} 
        style={{width:"25%", height:"auto",margin:"0 auto"}}
      />
      <DialogTitle 
        id="dialog-confirmation-title"
        sx={{
          color: "var(--color-gray-5)", 
          fontFamily: "var(--font-text)",
          textAlign: "center"
        }}
      >
        {messageTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="dialog-confirmation-description"
          sx={{
            color: "var(--color-gray-4)", 
            fontFamily: "var(--font-text)",
            textAlign: "center"
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions 
        sx={{
          justifyContent: "center", 
          mb: "10px",
          gap: 3
        }}
      >
        <Button 
          variant="outlined" 
          onClick={onConfirm}
          sx={{
            fontFamily: "var(--font-text)",
            fontWeight: "400",
            minWidth: '120px',
            color: confirmButtonColor,
            borderColor: confirmButtonBorderColor,
            borderWidth: '2px',
            '&:hover' : {
              borderWidth: '2px',
              background: confirmButtonHoverBackground, 
              borderColor: confirmButtonHoverBorderColor,
              color: confirmButtonHoverColor
            }
          }}
        >
          {confirmButtonText}
        </Button>
        <Button 
          variant="outlined"  
          onClick={onClose} autoFocus
          sx={{
            fontFamily: "var(--font-text)",
            fontWeight: "400",
            minWidth: '120px',
            color: cancelButtonColor, 
            borderColor: cancelButtonBorderColor,
            borderWidth: '2px',
            '&:hover' : {
              borderWidth: '2px',
              background: cancelButtonHoverBackground, 
              borderColor: cancelButtonHoverBorderColor,
              color: cancelButtonHoverColor
            }
          }}
        >
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation;
