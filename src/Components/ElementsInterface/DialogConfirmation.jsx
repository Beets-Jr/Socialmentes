import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DialogConfirmation({open, onClose, onConfirm}) {
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
        src="..\src\Assets\LogoSociaMentes1.png" 
        alt="socialmentes-logo" 
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
        {"Você tem certeza que deseja sair?"}
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
          As mudanças que você deseja fazer ainda não foram salvas!
        </DialogContentText>
      </DialogContent>
      <DialogActions 
        sx={{
          justifyContent: "center", 
          mb: "10px"
        }}
      >
        <Button 
          variant="outlined" 
          onClick={onConfirm}
          sx={{
            fontFamily: "var(--font-text)",
            fontWeight: "400",
            color: "var(--color-gray-3)", 
            borderColor: "var(--color-gray-3)",
            paddingLeft: "30px",
            paddingRight: "30px",
            '&:hover' : {
              background: 'linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))', 
              borderColor: 'var(--color-blue-3)',
              color: "var(--color-blue-1)"
            }
          }}
        >
          Sair
        </Button>
        <Button 
          variant="outlined"  
          onClick={onClose} autoFocus
          sx={{
            fontFamily: "var(--font-text)",
            fontWeight: "400",
            color: "var(--color-gray-3)", 
            borderColor: "var(--color-gray-3)",
            '&:hover' : {
              background: 'linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))', 
              borderColor: 'var(--color-blue-3)',
              color: "var(--color-blue-1)"
            }
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation