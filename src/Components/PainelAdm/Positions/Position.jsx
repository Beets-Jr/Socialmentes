import { Box, ButtonBase, Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useState } from "react";

import Form from './Form';
import PhotoAvatar from "./Avatar/PhotoAvatar";
import NameAvatar from "./Avatar/NameAvatar";
import PositionIcons from "./Icons/PositionIcons";

import styles from './styles/Position.module.css';

function getPositionIcon(position) {
    return PositionIcons[position];
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

    const isAuthorizedPosition = (position) => {
        return ["Responsável", "Psicólogo", "Administrador"].includes(position);
    };

    return( 
        <>
            <ButtonBase className={styles.cardButton} onClick={handleClickOpen} >
                <Card className={styles.card}>
                    <CardContent>
                        <Box className={styles.avatarContainer}>
                            { photoUrl ? ( // ve se a foto é nula ou não
                                <PhotoAvatar photoUrl={photoUrl} altText={fullName} size='60px'/>
                            ) : ( <NameAvatar name={fullName} size='60px'/> )}
                        </Box>

                        <Typography className={styles.nameText}>
                            {fullName}
                        </Typography>

                        { isAuthorizedPosition(position) && (
                            <Box className={styles.positionContainer}>
                                {getPositionIcon(position)}
                                <Typography>
                                    {position}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </ButtonBase>
            <Form setConfirmedChange={setConfirmedChange} open={open} handleClose={handleClose} photo={photoUrl} name={fullName} initialPosition={position} userID={id}/>
        </>
        
    );
}

export default Position;