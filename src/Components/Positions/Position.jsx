import { Box, ButtonBase, Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import WorkIcon from '@mui/icons-material/Work';

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
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function Position({photoUrl, fullName, position, id}) {
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
                    maxWidth: '327px',
                    display: 'block', // Para garantir que ele se comporte como um bloco
                    textAlign: 'inherit', // Para herdar o alinhamento de texto do Card
                }} 
                onClick={handleClickOpen}
            >
                <Card style={{width: '100%'}}>
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
                                    sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', minWidth:'42px', width:'4vw', minHeight: '42px', height: '4vw'}}
                                    
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
                                    <Avatar {...stringAvatar(fullName)} sx={{ margin: 'auto', border: '2px solid var(--color-gray-3)', minWidth:'42px', width:'4vw', minHeight: '42px', height: '4vw'}} /> 
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
                                {position}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </ButtonBase>
            <Form open={open} handleClose={handleClose} photo={photoUrl} name={fullName} initialPosition={position} userID={id}/>
        </>
        
    );
}

export default Position;