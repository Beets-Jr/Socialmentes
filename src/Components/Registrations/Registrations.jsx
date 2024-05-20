import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab, Grid, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { RegistrationsService } from "./services";
import Register from './Register';
import Form from "./Form";
import { RegistrationsMiddleware } from "./services/registrationsMiddleware";

function Registrations() {

    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [disabledForm, setDisabledForm] = useState(false);

    useEffect(() => {
        RegistrationsService.getAllRegistrations(setRegistrations)
            .then(() => setIsLoading(false));
    }, []);

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleSubmit = (data) => {
        setDisabledForm(true);

        RegistrationsMiddleware.formValidationSchema.validate(data)
            .then( validatedData => {
                const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);
                return RegistrationsService.createRegister(treatData);
            })
            .then( result => {
                if (result instanceof Error) {
                    // ATUALIZAR PARA EXIBIR NA TELA QUE NÃO FOI POSSÍVEL CRIAR O REGISTER
                } else {
                    console.log(`Registro '${result}' criado com sucesso!`);
                }
            })
            .catch( errors => {
                // ATUALIZAR PARA EXIBIR O ERRO (RETORNADO PELO YUP) NA TELA
                console.log(errors.errors)
            })
            .finally( () => setDisabledForm(false) );

        // const result = RegistrationsService.createRegister(treatData);

        // if (result instanceof Error) {
        //     // ATUALIZAR PARA EXIBIR NA TELA QUE NÃO FOI POSSÍVEL CRIAR O REGISTER
        // }

    };

    return (

        <Box width='100vw' height='100vh' position='relative'>

            {registrations.length === 0 ? (
                <>

                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Typography
                                fontFamily='Ubuntu'
                                fontSize="32px"
                                color='#989898'
                            > Sem cadastros </Typography>
                        )}
                    </Box>

                </>
            ) : (

                <Box
                    width='100%'
                    height='100%'
                    pt={5} pl={5} pb={2} pr={10}
                    overflow='scroll'
                >
                    <Grid container
                        rowSpacing={4}
                        columnSpacing={5}
                        sx={{ pb: 2 }}
                    >
                        {registrations.map((register) => (
                            <Grid item key={register.id} xs={12} sm={6} md={4}>
                                <Register register={register} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            )}

            <Fab
                sx={{ width: 90, height: 90, position: 'absolute', bottom: 50, right: 50 }}
                color="primary" // #5095D5
                aria-label='add'
                onClick={() => setOpenDialog(true)}
            >
                <AddRounded sx={{ fontSize: 70 }} />
            </Fab>

            <Form
                openDialog={openDialog}
                disabledForm={disabledForm}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />

        </Box >

    );

}

export default Registrations;