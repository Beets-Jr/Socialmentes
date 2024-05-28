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
        .oneOf(['Fonoaudiólogo(a)', 'Psicólogo(a)', 'Pedagogo(a)', 'Terapeuta Ocupacional'], msg_errors.POSITION)
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

const thirdStepValidationSchema = yup.object({
    photo: yup
        .mixed()
        .test( 'fileExists', msg_errors.PHOTO, (photo) => photo instanceof File )
        .required(msg_errors.REQUIRED),
    neighborhood: yup
        .string()
        .min(3, msg_errors.NEIGHBORHOOD)
        .required(msg_errors.REQUIRED),
    street: yup
        .string()
        .min(3, msg_errors.STREET)
        .required(msg_errors.REQUIRED),
    number: yup
        .string()
        .matches(/^\d+$/, msg_errors.NUMBER)
        .required(msg_errors.REQUIRED),
    addressDetails: yup
        .string()
        .optional(),
    bank: yup
        .string()
        .length(3, msg_errors.BANK)
        .matches(/^\d+$/, msg_errors.BANK)
        .required(msg_errors.REQUIRED),
    branch: yup
        .string()
        .length(4, msg_errors.BRANCH)
        .matches(/^\d+$/, msg_errors.BRANCH)
        .required(msg_errors.REQUIRED),
    account: yup
        .string()
        .matches(/^\d+$/, msg_errors.ACCOUNT)
        .required(msg_errors.REQUIRED),
    pix: yup
        .string()
        .optional()
});

const treatValidatedData = ({ cpf, phone, state, city, neighborhood, street, number, cep, addressDetails, bank, branch, account, pix, ...validatedData }) => {

    const treatedCpf = cpf.replace(/\.|-/g, '');
    const treatedPhone = phone.replace(/[-() ]/g, '');
    const address = {
        state: state.toUpperCase(),
        city,
        neighborhood,
        street,
        number,
        cep,
        addressDetails
    };
    const bankData = {
        bank,
        branch,
        account,
        pix
    };

    return {
        ...validatedData,
        cpf: treatedCpf,
        phone: treatedPhone,
        address,
        bankData
    }

};

export const RegistrationsMiddleware = {
    secondStepValidationSchema,
    thirdStepValidationSchema,
    treatValidatedData
};