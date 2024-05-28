import { Box, Typography } from "@mui/material";

import '../styles/ChooseCategory.css';

export const Success = () => {

    return (
        <Box className='boxContainer'>
            <Typography variant="h3">
                Cadastrado com sucesso!
            </Typography>
        </Box>
    );

}