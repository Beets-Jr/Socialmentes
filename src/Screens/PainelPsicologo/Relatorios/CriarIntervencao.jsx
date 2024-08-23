import { Box, Grid, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import styles from './CriarIntervencao.module.css'
import PatientData from '../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData'
import StyledInputText from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledInputText'
import StyledCheckBox from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledCheckBox'
import StyledTitle from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledTitle'
import AddFieldButton from '../../../Components/PainelPsicologo/Reports/InterventionComponents/AddFieldButton'
import ReturnButton from '../../../Components/PainelAdm/PatientRegistration/ReturnButton'
import SaveButton from '../../../Components/PainelAdm/PatientRegistration/SaveButton'
import Goals from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Goals'
import Activities from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Activities'
import Cronogram from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Cronogram'
import { validationSchema } from '../../../Validators/Intervention/intervention'

const initialValues = {
  coordinator_sr: '',
  coordinator_jr: '',
  start_ABA: '',
  goals: [''],
  activities: [{ typePlay: '', place: '', goals: '' }],
  cronogram: [{ hour: '', professional: '', dayWeek: [] }],
};


const CriarIntervencao = () => {
  const isMobile = useMediaQuery('(max-width: 700px)');

  const [error, setError] = useState({});
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handlePdfGenerator = async () => {
    console.log('PDF gerado');
  }

  const handleArrayChange = async (index, value) => {
    const updatedTeams = [...values.goals];
    updatedTeams[index] = value;
    setValues({ ...values, goals: updatedTeams });
  };

  const handleMapChange = (index, field, fieldName, value) => { // Lógica para atualizar os valores dos campos de arrays
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
    setIsSubmitted(true);
    setError({}); // Limpa os erros
    console.log(values);
    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validação dos campos

    } catch (err) {
      const errors = err.inner.reduce((acc, error) => {
        if (error.path.includes('activities' || 'cronogram')) { // Lógica para tratar os erros dos campos de arrays
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
    <div className={styles.main}>
      <Box className={styles.container}>
        <PatientData name="Jeu da graça" birthday="12/12/2004" />

        <Goals values={values} setValues={setValues} handleChange={handleArrayChange} error={error} />

        <Activities values={values} setValues={setValues} handleMapChange={handleMapChange} error={error} />

        <Cronogram values={values} setValues={setValues} handleMapChange={handleMapChange} error={error} />

        <Grid container rowSpacing={3}>
          <StyledInputText lg={12} name="coordinator_sr" label="Coordenador Senior" value={values.coordinator_sr} handleChange={handleChange} error={error?.coordinator_sr} />
          <StyledInputText lg={12} name="coordinator_jr"
            label="Coordenador Junior" value={values.coordinator_jr} handleChange={handleChange} error={error?.coordinator_jr} />
          <StyledInputText lg={12} name="start_ABA"
            label="Início Intervenção ABA" value={values.start_ABA} handleChange={handleChange} error={error?.start_ABA} />
        </Grid>

      </Box >
      <Box className={styles.fixedArea}>
        <Box className={styles.buttons}>
          <ReturnButton />
          {!isMobile ? <>
            <Box className={styles.blueButtons}>
              <SaveButton handleSubmit={handlePdfGenerator} label='PDF' />
              <SaveButton handleSubmit={handleSubmit} />
            </Box></>
            : <>
              <SaveButton handleSubmit={handlePdfGenerator} label='PDF' />
              <SaveButton handleSubmit={handleSubmit} />
            </>}
        </Box>

      </Box>

    </div >
  )
}

export default CriarIntervencao