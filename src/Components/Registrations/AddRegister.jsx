import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useTheme } from "@mui/material";

import { msg_errors, RegistrationsMiddleware, RegistrationsService } from "./services";
import { IconClose, IconListAdd } from "./assets/icons";
import { VForm, VMessageError } from "./forms";
import { ChooseCategory, FirstForm, SecondForm, Success } from './steps';

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
        setDisabledForm(true);
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
                    setStep( oldStep => oldStep + 1 );
                    formRef.current.submitForm()
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
                    setTimeout(() => {
                        setRegisterCreated(oldValue => !oldValue);
                        handleClose();
                    }, 3000);
                }
            })
            .catch( error => {
                console.log(error);
                setMessage('Erro ao cadastrar usuário no banco de dados')
            });
    };

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
                >
                    { step === 0 ? (
                        <ChooseCategory
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : step === 1 ? (
                        <FirstForm
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : step === 2 ? (
                        <SecondForm
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : (
                        <Success />
                    )}
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
                    onClick={ () => disabledForm ? null :  handleProceed() }
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