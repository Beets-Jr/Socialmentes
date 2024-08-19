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
      hour: Yup.string().required(msg_errors.REQUIRED),
      professional: Yup.string().required(msg_errors.REQUIRED),
      dayWeek: Yup.array().of(Yup.string().required(msg_errors.REQUIRED)).min(1, "Precisa ter no minimo um dia da semana"),
    })
  ),


  goals: Yup.array().of(
    Yup.string().test('unique', msg_errors.DUPLICATE, function (value) {
      const { path, parent } = this;
      const index = path.split('[')[1].split(']')[0];
      const otherValues = parent.filter((_, i) => i != index);
      return !otherValues.includes(value);
    }).required(msg_errors.REQUIRED)
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