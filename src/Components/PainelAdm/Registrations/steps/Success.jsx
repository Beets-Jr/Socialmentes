import { Box, Typography } from "@mui/material";

import '../styles/ChooseCategory.css';

export const Success = ({ success }) => {

    return (
        <Box className='boxContainer'>
            <Typography variant="h3" color={success && 'red'}>
                { success ?
                    'Cadastrado com sucesso!'
                    :
                    'Erro ao cadastrar'
                }
            </Typography>
        </Box>
    );

}