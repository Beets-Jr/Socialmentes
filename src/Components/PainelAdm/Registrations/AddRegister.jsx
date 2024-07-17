/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";

import { RegistrationsMiddleware, msg_errors } from '../../../Database/Middleware';
import { UserService } from '../../../Services';
import { IconClose, IconListAdd } from "./assets/icons";
import { VForm, VMessageError } from "./forms";
import { AddEmail, FirstForm, SecondForm, Success } from './steps';

import './styles/AddRegister.css';

function AddRegister({ openDialog, handleClose, setRegisterCreated }) {

    const formRef = useRef(null); // referência do componente de formulário

    const [step, setStep] = useState(0); // etapa do cadastro (escolher categoria, formulário...)
    const [emails, setEmails] = useState(['']);
    const [disabledForm, setDisabledForm] = useState(false); // disabilita os campos do formulário quando ele é submitado
    const [disabledButton, setDisabledButton] = useState(true); // informa se o usuário pode clicar em prosseguir
    const [message, setMessage] = useState(''); // mensagem de erro exibida no Form
    const [createResult, setCreateResult] = useState(); // o usuário foi criado com sucesso?

    const isMobile = useMediaQuery('(max-width:700px)');

    // ao abrir e fechar o Dialog
    useEffect(() => {
        setTimeout( () => {
            setStep(0);
            setEmails(['']);
            setDisabledForm(false);
            setDisabledButton(true);
        }, 100);
        setMessage('');
    }, [openDialog]);

    // função executada nas etapas intermediárias e antes de salvar os dados no banco
    const handleProceed = () => {
        setDisabledForm(true);
        if (step === 0) {
            RegistrationsMiddleware.firstStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false } )
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
            const data = { emails, photo: formRef.current.getFieldValue('photo') };
            RegistrationsMiddleware.secondStepValidationSchema.validate( data, { abortEarly: false } )
                .then( () => {
                    formRef.current.setFieldValue('email', emails);
                    setDisabledButton(true);
                    setStep( oldStep => oldStep + 1 );
                })
                .catch( errors => {
                    setMessage(errors.errors[0]);
                })
                .finally( () => {
                    setDisabledForm(false)
                });
        } else if (step === 2) {
            RegistrationsMiddleware.thirdStepValidationSchema.validate( formRef.current.getData(), { abortEarly: false } )
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

        UserService.createUser(treatData)
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
            <Box className='containerTitle' >
                <DialogTitle variant="h2" fontSize={isMobile ? 24 : 32}>
                    Adicionar cadastro
                </DialogTitle>

                <IconButton className="buttonClose" onClick={ () => handleClose() } >
                    <IconClose color='var(--color-gray-3)'/>
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
                            isMobile={isMobile}
                        />
                    ) : step === 1 ? (
                        <AddEmail
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                            emails={emails}
                            setEmails={setEmails}
                            isMobile={isMobile}
                        />
                    ) : step === 2 ? (
                        <SecondForm
                            disabledForm={disabledForm}
                            setDisabledButton={setDisabledButton}
                            isMobile={isMobile}
                        />
                    ) : (
                        <Success status={createResult} />
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
                    <IconListAdd
                        color={disabledButton ? 'var(--color-gray-2)' : 'white'}
                        sx={{ mr: 2 }}
                        fontSize={ isMobile ? 'small' : undefined }
                    />
                    {step === 2 ? 'Cadastrar' : 'Prosseguir'}
                </Button>
            </DialogActions>

            {/** Mensagem de erro e sucesso */}
            <VMessageError message={message} setMessage={setMessage} isMobile={isMobile} />

        </Dialog>
    );

}

export default AddRegister;