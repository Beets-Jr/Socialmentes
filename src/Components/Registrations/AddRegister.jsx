import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useTheme } from "@mui/material";
import { PlaylistAddRounded } from "@mui/icons-material";

import { ERRORS, RegistrationsMiddleware, RegistrationsService } from "./services";
import { IconAttention, IconCity, IconClose, IconEmail, IconIdentity, IconLocation, IconPerson, IconPhone, IconPositionForm } from "./assets/icons";
import { VForm } from "./forms";
import ChooseCategory from "./ChooseCategory";
import Form from "./Form";

import './styles/AddRegister.css';

function AddRegister({ openDialog, handleClose, setRegisterCreated }) {

    const formRef = useRef(null); // referência do componente de formulário

    const [step, setStep] = useState(0); // etapa do cadastro (escolher categoria, formulário...)
    const [disabledForm, setDisabledForm] = useState(false); // disabilita os campos do formulário quando ele é submitado
    const [disabledButton, setDisabledButton] = useState(true); // informa se o usuário pode clicar em prosseguir
    const [message, setMessage] = useState(''); // mensagem de erro exibida no Form

    // ao abrir e fechar o Dialog
    useEffect(() => {
        setTimeout( () => {
            setStep(0);
            setDisabledButton(true);
        }, 100);
        setMessage('');
    }, [openDialog]);

    // função executada nas etapas intermediárias e antes de salvar os dados no banco
    const handleProceed = () => {
        if (step == 0) {
            setDisabledButton(true);
            setStep( oldStep => oldStep + 1 );
        } else if (step == 1) {
            RegistrationsMiddleware.secondStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false })
                .then( () => {
                    setDisabledButton(true);
                    setStep( oldStep => oldStep + 1 );
                })
                .catch( errors => {
                    if (errors.errors.filter(error => error === ERRORS.REQUIRED).length >= 0) {
                        setMessage(ERRORS.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }
                    setDisabledForm(false);
                    return;
                });
        } else if (step == 2) {
            RegistrationsMiddleware.thirdStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false })
                .then( () => formRef.current.submitForm() )
                .catch( errors => {
                    if (errors.errors.filter(error => error === ERRORS.REQUIRED).length >= 0) {
                        setMessage(ERRORS.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }
                    setDisabledForm(false);
                    return;
                });
        }
    };

    // função executada ao terminar o cadastro
    const handleSubmit = (validatedData) => {
        const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);

        RegistrationsService.createRegister(treatData)
            .then(result => {
                if (result instanceof Error) {
                    setMessage(result);
                } else {
                    setRegisterCreated(oldValue => !oldValue);
                    setMessage('Cadastro criado com sucesso!');
                }
            });
    };

    // propriedades passadas nos ícones
    const icon_props = {
        fontSize: 'inherit',
        color: useTheme().palette.secondary.dark,
        sx: { mt: .2 }
    }

    // campos do formulário da segunda etapa
    const itemsSecondStep = [
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
                label_icon: <IconPerson {...icon_props} />,
                label: 'Nome completo',
                placeholder: 'Digite seu nome'
            },
        ],
        [ // Email do usuário
            {
                xs: 12,
                type: 'text',
                name: 'email',
                label_icon: <IconEmail {...icon_props} sx={{ mt: .3 }} />,
                label: 'Email',
                placeholder: 'exemplo@email.com'
            },
        ],
        [ // CEP e CPF
            {
                xs: 5,
                type: 'text',
                name: 'cep',
                label_icon: <IconLocation {...icon_props} />,
                label: 'CEP',
                placeholder: 'NNNNN-NNN'
            },
            {
                xs: 6.5,
                type: 'text',
                name: 'cpf',
                label_icon: <IconIdentity {...icon_props} />,
                label: 'CPF',
                placeholder: 'NNN.NNN.NNN-NN'
            }
        ],
        [ // Cargo e celular
            {
                xs: 6.5,
                type: 'select',
                name: 'position',
                label_icon: <IconPositionForm {...icon_props} sx={{ mt: .3 }} />,
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
                xs: 5,
                type: 'text',
                name: 'phone',
                label_icon: <IconPhone {...icon_props} />,
                label: 'Celular',
                placeholder: '(NN) NNNNNN-NNNN'
            }
        ],
        [ // Estado e Cidade
            {
                xs: 3,
                type: 'text',
                name: 'state',
                label_icon: <IconAttention {...icon_props} />,
                label: 'UF',
                placeholder: 'Estado',
            },
            {
                xs: 8.5,
                type: 'text',
                name: 'city',
                label_icon: <IconCity {...icon_props} />,
                label: 'Cidade',
                placeholder: 'Cidade'
            }
        ]
    ];

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
            fullWidth
        >

            {/** Título e botão de fechar o Dialog */}
            <Box  className='containerTitle' >
                <DialogTitle variant="h2" className="title">
                    Adicionar cadastro
                </DialogTitle>

                <IconButton className="buttonClose" onClick={ () => handleClose() } >
                    <IconClose color={useTheme().palette.secondary.main}/>
                </IconButton>
            </Box>

            {/** Conteúdo do dialogo, alterado em cada etapa */}
            <DialogContent>
                <VForm
                    ref={formRef}
                    onSubmit={ (data) => handleSubmit(data) }
                    encType="multipart/form-data"
                >
                    { step === 0 ? (
                        <ChooseCategory
                            setDisabledButton={setDisabledButton}
                        />
                    ) : step === 1 ? (
                        <Form
                            formRef={formRef}
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                            items={itemsSecondStep}
                        />
                    ) : (
                        <br />
                    ) }
                </VForm>
            </DialogContent>

            {/** Botão de prosseguir */}
            <DialogActions sx={{ textAlign: 'center', py: 2 }}>
                {/** textAlign='center' py={2} */}
                <Button
                    sx={{ textTransform: 'none' }}
                    variant="outlined"
                    type="button"
                    disabled={disabledButton}
                    onClick={ () => handleProceed() }
                >
                    <PlaylistAddRounded /> Prosseguir
                </Button>
            </DialogActions>

            {/** Mensagem de erro e sucesso */}
            <Box>
                {message}
            </Box>

        </Dialog>
    );

}

export default AddRegister;