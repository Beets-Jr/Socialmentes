import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useTheme } from "@mui/material";

import { msg_errors, RegistrationsMiddleware, RegistrationsService } from "./services";
import { IconClose, IconListAdd } from "./assets/icons";
import { VForm, VFormContent, VMessageError, VRow, VTextField } from "./forms";
import { ChooseCategory, FirstForm, SecondForm } from './steps';

import './styles/AddRegister.css';
import { Form } from "@unform/web";

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
        setDisabledForm(false);
        console.log(formRef.current.getData());
        if (step == 0) {
            if (formRef.current.getFieldValue('category')) {
                setDisabledButton(true);
                setStep( oldStep => oldStep + 1 );
            } else {
                setMessage('Escolha uma das opções para prosseguir');
            }
            setDisabledForm(false);
        } else if (step == 1) {
            RegistrationsMiddleware.secondStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false })
                .then( () => {
                    setDisabledButton(true);
                    setStep( oldStep => oldStep + 1 );
                })
                .catch( errors => {
                    if (errors.errors.some(error => error === msg_errors.REQUIRED)) {
                        setMessage(msg_errors.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }
                })
                .finally( () => {
                    setDisabledForm(false)
                });
        } else if (step == 2) {
            RegistrationsMiddleware.thirdStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false })
                .then( () => {
                    console.log(formRef.current.getData());
                    // formRef.current.submitForm()
                })
                .catch( errors => {
                    if (errors.errors.some(error => error === msg_errors.REQUIRED)) {
                        setMessage(msg_errors.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }
                    setDisabledForm(false);
                })
                .finally( () => {
                    setDisabledForm(false);
                });
        }
    };

    // função executada ao terminar o cadastro
    const handleSubmit = (validatedData) => {
        const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);

        RegistrationsService.createRegister(treatData)
            .then( result => {
                if (result instanceof Error) {
                    setMessage(result);
                } else {
                    setRegisterCreated(oldValue => !oldValue);
                    setMessage('Cadastro criado com sucesso!');
                }
            })
            .catch( error => {
                console.log(error);
                setMessage('Erro ao cadastrar usuário no banco de dados')
            });
    };

    // campos do formulário da terceira etapa
    // const itemsThirdStep = [];

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
                {/* <VForm
                    defaultValues={{
                        name: 'teste'
                    }}
                    onSubmit={(data)=>console.log(data)}
                >
                    <VFormContent
                        onChange={(data) => {
                            if (data.name && data.email) {
                                setDisabledButton(false);
                            }
                        }}
                    >
                        <VRow unique={true}>
                            <VTextField
                                name='name'
                                label='Nome'
                            />
                        </VRow>
                        <VRow unique={true}>
                            <VTextField
                                name='email'
                                label='Email'
                            />
                        </VRow>
                        <VRow unique={true}>
                            <Button type="submit">Submit</Button>
                        </VRow>
                    </VFormContent>
                </VForm> */}
                <VForm
                    ref={formRef}
                    onSubmit={ (data) => handleSubmit(data) }
                >
                    { step === 0 ? (
                        <ChooseCategory
                            setDisabledButton={setDisabledButton}
                        />
                    ) : step === 1 ? (
                        <FirstForm
                            formRef={formRef}
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : (
                        <SecondForm
                            formRef={formRef}
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) }
                </VForm>
            </DialogContent>

            {/** Stepper e Botão de prosseguir */}
            <DialogActions className='dialogActions'>
                <Box className='stepper'>
                    { [0, 1, 2].map( i => (
                        <Box key={i} className={i === step ? 'stepActive' : 'stepBase'} />
                    ))}
                </Box>

                <Button
                    className={`buttonBase ${disabledButton ? 'buttonDisabled' : "buttonEnabled"}`}
                    variant="outlined"
                    type="button"
                    onClick={ () => handleProceed() }
                >
                    {step > 0 && (
                        <IconListAdd color={disabledButton ? '#D7D7D7' : '#ffffff'} sx={{ mr: 2 }} />
                    )}
                    {step === 2 ? 'Cadastrar' : 'Prosseguir'}
                </Button>
            </DialogActions>

            {/** Mensagem de erro e sucesso */}
            <VMessageError message={message} setMessage={setMessage} />

        </Dialog>
    );

}

export default AddRegister;