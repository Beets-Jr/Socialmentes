import { useMemo } from "react";
import { useTheme } from "@mui/material";

import { IconAttention, IconCity, IconEmail, IconIdentity, IconLocation, IconPerson, IconPhone, IconPositionForm } from "../assets/icons";
import { VFormContent, VRow, VSelect, VTextField, useVFormContext } from "../forms";

export const FirstForm = ({ formRef, disabledForm, setDisabledButton }) => {

    const theme = useTheme();
    const darkGray = theme.palette.secondary.dark;
    const blue = theme.palette.primary.main;

    const { getFieldValue, focusedField } = useVFormContext();

    // propriedades passadas nos ícones
    function icon_props(field, mt) {
        const fieldValue = getFieldValue(field);
        return {
            fontSize: 'inherit',
            color: (fieldValue || field === focusedField) ? blue : darkGray,
            sx: {
                mt: mt ? mt : .2,
            }
        };
    }

    const itemsSecondStep = useMemo(() => {
        return [
            [ // Foto do usuário
                {
                    xs: 12,
                    type: 'photo',
                    name: 'photo'
                }
            ],
            [ // Nome completo
                {
                    xs: 12,
                    type: 'text',
                    name: 'fullName',
                    label_icon: <IconPerson {...icon_props('fullName')} />,
                    label: 'Nome completo',
                    placeholder: 'Digite seu nome'
                },
            ],
            [ // Email do usuário
                {
                    xs: 12,
                    type: 'text',
                    name: 'email',
                    label_icon: <IconEmail {...icon_props('email', .3)} />,
                    label: 'Email',
                    placeholder: 'exemplo@email.com'
                },
            ],
            [ // CEP e CPF
                {
                    xs: 5,
                    type: 'text',
                    name: 'cep',
                    label_icon: <IconLocation {...icon_props('cep')} />,
                    label: 'CEP',
                    placeholder: 'NNNNN-NNN'
                },
                {
                    xs: 6.7,
                    type: 'text',
                    name: 'cpf',
                    label_icon: <IconIdentity {...icon_props('cpf')} />,
                    label: 'CPF',
                    placeholder: 'NNN.NNN.NNN-NN'
                }
            ],
            [ // Cargo e celular
                {
                    xs: 6.5,
                    type: 'select',
                    name: 'position',
                    label_icon: <IconPositionForm {...icon_props('position', .3)} />,
                    label: 'Cargo',
                    placeholder: 'Selecione',
                    items: [ // ATUALIZAR!!!!!!!!
                        { value: 'speech_therapist', label: 'Fonoaudiólogo(a)'},
                        { value: 'psychologist', label: 'Psicólogo(a)'},
                        { value: 'pedagogue', label: 'Pedagogo(a)'},
                        { value: 'occupational_therapist', label: 'Terapeuta Ocupacional'}
                    ]
                },
                {
                    xs: 5.2,
                    type: 'text',
                    name: 'phone',
                    label_icon: <IconPhone {...icon_props('phone')} />,
                    label: 'Celular',
                    placeholder: '(NN) NNNNN-N...'
                }
            ],
        ]
    }, [focusedField]);

    return (
        <VFormContent>
            <VRow>
                <VSelect
                    xs={6.5}
                    name='position'
                    label_icon={<IconPositionForm {...icon_props('position', .3)} />}
                    label='Cargo'
                    placeholder='Selecione'
                    items={[ // ATUALIZAR!!!!!!!!
                        { value: 'speech_therapist', label: 'Fonoaudiólogo(a)'},
                        { value: 'psychologist', label: 'Psicólogo(a)'},
                        { value: 'pedagogue', label: 'Pedagogo(a)'},
                        { value: 'occupational_therapist', label: 'Terapeuta Ocupacional'}
                    ]}
                />
                <VTextField
                    xs={5.2}
                    name='phone'
                    label_icon={<IconPhone {...icon_props('phone')} />}
                    label='Celular'
                    placeholder='(NN) NNNNN-N...'
                />
            </VRow>
            <VRow>
                <VTextField
                    xs={3}
                    name='state'
                    label_icon={<IconAttention {...icon_props('state')} />}
                    label='UF'
                    placeholder='Estado'
                />
                <VTextField
                    xs={8.7}
                    name='city'
                    label_icon={<IconCity {...icon_props('city')} />}
                    label='Cidade'
                    placeholder='Cidade'
                />
            </VRow>
        </VFormContent>
    )

};