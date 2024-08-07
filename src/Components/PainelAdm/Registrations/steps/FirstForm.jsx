/* eslint-disable react/prop-types */

import { IconAttention, IconCity, IconIdentity, IconLocation, IconPerson, IconPhone, IconPositionForm } from "../assets/icons";
import { VFormContent, VRow, VSelect, VTextField, VUploadPhoto, useVFormContext } from "../forms";

export const FirstForm = ({ disabledForm, setDisabledButton, isMobile }) => {

    const { getFieldValue, focusedField } = useVFormContext();

    const fieldsRequireds = [
        'photo',
        'fullName',
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

    // propriedades passadas nos ícones
    const icon_props = (field, mt) => {
        const fieldValue = getFieldValue(field);
        return {
            fontSize: 'inherit',
            color: (fieldValue || field === focusedField) ? 'var(--color-blue-3)' : 'var(--color-gray-4)',
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
            <VRow isMobile={isMobile}>
                <VTextField
                    xs={isMobile ? 12 : 5}
                    name='cep'
                    label_icon={<IconLocation {...icon_props('cep')} />}
                    label='CEP'
                    placeholder='NNNNN-NNN'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={isMobile ? 12 : 6.7}
                    name='cpf'
                    label_icon={<IconIdentity {...icon_props('cpf')} />}
                    label='CPF'
                    placeholder='NNN.NNN.NNN-NN'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow isMobile={isMobile}>
                <VSelect
                    xs={isMobile ? 12 : 6.7}
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
                    xs={isMobile ? 12 : 5}
                    name='phone'
                    label_icon={<IconPhone {...icon_props('phone')} />}
                    label='Celular'
                    placeholder='(NN) NNNNN-N...'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow isMobile={isMobile}>
                <VTextField
                    xs={isMobile ? 12 : 3}
                    name='state'
                    label_icon={<IconAttention {...icon_props('state')} />}
                    label='UF'
                    placeholder='Estado'
                    disabled={disabledForm}
                />
                <VTextField
                    xs={isMobile ? 12 : 8.7}
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