import * as Yup from 'yup';
import { msg_errors } from './validationMessages';


export const validationSchema = Yup.object().shape({
  coordinator_sr: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  coordinator_jr: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),
  start_ABA: Yup.string().min(3, msg_errors.NAME).required(msg_errors.REQUIRED),

  activities: Yup.array().of(
    Yup.object().shape({
      typePlay: Yup.string().required(msg_errors.REQUIRED),
      place: Yup.string().required(msg_errors.REQUIRED),
      goals: Yup.string().required(msg_errors.REQUIRED),
    })
  ),

  cronogram: Yup.array().of(
    Yup.object().shape({
      hour: Yup.string().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, msg_errors.HOUR).required(msg_errors.REQUIRED),
      professionalId: Yup.string().required(msg_errors.REQUIRED),
      dayWeek: Yup.array().of(Yup.string().required(msg_errors.REQUIRED)).min(1, "Precisa ter no minimo um dia da semana"),
    })
  ),


  goals: Yup.array().of(
    Yup.object().shape({
      subGoals: Yup.array()
        .of(Yup.string().required(msg_errors.REQUIRED)) // Valida cada subGoal como string não vazia
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