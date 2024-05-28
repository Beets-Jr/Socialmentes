import { Box, Typography } from "@mui/material";

import { VRadioGroup } from "../forms";

import '../styles/ChooseCategory.css';

export const ChooseCategory = ({ disabledForm, setDisabledButton }) => {

    return (
        <Box className='boxContainer'>
            <Typography variant="h3">
                Escolha uma categoria
            </Typography>

            <VRadioGroup
                name='category'
                categories={[
                    { value: 'patient', label: 'Paciente' },
                    { value: 'professional', label: 'Profissional' }
                ]}
                onChange={ () => {
                    setDisabledButton(false);
                } }
                sx={{ display: 'flex', gap: 7, ml: 2 }}
                fontSize={20}
                disabled={disabledForm}
                row
            />
        </Box>
    );

}