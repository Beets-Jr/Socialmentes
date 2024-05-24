import * as yup from 'yup';
import { ERRORS } from './validationMessages';

const secondStepValidationSchema = yup.object({
    photo: yup
        .mixed()
        .test( 'fileExists', ERRORS.PHOTO,  (photo) => photo instanceof File )
        .required(ERRORS.REQUIRED),
    fullName: yup
        .string()
        .min(3, ERRORS.NAME)
        .required(ERRORS.REQUIRED),
    email: yup
        .string()
        .email(ERRORS.EMAIL)
        .required(ERRORS.REQUIRED),
    cep: yup
        .string()
        .matches(/^\d{5}-\d{3}$/, ERRORS.DATE)
        .required(ERRORS.REQUIRED),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, ERRORS.CPF)
        .required(ERRORS.REQUIRED),
    position: yup
        .mixed()
        .oneOf(['speech_therapist', 'psychologist', 'pedagogue', 'occupational_therapist'], ERRORS.GENDER)
        .required(ERRORS.REQUIRED),
    phone: yup
        .string()
        .matches(/^\(\d{2}\) ?\d{5}-\d{4}$/, ERRORS.PHONE)
        .required(ERRORS.REQUIRED),
    state: yup
        .string()
        .length(2)
        .required(),
    city: yup
        .string()
        .min(3)
        .required()
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