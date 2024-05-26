import { useMemo, useState } from "react";
import { Typography, useTheme } from "@mui/material";

import { IconAttention, IconBank, IconIdentity } from "../assets/icons";
import { VFormContent } from "../forms";

export const SecondForm = ({ formRef, disabledForm, setDisabledButton }) => {

    const theme = useTheme();
    const darkGray = theme.palette.secondary.dark;
    const blue = theme.palette.primary.main;

    const [currentField, setCurrentField] = useState();

    // propriedades passadas nos ícones
    function icon_props(field, mt) {
        const fieldValue = formRef.current.getData()[field];
        return {
            fontSize: 'inherit',
            color: (fieldValue || field === currentField) ? blue : darkGray,
            sx: {
                mt: mt ? mt : .2,
            }
        };
    }

    const itemsThirdStep = useMemo(() => {
        return [
            [ // Foto do usuário
                {
                    xs: 12,
                    type: 'photo',
                    name: 'photo',
                    defaultValue: formRef.current.getData().photo
                }
            ],
            [ // Bairro
                {
                    xs: 12,
                    type: 'text',
                    name: 'neighborhood',
                    label_icon: <IconAttention {...icon_props('neighborhood')} />,
                    label: 'Bairro',
                    placeholder: 'Digite o nome do seu bairro'
                },
            ],
            [ // Logradouro
                {
                    xs: 12,
                    type: 'text',
                    name: 'publicPlace',
                    label_icon: <IconAttention {...icon_props('publicPlace')} />,
                    label: 'Logradouro',
                    placeholder: 'Digite o nome da sua rua'
                },
            ],
            [ // Número e Complemento
                {
                    xs: 4.5,
                    type: 'text',
                    name: 'number',
                    label_icon: <Typography variant="inherit" color={darkGray} fontWeight={700}>123</Typography>,
                    label: 'Número',
                    placeholder: 'NNN'
                },
                {
                    xs: 7,
                    type: 'text',
                    name: 'addressDetails',
                    label_icon: <IconIdentity {...icon_props('addressDetails')} />,
                    label: 'Complemento',
                    placeholder: 'Digite o complemento'
                }
            ],
            [ // Banco e Agência
                {
                    xs: 5.9,
                    type: 'select',
                    name: 'bank',
                    label_icon: <IconBank {...icon_props('bank')} />,
                    label: 'Banco',
                    placeholder: 'Selecione',
                    items: [ // ATUALIZAR!!!!!!!!
                        {value: '1', label: '1'}
                    ]
                },
                {
                    xs: 5.6,
                    type: 'text',
                    name: 'branch',
                    label_icon: <IconAttention {...icon_props('branch')} />,
                    label: 'Agência',
                    placeholder: 'Digite sua agência'
                }
            ],
            [ // Conta e Chave-pix
                {
                    xs: 5.9,
                    type: 'text',
                    name: 'account',
                    label_icon: <IconAttention {...icon_props('account')} />,
                    label: 'Conta',
                    placeholder: 'Digite sua conta',
                },
                {
                    xs: 5.6,
                    type: 'text',
                    name: 'pix',
                    label_icon: <IconAttention {...icon_props('pix')} />,
                    label: 'Chave-pix',
                    placeholder: 'Digite seu pix'
                }
            ]
        ]
    }, [currentField]);

    return (
        <VFormContent
            formRef={formRef}
            setCurrentField={setCurrentField}
            disabledForm={disabledForm}
            setDisabledButton={setDisabledButton}
            items={itemsThirdStep}
        />
    )

};