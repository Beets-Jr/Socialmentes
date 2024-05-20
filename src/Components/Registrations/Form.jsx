import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { CloseRounded, PlaylistAddRounded } from "@mui/icons-material";

import { VForm, VTextField, VSelect, VUploadPhoto } from './forms';
import { SvgCalendar, SvgEmail, SvgGender, SvgIdentity, SvgPerson, SvgPhone } from "./icons";

function Form({ openDialog, disabledForm, handleClose, handleSubmit, message, setMessage }) {

    return (

        <Dialog
            open={openDialog}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle
                textAlign='center'
                position='relative'
                marginX={2}
            >

                <Typography>
                    Adicionar cadastro
                </Typography>

                <IconButton
                    sx={{ position: 'absolute', right: 0, top: 0 }} 
                    onClick={ () => handleClose() }
                >
                    <CloseRounded/>
                </IconButton>

            </DialogTitle>

            <DialogContent>

                <VForm
                    width='100%'
                    flex={1}
                    onSubmit={ (data) => handleSubmit(data) }
                    encType="multipart/form-data"
                >

                    <Grid
                        container
                        direction='column'
                        gap={2}
                        paddingX={12}
                    >

                        <Grid item xs={12} textAlign='center'>
                            <VUploadPhoto name='photo' />
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12}>
                                <VTextField
                                    name='fullName'
                                    variant='outlined'
                                    label_icon={<SvgPerson />}
                                    label='Nome completo'
                                    placeholder='Digite seu nome'
                                    disabled={disabledForm}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12}>
                                <VTextField
                                    name='email'
                                    variant='outlined'
                                    label_icon={<SvgEmail />}
                                    label='Email'
                                    placeholder='exemplo@email.com'
                                    disabled={disabledForm}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' justifyContent='space-between'>
                            <Grid item xs={5}>
                                <VTextField
                                    name='dateOfBirth'
                                    variant='outlined'
                                    label_icon={<SvgCalendar />}
                                    label='Nascimento'
                                    placeholder='DD/MM/AA'
                                    disabled={disabledForm}
                                />
                            </Grid>
                            <Grid item xs={6.5}>
                                <VTextField
                                    name='cpf'
                                    variant='outlined'
                                    label_icon={<SvgIdentity />}
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
                                    label_icon={<SvgPhone />}
                                    label='Telefone'
                                    placeholder='(NN) NNNNNN-NNNN'
                                    disabled={disabledForm}
                                />
                            </Grid>
                            <Grid item xs={5.5}>
                                <VSelect
                                    name='gender'
                                    variant='outlined'
                                    label_icon={<SvgGender />}
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

                        <Grid item textAlign='center' paddingY={2}>

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