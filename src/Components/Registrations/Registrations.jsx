import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab, Grid, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { ERRORS, RegistrationsService } from "./services";
import Register from './Register';
import Form from "./Form";
import { RegistrationsMiddleware } from "./services/registrationsMiddleware";

import './Registrations.module.css';

function Registrations() {

    const [isLoading, setIsLoading] = useState(true); // informa se a página está carregando
    const [registerCreated, setRegisterCreated] = useState(false); // informa se um registro foi criado, para atualizar a lista de registros
    const [registrations, setRegistrations] = useState([]); // lista de registros
    const [openDialog, setOpenDialog] = useState(false); // controla a exibição do Dialog
    const [disabledForm, setDisabledForm] = useState(false); // disabilita os campos do formulário quando ele é submitado
    const [message, setMessage] = useState(''); // mensagem de erro exibida no Form

    // atualiza a lista de registros
    useEffect(() => {
        RegistrationsService.getAllRegistrations()
            .then( (registrations) => {
                setIsLoading(false);
                setRegistrations(registrations);
            });
    }, [registerCreated]);

    // apaga a mensagem de erro
    useEffect(() => {
        setMessage('');
    }, [openDialog]);

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleSubmit = (data) => {
        setDisabledForm(true);

        RegistrationsMiddleware.formValidationSchema.validate( data, { abortEarly: false })
            .then( validatedData => {
                const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);
                return RegistrationsService.createRegister(treatData);
            })
            .then( result => {
                if (result instanceof Error) {
                    setMessage(result);
                } else {
                    setRegisterCreated( oldValue => !oldValue );
                    setMessage('Cadastro criado com sucesso!');
                }
            })
            .catch( errors => {
                if (errors.errors.filter( error => error === ERRORS.REQUIRED ).length >= 0) {
                    setMessage(ERRORS.REQUIRED);
                } else {
                    setMessage(errors.errors[0]);
                }
            })
            .finally( () => {
                setDisabledForm(false);
            });
    };

    return (

        <Box width='100vw' height='100vh' position='relative'>

            {registrations.length === 0 ? (
                <>
                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Typography fontFamily='Ubuntu' fontSize="32px" color='#989898' >
                                Sem cadastros
                            </Typography>
                        )}
                    </Box>
                </>
            ) : (
                <Box
                    width='100%'
                    height='100%'
                    overflow='scroll'
                    pt={5} pl={5} pb={2} pr={10}
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
                message={message}
                setMessage={setMessage}
            />

        </Box >

    );

}

export default Registrations;