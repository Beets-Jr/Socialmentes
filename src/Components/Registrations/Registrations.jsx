import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab, Grid, StyledEngineProvider, ThemeProvider, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';

import { ERRORS, RegistrationsService, RegistrationsMiddleware } from "./services";
import Register from './Register';
import Form from "./Form";

import './Registrations.css';
import { theme } from "./theme";

const cache = createCache({
    key: 'css',
    prepend: true,
});

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
            .then((registrations) => {
                setIsLoading(false);
                setRegistrations(registrations);
            });
    }, [registerCreated]);

    // apaga a mensagem de erro
    useEffect(() => {
        setMessage('');
    }, [openDialog]);

    // trata o fechamento do Dialog
    const handleClose = () => {
        setOpenDialog(false);
    }

    // trata o envio do formulário
    const handleSubmit = (data) => {
        setDisabledForm(true);

        RegistrationsMiddleware.formValidationSchema.validate(data, { abortEarly: false })
            .then(validatedData => {
                const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);
                return RegistrationsService.createRegister(treatData);
            })
            .then(result => {
                if (result instanceof Error) {
                    setMessage(result);
                } else {
                    setRegisterCreated(oldValue => !oldValue);
                    setMessage('Cadastro criado com sucesso!');
                }
            })
            .catch(errors => {
                if (errors.errors.filter(error => error === ERRORS.REQUIRED).length >= 0) {
                    setMessage(ERRORS.REQUIRED);
                } else {
                    setMessage(errors.errors[0]);
                }
            })
            .finally(() => {
                setDisabledForm(false);
            });
    };

    return (

        <ThemeProvider theme={theme}>
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst >
                    <Box className='containerRegistrations'>

                        {registrations.length === 0 ? (
                            <Box className='containerNoRegistrations'>
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <Typography className='noRegistrations' >
                                        Sem cadastros
                                    </Typography>
                                )}
                            </Box>
                        ) : (
                            <Box className='containerGrid'>
                                <Grid container
                                    rowSpacing={4}
                                    columnSpacing={5}
                                >
                                    {registrations.map((register) => (
                                        <Grid item
                                            key={register.id}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                        >
                                            <Register register={register} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        <Fab
                            className="fab"
                            color='primary'
                            aria-label='add'
                            onClick={() => setOpenDialog(true)}
                        >
                            <AddRounded />
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
                </StyledEngineProvider>
            </CacheProvider>
        </ThemeProvider>

    );

}

export default Registrations;