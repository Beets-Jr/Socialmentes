import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { CloseRounded, PlaylistAddRounded } from "@mui/icons-material";

import { VForm, VTextField, VSelect, VUploadPhoto } from './forms';
import { IconCalendar, IconEmail, IconGender, IconIdentity, IconPerson, IconPhone } from "./assets/icons";

import './Form.css';
import { IconClose } from "./assets/icons/IconClose";

function Form({ openDialog, disabledForm, handleClose, handleSubmit, message, setMessage }) {

    const theme = useTheme();

    return (

        <Dialog
            PaperProps={{
                sx: {
                    borderRadius: 5
                }
            }}
            className='dialog'
            open={openDialog}
            onClose={handleClose}
            // maxWidth="sm"
            fullWidth
        >

            <DialogTitle className='dialogTitle' >
                <Typography variant="h2" display='inline'>
                    Adicionar cadastro
                </Typography>

                <IconButton
                    className="buttonClose"
                    onClick={ () => handleClose() }
                >
                    <IconClose color={theme.palette.secondary.main}/>
                </IconButton>
            </DialogTitle>

            <DialogContent>

                <VForm
                    onSubmit={ (data) => handleSubmit(data) }
                    encType="multipart/form-data"
                >
                    <Grid container className='gridContainer'>

                        <Grid item xs={12} textAlign='center' >
                            <VUploadPhoto name='photo' />
                        </Grid>

                        <Grid container item xs={12}>
                            <VTextField
                                name='fullName'
                                variant='outlined'
                                label_icon={<IconPerson />}
                                label='Nome completo'
                                placeholder='Digite seu nome'
                                disabled={disabledForm}
                                fullWidth
                            />
                        </Grid>

                        <Grid container item xs={12}>
                            <VTextField
                                name='email'
                                variant='outlined'
                                label_icon={<IconEmail />}
                                label='Email'
                                placeholder='exemplo@email.com'
                                disabled={disabledForm}
                                fullWidth
                            />
                        </Grid>

                        <Grid container item direction='row' justifyContent='space-between'>
                            <Grid item xs={5}>
                                <VTextField
                                    name='dateOfBirth'
                                    variant='outlined'
                                    label_icon={<IconCalendar />}
                                    label='Nascimento'
                                    placeholder='DD/MM/AA'
                                    disabled={disabledForm}
                                />
                            </Grid>
                            <Grid item xs={6.5}>
                                <VTextField
                                    name='cpf'
                                    variant='outlined'
                                    label_icon={<IconIdentity />}
                                    label='CPF'
                                    placeholder='NNN.NNN.NNN-NN'
                                    disabled={disabledForm}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' justifyContent='space-between'>
                            <Grid item xs={6}>
                                <VTextField
                                    name='phone'
                                    variant='outlined'
                                    label_icon={<IconPhone />}
                                    label='Telefone'
                                    placeholder='(NN) NNNNNN-NNNN'
                                    disabled={disabledForm}
                                />
                            </Grid>
                            <Grid item xs={5.5}>
                                <VSelect
                                    name='gender'
                                    variant='outlined'
                                    label_icon={<IconGender />}
                                    label='Gênero'
                                    placeholder='Selecione'
                                    disabled={disabledForm}
                                    items={[
                                        { value: 'female', label: 'Feminino'},
                                        { value: 'male', label: 'Masculino'},
                                        { value: 'other', label: 'Outro'}
                                    ]}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item textAlign='center' py={2}>

                            <Button
                                sx={{ textTransform: 'none' }}
                                variant="outlined"
                                type="submit"
                                disabled={disabledForm}
                            >
                                <PlaylistAddRounded />
                                Adicionar
                            </Button>

                        </Grid>

                    </Grid>
                </VForm>

                <Box>
                    {message}
                </Box>

            </DialogContent>

        </Dialog>

    );

}

export default Form;