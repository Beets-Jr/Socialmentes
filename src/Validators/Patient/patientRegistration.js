import * as Yup from 'yup';
import { msg_errors } from './validationMessages';

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg_errors.CPF).required(msg_errors.REQUIRED),
  rg: Yup.string().min(3, msg_errors.RG).required(msg_errors.REQUIRED),
  birth: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, msg_errors.BIRTH).matches(/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/, msg_errors.INVALID_BIRTH).required(msg_errors.REQUIRED),
  responsible: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  obs: Yup.string().required(msg_errors.REQUIRED), // Obrigatório?
  cep: Yup.string().matches(/^\d{5}-\d{3}$/, msg_errors.CEP).required(msg_errors.REQUIRED),
  uf: Yup.string().matches(/^[a-zA-Z]{2}$/, msg_errors.UF).required(msg_errors.REQUIRED),
  city: Yup.string().min(3, msg_errors.CITY).required(msg_errors.REQUIRED),
  neighborhood: Yup.string().min(3, msg_errors.NEIGHBORHOOD).required(msg_errors.REQUIRED),
  street: Yup.string().min(3, msg_errors.STREET).required(msg_errors.REQUIRED),
  number: Yup.string().matches(/^\d+$/, msg_errors.NUMBER).required(msg_errors.REQUIRED),
  complement: Yup.string().min(3, msg_errors.ADDRESSDETAILS).required(msg_errors.REQUIRED),
  kinship1: Yup.string().required(msg_errors.REQUIRED),
  name1: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  cpf1: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg_errors.CPF).required(msg_errors.REQUIRED),
  rg1: Yup.string().min(3, msg_errors.RG).required(msg_errors.REQUIRED),
  cell1: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, msg_errors.PHONE).required(msg_errors.REQUIRED),
  email1: Yup.string().email(msg_errors.EMAIL).required(msg_errors.REQUIRED),
  birth1: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, msg_errors.BIRTH).matches(/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/, msg_errors.INVALID_BIRTH).required(msg_errors.REQUIRED),
  kinship2: Yup.string().required(msg_errors.REQUIRED),
  name2: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  cpf2: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg_errors.CPF).required(msg_errors.REQUIRED),
  rg2: Yup.string().min(3, msg_errors.RG).required(msg_errors.REQUIRED),
  cell2: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, msg_errors.PHONE).required(msg_errors.REQUIRED),
  email2: Yup.string().email(msg_errors.EMAIL).required(msg_errors.REQUIRED),
  birth2: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, msg_errors.BIRTH).matches(/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/, msg_errors.INVALID_BIRTH).required(msg_errors.REQUIRED),
  school: Yup.string().min(3, msg_errors.SCHOOL_NAME).required(msg_errors.REQUIRED),
  seriesSchool: Yup.string().matches(/^\d{1,2}$/, msg_errors.SERIES).required(msg_errors.REQUIRED),
  phoneSchool: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, msg_errors.PHONE).required(msg_errors.REQUIRED),
  mailSchool: Yup.string().email(msg_errors.EMAIL).required(msg_errors.REQUIRED),
  responsibleSchool: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),

  externalAccompaniments: Yup.array().of(
    Yup.object().shape({
      professional: Yup.string().required(msg_errors.REQUIRED),
      name: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
      phone: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, msg_errors.PHONE).required(msg_errors.REQUIRED),
      email: Yup.string().email(msg_errors.EMAIL).required(msg_errors.REQUIRED),
    })
  ),

  interventionTeams: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(msg_errors.REQUIRED),
    })
  ),

});

export const validateField = async (name, value) => {
  try {
    await Yup.reach(validationSchema, name).validate(value);
    return null;
  } catch (err) {
    return err.message;
  }
};