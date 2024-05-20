import * as yup from 'yup';
import { ERRORS } from './validationMessages';

const formValidationSchema = yup.object({
    photo: yup
        .mixed()
        .test( 'fileExists', ERRORS.PHOTO,  (photo) => photo instanceof File )
        .required(ERRORS.PHOTO),
    fullName: yup
        .string()
        .min(3, ERRORS.NAME)
        .required(ERRORS.REQUIRED),
    email: yup
        .string()
        .email(ERRORS.EMAIL)
        .required(ERRORS.REQUIRED),
    dateOfBirth: yup
        .string()
        .matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/, ERRORS.DATE)
        .required(ERRORS.REQUIRED),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, ERRORS.CPF)
        .required(ERRORS.REQUIRED),
    phone: yup
        .string()
        .matches(/^\(\d{2}\) ?\d{4,5}-\d{4}$/, ERRORS.PHONE)
        .required(ERRORS.REQUIRED),
    gender: yup
        .mixed()
        .oneOf(['female', 'male', 'other'], ERRORS.GENDER)
        .defined()
        .required(ERRORS.REQUIRED)
});

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
    formValidationSchema,
    treatValidatedData
};