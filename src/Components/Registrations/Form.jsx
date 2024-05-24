import { useEffect, useState } from "react";
import { Grid, useTheme } from "@mui/material";

import { ERRORS, RegistrationsMiddleware } from "./services";
import { VTextField, VSelect, VUploadPhoto } from './forms';
import { useDebounce } from "./hooks/useDebounce";
import { IconAttention, IconCity, IconEmail, IconIdentity, IconLocation, IconPerson, IconPhone, IconPositionForm } from "./assets/icons";

import './styles/Form.css';

function Form({ formRef, disabledForm, setDisabledForm, setHandleProceed, setDisabledButton, setMessage }) {

    // usada na ativação do useDebounce
    const [alteredField, setAlteredField] = useState(false);

    // seta a função executada ao clicar no botão
    useEffect( () => {
        setHandleProceed( () => (data) => {
            setDisabledForm(true);

            RegistrationsMiddleware.formValidationSchema.validate(data, { abortEarly: false })
                .then( () => {
                    return true;
                })
                .catch( errors => {
                    if (errors.errors.filter(error => error === ERRORS.REQUIRED).length >= 0) {
                        setMessage(ERRORS.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }

                    setDisabledForm(false);
                    return false;
                });
        });
    });

    // ao alterar o valor de algum campo
    useDebounce( () => {
        console.log(formRef.current.getData());
        // setDisabledButton(false);
    }, [alteredField], 500, true);

    return (
        <Grid container className='gridContainer'>

            {/** Foto do usuário */}
            <Grid item xs={12} textAlign='center' >
                <VUploadPhoto name='photo' />
            </Grid>

            {/** Nome completo */}
            <Grid container item xs={12}>
                <VTextField
                    name='fullName'
                    variant='outlined'
                    label_icon={<IconPerson {...icon_props} />}
                    label='Nome completo'
                    placeholder='Digite seu nome'
                    disabled={disabledForm}
                    onKeyDown={ () => setAlteredField(oldValue => !oldValue) }
                    fullWidth
                />
            </Grid>

            {/** Email do usuário */}
            <Grid container item xs={12}>
                <VTextField
                    name='email'
                    variant='outlined'
                    label_icon={<IconEmail {...icon_props} sx={{ mt: .3 }} />}
                    label='Email'
                    placeholder='exemplo@email.com'
                    disabled={disabledForm}
                    fullWidth
                />
            </Grid>

            {/** CEP e CPF */}
            <Grid container item direction='row' justifyContent='space-between'>
                <Grid item xs={5}>
                    <VTextField
                        name='cep'
                        variant='outlined'
                        label_icon={<IconLocation {...icon_props} />}
                        label='CEP'
                        placeholder='NNNNN-NNN'
                        disabled={disabledForm}
                    />
                </Grid>
                <Grid item xs={6.5}>
                    <VTextField
                        name='cpf'
                        variant='outlined'
                        label_icon={<IconIdentity {...icon_props} />}
                        label='CPF'
                        placeholder='NNN.NNN.NNN-NN'
                        disabled={disabledForm}
                    />
                </Grid>
            </Grid>

            {/** Cargo e celular */}
            <Grid container item direction='row' justifyContent='space-between'>
                <Grid item xs={6.5}>
                    <VSelect
                        name='position'
                        variant='outlined'
                        label_icon={<IconPositionForm {...icon_props} sx={{ mt: .3 }} />}
                        label='Cargo'
                        placeholder='Selecione'
                        disabled={disabledForm}
                        items={[ // ATUALIZAR
                            { value: 'female', label: 'Feminino'},
                            { value: 'male', label: 'Masculino'},
                            { value: 'other', label: 'Outro'}
                        ]}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={5}>
                    <VTextField
                        name='phone'
                        variant='outlined'
                        label_icon={<IconPhone {...icon_props} />}
                        label='Celular'
                        placeholder='(NN) NNNNNN-NNNN'
                        disabled={disabledForm}
                    />
                </Grid>
            </Grid>

            {/** Estado e Cidade */}
            <Grid container item direction='row' justifyContent='space-between'>
                <Grid item xs={3}>
                    <VTextField
                        name='state'
                        variant='outlined'
                        label_icon={<IconAttention {...icon_props} />}
                        label='UF'
                        placeholder='Estado'
                        disabled={disabledForm}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8.5}>
                    <VTextField
                        name='city'
                        variant='outlined'
                        label_icon={<IconCity {...icon_props} />}
                        label='Cidade'
                        placeholder='Cidade'
                        disabled={disabledForm}
                        fullWidth
                    />
                </Grid>
            </Grid>

        </Grid>

    );

}

export default Form;