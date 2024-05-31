import { Box, ButtonBase, Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import WorkIcon from '@mui/icons-material/Work';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useState } from "react";

import Form from './Form';

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
            width:'60px', height: '60px'
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
function Position({setConfirmedChange, photoUrl, fullName, position, id}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return( 
        <>
            <ButtonBase 
                sx={{
                    width: '100%',
                    display: 'block', // Para garantir que ele se comporte como um bloco
                    textAlign: 'inherit', // Para herdar o alinhamento de texto do Card
                }} 
                onClick={handleClickOpen}
            >
                <Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center',width: '100%', height:'202px', boxShadow: '0px 4px 4px 0px #00000026', borderRadius:'11px', border:'2px solid #E0E0E0'}}>
                    <CardContent>
                        { photoUrl ? ( // ve se a foto é nula ou não
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Avatar // recebe a foto de perfil 
                                    alt={`${fullName}'s profile picture`}
                                    src={photoUrl}
                                    sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', width:'60px', height: '60px', }}
                                    
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
                                    <Avatar {...stringAvatar(fullName)} /> 
                                </Box>
                            )
                        }
                        <Typography
                            sx={{
                                fontFamily: "var(--font-text)",
                                fontWeight: "500",
                                color: "var(--color-gray-5)", 
                                textAlign: "center",
                                mt: '5px'
                            }}
                        >
                            {fullName}
                        </Typography>
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
                            {getPositionIcon(position)}
                            <Typography
                                sx={{
                                    fontFamily: "var(--font-text)",
                                    fontWeight: "400",
                                    color: "var(--color-gray-5)", 
                                    textAlign: "center",
                                    fontSize: 15,
                                }}
                            >
                                {position}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </ButtonBase>
            <Form setConfirmedChange={setConfirmedChange} open={open} handleClose={handleClose} photo={photoUrl} name={fullName} initialPosition={position} userID={id}/>
        </>
        
    );
}

export default Position;