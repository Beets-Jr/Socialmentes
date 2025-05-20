import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const DialogPdf = ({ open, handleClose, label }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth
      PaperProps={{
        sx: {
          minHeight: '30vh',
          borderRadius: '30px',
        }
      }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '0.5rem' }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontFamily: 'var(--font-text)'
          }}>
          Fechar
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={{
            color: '#fff',
            backgroundColor: 'var(--color-blue-3)',
            '&:hover': {
              backgroundColor: '#115293'
            },
            borderRadius: '50%',
            width: '30px',
            height: '30px'
          }}
        >
          <CloseIcon sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1rem'
        }} >
        <Typography align="center"
          sx={{
            fontFamily: 'var(--font-text)',
            fontSize: '20px',
            fontWeight: '500'
          }}
        >
          {label}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mb: '1rem' }}>
        <Button onClick={handleClose} color="primary"
          variant="outlined"
          sx={{
            fontFamily: "var(--font-sub)",
            fontWeight: "400",
            color: 'var(--color-blue-4)',
            fontSize: '20px',
            borderRadius: '15px',
            minWidth: '100px',
            border: '2px solid var(--color-blue-4)',
            '&:hover': {
              backgroundColor: 'var(--color-blue-3)',
              border: '2px solid var(--color-blue-3)',
              color: '#fff',
            }
          }}>

          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogPdf