import * as yup from 'yup';
import { msg_errors } from './validationMessages';

const secondStepValidationSchema = yup.object({
    photo: yup
        .mixed()
        .test( 'fileExists', msg_errors.PHOTO,  (photo) => photo instanceof File )
        .required(msg_errors.REQUIRED),
    fullName: yup
        .string()
        .min(3, msg_errors.FULLNAME)
        .required(msg_errors.REQUIRED),
    email: yup
        .string()
        .email(msg_errors.EMAIL)
        .required(msg_errors.REQUIRED),
    cep: yup
        .string()
        .matches(/^\d{5}-\d{3}$/, msg_errors.CEP)
        .required(msg_errors.REQUIRED),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg_errors.CPF)
        .required(msg_errors.REQUIRED),
    position: yup
        .mixed()
        .oneOf(['speech_therapist', 'psychologist', 'pedagogue', 'occupational_therapist'], msg_errors.POSITION)
        .required(msg_errors.REQUIRED),
    phone: yup
        .string()
        .matches(/^\(\d{2}\) ?\d{5}-\d{4}$/, msg_errors.PHONE)
        .required(msg_errors.REQUIRED),
    state: yup
        .string()
        .length(2, msg_errors.STATE)
        .required(msg_errors.REQUIRED),
    city: yup
        .string()
        .min(3, msg_errors.CITY)
        .required(msg_errors.REQUIRED)
});

const thirdStepValidationSchema = yup.object({});

const treatValidatedData = ({ cpf, phone, ...validatedData }) => {

    const treatedCpf = cpf.replace(/\.|-/g, '');
    const treatedPhone = phone.replace(/[-() ]/g, '');

    return {
        cpf: treatedCpf,
        phone: treatedPhone,
        ...validatedData
    }

};

export const RegistrationsMiddleware = {
    secondStepValidationSchema,
    thirdStepValidationSchema,
    treatValidatedData
};