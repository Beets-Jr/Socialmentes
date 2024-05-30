import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useTheme } from "@mui/material";

import { msg_errors, RegistrationsMiddleware, RegistrationsService } from "./services";
import { IconClose, IconListAdd } from "./assets/icons";
import { VForm, VMessageError } from "./forms";
import { FirstForm, SecondForm, Success } from './steps';

import './styles/AddRegister.css';

function AddRegister({ openDialog, handleClose, setRegisterCreated }) {

    const formRef = useRef(null); // referência do componente de formulário

    const [step, setStep] = useState(0); // etapa do cadastro (escolher categoria, formulário...)
    const [disabledForm, setDisabledForm] = useState(false); // disabilita os campos do formulário quando ele é submitado
    const [disabledButton, setDisabledButton] = useState(true); // informa se o usuário pode clicar em prosseguir
    const [message, setMessage] = useState(''); // mensagem de erro exibida no Form
    const [createResult, setCreateResult] = useState(); // o usuário foi criado com sucesso?

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
        if (step === 0) {
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
        } else if (step === 1) {
            RegistrationsMiddleware.thirdStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false })
                .then( () => {
                    formRef.current.submitForm();
                })
                .catch( errors => {
                    if (errors.errors.some(error => error === msg_errors.REQUIRED)) {
                        setMessage(msg_errors.REQUIRED);
                    } else {
                        setMessage(errors.errors[0]);
                    }
                    setDisabledForm(false);
                })
        }
    };

    // função executada ao terminar o cadastro
    const handleSubmit = (validatedData) => {
        const treatData = RegistrationsMiddleware.treatValidatedData(validatedData);

        RegistrationsService.createRegister(treatData)
            .then( result => {
                if (result instanceof Error) {
                    setCreateResult({
                        code: 'error',
                        msg: result == 'Error: auth/email-already-in-use' ? 'Já existe um cadastro com o email informado!' : 'Erro ao cadastrar'
                    });
                    setStep( oldStep => oldStep + 1 );
                    setDisabledButton(true);
                    setTimeout(() => {
                        handleClose();
                    }, 5000);
                } else {
                    setCreateResult({
                        code: 'ok',
                        msg: 'Cadastrado com sucesso!'
                    });
                    setStep( oldStep => oldStep + 1 );
                    setDisabledButton(true);
                    setTimeout(() => {
                        setRegisterCreated(oldValue => !oldValue);
                        handleClose();
                    }, 2000);
                }
            })
            .catch( error => {
                console.log(error);
                setMessage('Erro ao cadastrar usuário no banco de dados')
            })
            .finally( () => {
                setDisabledForm(false);
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
                        <FirstForm
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : step === 1 ? (
                        <SecondForm
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                        />
                    ) : (
                        <Success status={createResult} />
                    )}
                </VForm>
            </DialogContent>

            {/** Stepper e Botão de prosseguir */}
            <DialogActions className='dialogActions'>
                <Box className='stepper'>
                    { [0, 1].map( i => (
                        <Box key={i} className={i === step ? 'stepActive' : 'stepBase'} />
                    ))}
                </Box>

                <Button
                    className={`buttonBase ${disabledButton ? 'buttonDisabled' : "buttonEnabled"}`}
                    variant="outlined"
                    type="button"
                    onClick={ () => disabledForm ? null :  handleProceed() }
                >
                    <IconListAdd
                        color={disabledButton ? '#D7D7D7' : '#ffffff'}
                        sx={{ mr: 2 }}
                    />
                    {step === 1 ? 'Cadastrar' : 'Prosseguir'}
                </Button>
            </DialogActions>

            {/** Mensagem de erro e sucesso */}
            <VMessageError message={message} setMessage={setMessage} />

        </Dialog>
    );

}

export default AddRegister;