import React, { useState } from 'react'
import { Grid, Box } from '@mui/material';
import styles from './PatientRegistration.module.css'
import STextField from '../../../Components/PainelAdm/PatientRegistration/STextField';
import SaveButton from '../../../Components/PainelAdm/PatientRegistration/SaveButton';
import ReturnButton from '../../../Components/PainelAdm/PatientRegistration/ReturnButton';
import { validationSchema, validateField } from '../../../Validators/Patient/patientRegistration';
import PersonalInfo from '../../../Components/PainelAdm/PatientRegistration/forms/PersonalInfo';
import ContactInfo from '../../../Components/PainelAdm/PatientRegistration/forms/ContactInfo';
import KinshipInfo from '../../../Components/PainelAdm/PatientRegistration/forms/KinshipInfo';
import ExternalAccompaniments from '../../../Components/PainelAdm/PatientRegistration/forms/ExternalAccompaniments';
import InterventionTeams from '../../../Components/PainelAdm/PatientRegistration/forms/InterventionTeams';
import SchoolInfo from '../../../Components/PainelAdm/PatientRegistration/forms/SchoolInfo';
import { addPatient, editPatient, getPatient, jsonToPatient } from '../../../Services/patientService';
import { useParams, useNavigate } from 'react-router-dom';


const initialValues = {
  name: '', cpf: '', rg: '', birth: '', responsible: '', obs: '', cep: '', uf: '', city: '', neighborhood: '', street: '', number: '', complement: '',
  kinship1: '', name1: '', cpf1: '', rg1: '', cell1: '', email1: '', birth1: '', kinship2: '', name2: '', cpf2: '', rg2: '', cell2: '', email2: '', birth2: '',
  school: '', seriesSchool: '', phoneSchool: '', mailSchool: '', responsibleSchool: '',
  externalAccompaniments: [{ professional: '', name: '', phone: '', email: '' }],
  interventionTeams: [''],
};

const PatientRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);


  React.useEffect(() => { // Lógica para preencher os campos com os dados do paciente
    if (id) {
      getPatient(id).then((patient) => {
        setValues(jsonToPatient(patient));
      });
    }
  }, [id]);

  const handleChange = async (event) => { // Lógica para atualizar os valores dos campos
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    if (isSubmitted) { // Lógica para validar os campos ao digitar depois de submeter o formulário
      const fieldError = await validateField(name, value);
      setError({ ...error, [name]: fieldError });
    }
  };

  const handleInterventionTeamsChange = async (index, value) => {
    const updatedTeams = [...values.interventionTeams];
    updatedTeams[index] = value;
    setValues({ ...values, interventionTeams: updatedTeams });

    if (isSubmitted) {
      const fieldName = `interventionTeams[${index}]`;
      setError({ ...error, [fieldName]: null });
    }

  };


  const handleArrayChange = (index, field, fieldName, value) => { // Lógica para atualizar os valores dos campos de arrays
    const updatedArray = [...values[field]];
    updatedArray[index][fieldName] = value;
    setValues({ ...values, [field]: updatedArray });

    if (isSubmitted) { // Lógica para validar os campos ao digitar depois de submeter o formulário
      validateField(`${field}[${index}].${fieldName}`, value)
        .then((fieldError) => {
          setError({ ...error, [field]: error[field] || [] });
          setError({ ...error, [field]: { ...error[field], [index]: { ...error[field][index], [fieldName]: fieldError } } });
        });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Primeiro envio do formulário
    setError({}); // Limpa os erros
    console.log(values);
    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validação dos campos
      if (id) {
        await editPatient(id, values); // Edita o paciente
        console.log('editou');
        navigate('../pacientes');
      } else {
        await addPatient(values); // Adiciona o paciente
        console.log('adicionou');
        navigate('../pacientes');
      }

    } catch (err) {
      const errors = err.inner.reduce((acc, error) => {
        if (error.path.includes('externalAccompaniments')) { // Lógica para tratar os erros dos campos de arrays
          const [arrayField, index, field] = error.path.split(/[\[\].]/).filter(Boolean);
          acc[arrayField] = acc[arrayField] || [];
          acc[arrayField][index] = acc[arrayField][index] || {};
          acc[arrayField][index][field] = error.message;
        } else { // Lógica para tratar os erros dos campos comuns
          acc[error.path] = error.message;
        }
        return acc;
      }, {});
      setError(errors); // Atualiza os erros
      console.log(errors);
    }
  }

  return (
    <>
      <Box className={styles.container} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <PersonalInfo values={values} handleChange={handleChange} error={error} />

          <STextField lg={4.15} name="responsible" label="Responsável financeiro" handleChange={handleChange} value={values.responsible} error={error?.responsible} />

          <STextField lg={7.85} name="obs" label="Observações" handleChange={handleChange} value={values.obs} error={error?.obs} />

          <ContactInfo values={values} handleChange={handleChange} error={error} />

          <KinshipInfo values={values} handleChange={handleChange} error={error} num={1} />

          <KinshipInfo values={values} handleChange={handleChange} error={error} num={2} />

          <SchoolInfo values={values} handleChange={handleChange} error={error} />

          <ExternalAccompaniments values={values} setValues={setValues} handleArrayChange={handleArrayChange} error={error} />

          <InterventionTeams values={values} setValues={setValues} handleChange={handleInterventionTeamsChange} error={error} />

        </Grid>
      </Box>

      <Box className={styles.buttons}>
        <ReturnButton />
        <SaveButton handleSubmit={handleSubmit} />
      </Box>

    </>

  );

}

export default PatientRegistration
