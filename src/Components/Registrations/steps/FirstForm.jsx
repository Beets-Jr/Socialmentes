import { useTheme } from "@mui/material";

import { IconAttention, IconCity, IconEmail, IconIdentity, IconLocation, IconPerson, IconPhone, IconPositionForm } from "../assets/icons";
import { VFormContent, VRow, VSelect, VTextField, VUploadPhoto, useVFormContext } from "../forms";

export const FirstForm = ({ disabledForm, setDisabledButton }) => {

    const { getFieldValue, focusedField } = useVFormContext();

    const fieldsRequireds = [
        'photo',
        'fullName',
        'email',
        'cep',
        'cpf',
        'specialization',
        'phone',
        'state',
        'city'
    ];

    const handleChange = (data) => {
        if ([...Object.entries(data)].some( field => fieldsRequireds.includes(field[0]) && !field[1] ))
            setDisabledButton(true);
        else {
            setDisabledButton(false);
        }
    }

    const theme = useTheme();
    const darkGray = theme.palette.secondary.dark;
    const blue = theme.palette.primary.main;

    // propriedades passadas nos ícones
    const icon_props = (field, mt) => {
        const fieldValue = getFieldValue(field);
        return {
            fontSize: 'inherit',
            color: (fieldValue || field === focusedField) ? blue : darkGray,
            sx: {
                mt: mt ? mt : .2,
            }
        };
    }

    return (
        <VFormContent onChange={handleChange}>
            <VRow unique>
                <VUploadPhoto
                    name='photo'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow unique>
                <VTextField
                    name='fullName'
                    label_icon={<IconPerson {...icon_props('fullName')} />}
                    label='Nome completo'
                    placeholder='Digite seu nome'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow unique>
                <VTextField
                    name='email'
                    label_icon={<IconEmail {...icon_props('email', .3)} />}
                    label='Email'
                    placeholder='exemplo@email.com'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VTextField
                    xs={5}
                    name='cep'
                    label_icon={<IconLocation {...icon_props('cep')} />}
                    label='CEP'
                    placeholder='NNNNN-NNN'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={6.7}
                    name='cpf'
                    label_icon={<IconIdentity {...icon_props('cpf')} />}
                    label='CPF'
                    placeholder='NNN.NNN.NNN-NN'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VSelect
                    xs={6.7}
                    name='specialization'
                    label_icon={<IconPositionForm {...icon_props('specialization', .3)} />}
                    label='Cargo'
                    placeholder='Selecione'
                    items={[
                        { value: 'Fonoaudiólogo(a)', label: 'Fonoaudiólogo(a)'},
                        { value: 'Psicólogo(a)', label: 'Psicólogo(a)'},
                        { value: 'Pedagogo(a)', label: 'Pedagogo(a)'},
                        { value: 'Terapeuta Ocupacional', label: 'Terapeuta Ocupacional'}
                    ]}
                    disabled={disabledForm}
                />
                <VTextField
                    xs={5}
                    name='phone'
                    label_icon={<IconPhone {...icon_props('phone')} />}
                    label='Celular'
                    placeholder='(NN) NNNNN-N...'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VTextField
                    xs={3}
                    name='state'
                    label_icon={<IconAttention {...icon_props('state')} />}
                    label='UF'
                    placeholder='Estado'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={8.7}
                    name='city'
                    label_icon={<IconCity {...icon_props('city')} />}
                    label='Cidade'
                    placeholder='Cidade'
                    disabled={disabledForm}
                />
            </VRow>
        </VFormContent>
    )

};