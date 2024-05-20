import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Box, Stack, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import WorkIcon from '@mui/icons-material/Work'
import Divider from '@mui/material/Divider';

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


function Form({ open, handleClose, photo, name, initialPosition }) {
  // aqui tem q ter a lógica para fechar (se )
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '30px',
        },
      }}
    >
      <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', m:'1vw'}}>
        <Typography sx={{color:'var(--color-gray-5)', fontFamily:'var(--font-text)'}}>Fechar</Typography>
        <IconButton onClick={handleClose} sx={{color:'var(--color-blue-3)'}}>
          <CancelIcon />
        </IconButton>
      </Box>
      { photo ? ( // ve se a foto é nula ou não
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
                sx={{ margin: 'auto', width: '10vw', height: '10vw' }}
                
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
                <Avatar {...stringAvatar(name)} /> 
            </Box>
        )
      }
      <DialogTitle
        sx={{
          color: "var(--color-gray-5)", 
          fontFamily: "var(--font-text)",
          textAlign: "center"
        }}
      >
        {name}
      </DialogTitle>
      <Box
        display="flex"
        alignItems="center"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1, // margem superior
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
          {initialPosition}
        </Typography>
      </Box>
      <Divider 
        variant="middle"
        sx={{
          height: '2px', // Define a espessura
          width: '40%', // Define o comprimento
          background: 'linear-gradient(45deg, var(--color-blue-3), var(--color-blue-2))', 
          margin: 'auto', // Centraliza horizontalmente
        }}
      />
      <DialogContent>
        <DialogContentText>
          Cargos
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleClose} color="primary">
            Paciente
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Responsável
          </Button>
          <Button onClick={handleClose} color="primary">
            Administrador
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Psicólogo
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default Form