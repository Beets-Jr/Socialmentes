import { Box, Typography } from "@mui/material";

import '../styles/Success.css';

export const Success = ({ status }) => {

    return (
        <Box className='boxContainer'>
            <Typography variant="h3" color={status.code != 'ok' && 'red'}>
                { status.msg }
            </Typography>
        </Box>
    );

}