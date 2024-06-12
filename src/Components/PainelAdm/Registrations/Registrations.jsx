import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab, Grid, StyledEngineProvider, ThemeProvider, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';

import { theme } from "./theme";
import { UserService } from '../../../Database/Services';
import Register from './Register';
import AddRegister from "./AddRegister";

import './styles/Registrations.css';

const cache = createCache({
    key: 'css',
    prepend: true,
});

function Registrations() {

    const [isLoading, setIsLoading] = useState(true); // informa se os registros estão sendo carregados
    const [registerCreated, setRegisterCreated] = useState(false); // informa se um registro foi criado com sucesso, para atualizar a lista de registros
    const [registrations, setRegistrations] = useState([]); // a própria lista de registros
    const [openDialog, setOpenDialog] = useState(false); // controla a exibição do Dialog

    // atualiza a lista de registros
    useEffect(() => {
        UserService.getAllUsers()
            .then((registrations) => {
                setIsLoading(false);
                setRegistrations(registrations);
            });
    }, [registerCreated]);

    // trata o fechamento do Dialog
    const handleClose = () => {
        setOpenDialog(false);
    }

    return (

        <ThemeProvider theme={theme}>
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst >
                    <Box className='containerRegistrations'>

                        {/** Carregamento da lista de registros ou mensagem de lista vazia */}
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

                        {/** Botão flutuante */}
                        <Fab
                            className="fab"
                            color='primary'
                            aria-label='add'
                            onClick={() => setOpenDialog(true)}
                        >
                            <AddRounded />
                        </Fab>

                        {/** Dialog */}
                        <AddRegister
                            openDialog={openDialog}
                            handleClose={handleClose}
                            setRegisterCreated={setRegisterCreated}
                        />

                    </Box >
                </StyledEngineProvider>
            </CacheProvider>
        </ThemeProvider>

    );

}

export default Registrations;