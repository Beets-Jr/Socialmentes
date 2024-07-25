/* eslint-disable react/prop-types */

import { Typography } from "@mui/material";

import { banks } from "../../../../Database/Middleware";
import { IconAttention, IconBank, IconIdentity } from "../assets/icons";
import { VFormContent, VRow, VSelect, VTextField, VUploadPhoto, useVFormContext } from "../forms";

export const SecondForm = ({ disabledForm, setDisabledButton, isMobile }) => {

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

    // propriedades passadas nos ícones
    const icon_props = (field, mt) => {
        const fieldValue = getFieldValue(field);
        return {
            fontSize: 'inherit',
            color: (fieldValue || field === focusedField) ? 'var(--color-blue-3)' : 'var(--color-gray-4',
            sx: {
                mt: mt ? mt : .2,
            }
        };
    }

    return (
        <VFormContent onChange={handleChange} isMobile={isMobile}>
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
            <VRow isMobile={isMobile}>
                <VTextField
                    xs={isMobile ? 12 : 4.5}
                    name='number'
                    label_icon={<Typography variant="inherit" color={getFieldValue('number') || focusedField === 'number' ? 'var(--color-blue-3)' : 'var(--color-gray-4'} fontWeight={700}>123</Typography>}
                    label='Número'
                    placeholder='NNN'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={isMobile ? 12 : 7}
                    name='addressDetails'
                    label_icon={<IconIdentity {...icon_props('addressDetails')} />}
                    label='Complemento'
                    placeholder='Digite o complemento'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow isMobile={isMobile}>
                <VSelect
                    xs={isMobile ? 12 : 6.5}
                    name='bank'
                    label_icon={<IconBank {...icon_props('bank')} />}
                    label='Banco'
                    placeholder='Selecione'
                    items={banks}
                    disabled={disabledForm}
                />
                <VTextField
                    xs={isMobile ? 12 : 5}
                    name='branch'
                    label_icon={<IconAttention {...icon_props('branch')} />}
                    label='Agência'
                    placeholder='Digite sua agê...'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow isMobile={isMobile}>
                <VTextField
                    xs={isMobile ? 12 : 5.9}
                    name='account'
                    label_icon={<IconAttention {...icon_props('account')} />}
                    label='Conta'
                    placeholder='Digite sua conta'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={isMobile ? 12 : 5.6}
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