import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';

function DialogConfirmation(OnClick) {
  const [open, setOpen] = useState(OnClick);

  const handleClose = () => {
    setOpen(false);
  }
  return ( 
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-confirmation-title"
      aria-describedby="dialog-confirmation-description"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '30px',
        },
      }}
    > 
      <img 
        src="https://s3-alpha-sig.figma.com/img/139b/9e54/19e75705e47048317a8935037d01a357?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=duu8Jo-D0I-HbuE6dHbpgGIJuzGcAkjVM7LvZ3r9bHFlGkhiYbDGy3A5M2bVN-FLHTaIGBQcyIWNXnWs~wm3JBbv1i6VP4eqVeRIyp5DbWEVm2-PPCNkPPe1tPLv1jjtobs2zSbKE-K3YmDu3KtFskQ62rZU1k9Md-SFAzK7UTPDRUMD1TgwhWvCSHjuxaZ56Mhgvp7PNFHcTERQFrmqS6J0eixip9F2zikjjsZblAPJfOZvbV-ltYVsAYftmylDvXmI499NWJyZPXVj8R0FLBq95NQx1SrOYGfFgqJVcTd80u7TuotaYE42RsISTkG-vveoL~B-uGTXe6Mp4wnhRw__" 
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
          onClick={handleClose}
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
          onClick={handleClose} autofocus
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