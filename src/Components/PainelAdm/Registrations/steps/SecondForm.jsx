import { Typography, useTheme } from "@mui/material";

import { IconAttention, IconBank, IconIdentity } from "../assets/icons";
import { VFormContent, VRow, VSelect, VTextField, VUploadPhoto, useVFormContext } from "../forms";
import { banks } from "../../../../Database/Middleware";

export const SecondForm = ({ disabledForm, setDisabledButton }) => {

    const { getFieldValue, focusedField } = useVFormContext();

    const fieldsRequireds = [
        'photo',
        'neighborhood',
        'street',
        'number',
        'bank',
        'branch',
        'account'
    ];

    const handleChange = (data) => {
        if ([...Object.entries(data)].some(field => fieldsRequireds.includes(field[0]) && !field[1]))
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
                    defaultValue={getFieldValue('photo')}
                    disabled={disabledForm}
                />
            </VRow>
            <VRow unique>
                <VTextField
                    name='neighborhood'
                    label_icon={<IconAttention {...icon_props('neighborhood')} />}
                    label='Bairro'
                    placeholder='Digite o nome do seu bairro'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow unique>
                <VTextField
                    name='street'
                    label_icon={<IconAttention {...icon_props('street')} />}
                    label='Logradouro'
                    placeholder='Digite o nome da sua rua'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VTextField
                    xs={4.5}
                    name='number'
                    label_icon={<Typography variant="inherit" color={getFieldValue('number') || focusedField === 'number' ? blue : darkGray} fontWeight={700}>123</Typography>}
                    label='Número'
                    placeholder='NNN'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={7}
                    name='addressDetails'
                    label_icon={<IconIdentity {...icon_props('addressDetails')} />}
                    label='Complemento'
                    placeholder='Digite o complemento'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VSelect
                    xs={6.5}
                    name='bank'
                    label_icon={<IconBank {...icon_props('bank')} />}
                    label='Banco'
                    placeholder='Selecione'
                    items={banks}
                    disabled={disabledForm}
                />
                <VTextField
                    xs={5}
                    name='branch'
                    label_icon={<IconAttention {...icon_props('branch')} />}
                    label='Agência'
                    placeholder='Digite sua agê...'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow>
                <VTextField
                    xs={5.9}
                    name='account'
                    label_icon={<IconAttention {...icon_props('account')} />}
                    label='Conta'
                    placeholder='Digite sua conta'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={5.6}
                    name='pix'
                    label_icon={<IconAttention {...icon_props('pix')} />}
                    label='Chave-pix'
                    placeholder='Digite seu pix'
                    disabled={disabledForm}
                />
            </VRow>
        </VFormContent>
    )

};