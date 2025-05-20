import { Box, Grid, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './CriarIntervencao.module.css';
import PatientData from '../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData';
import StyledInputText from '../../../Components/PainelPsicologo/Reports/InterventionComponents/StyledInputText';
import ReturnButton from '../../../Components/PainelAdm/PatientRegistration/ReturnButton';
import SaveButton from '../../../Components/PainelAdm/PatientRegistration/SaveButton';
import Goals from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Goals';
import Activities from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Activities';
import Cronogram from '../../../Components/PainelPsicologo/Reports/InterventionComponents/forms/Cronogram';
import { validationSchema } from '../../../Validators/Intervention/intervention';
import pdfGenerate from '../../../Components/PainelPsicologo/Reports/InterventionComponents/pdfGenerate';
import DialogPdf from '../../../Components/ElementsInterface/DialogPdf';
import { useLocation, useNavigate } from 'react-router-dom';
import { addPlan } from '../../../Services/interventionPlanService';


const CriarIntervencao = () => {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const location = useLocation();
  const navigate = useNavigate();
  const checkedQuestions = location.state.checkedQuestions || [];
  const patient = location.state.patient || {};
  const test = location.state.test || {};
  const [error, setError] = useState({});
  const [goalsList, setGoalsList] = useState([
    { title: '', description: '', subGoals: [] },
  ]);
  const [values, setValues] = useState({
    coordinator_sr: '',
    coordinator_jr: '',
    start_ABA: '',
    patientId: test.patientId,
    goals: goalsList,
    activities: [{ typePlay: '', place: '', goals: '' }],
    cronogram: [{ hour: '', professionalId: '', dayWeek: [], professionalName: '' }],
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);


  const handlePdfGenerator = () => {
    if (!loading) {
      setOpen(true);
      pdfGenerate(setLoading, setOpen);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSuccessClose = () => {
    setSuccessDialog(false);
    navigate('/painel-psi/pacientes');
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const handleMapChange = (index, field, fieldName, value) => {
    const updatedArray = [...values[field]];
    updatedArray[index][fieldName] = value;
    setValues({ ...values, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const updatedValues = { ...values, goals: goalsList };
    setValues(updatedValues);
    console.log(updatedValues);

    try {
      await validationSchema.validate(updatedValues, { abortEarly: false });
      console.log('Validado com sucesso');
      await addPlan(values);
      setSuccessDialog(true);

    } catch (err) {
      const errors = err.inner.reduce((acc, error) => {
        if (error.path.includes('activities' || 'cronogram' || 'goals')) {
          const [arrayField, index, field] = error.path.split(/[\[\].]/).filter(Boolean);
          acc[arrayField] = acc[arrayField] || [];
          acc[arrayField][index] = acc[arrayField][index] || {};
          acc[arrayField][index][field] = error.message;
        } else {
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
      <Box className={styles.container} id="pdf-content">
        <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />

        <Goals goalsList={goalsList} setGoalsList={setGoalsList} checkedQuestions={checkedQuestions} error={error} />

        <Activities values={values} setValues={setValues} handleMapChange={handleMapChange} error={error} />

        <Cronogram values={values} setValues={setValues} handleMapChange={handleMapChange} error={error} />

        <Grid container rowSpacing={3}>
          <StyledInputText lg={12} name="coordinator_sr" label="Coordenador Senior" value={values.coordinator_sr} handleChange={handleChange} error={error?.coordinator_sr} />
          <StyledInputText lg={12} name="coordinator_jr" label="Coordenador Junior" value={values.coordinator_jr} handleChange={handleChange} error={error?.coordinator_jr} />
          <StyledInputText lg={12} name="start_ABA" label="Início Intervenção ABA" value={values.start_ABA} handleChange={handleChange} error={error?.start_ABA} />
        </Grid>
      </Box>
      <Box className={styles.fixedArea}>
        <Box className={styles.buttons}>
          <ReturnButton />
          {!isMobile ? (
            <>
              <Box className={styles.blueButtons}>
                <SaveButton handleSubmit={handlePdfGenerator} label='PDF' />
                <SaveButton handleSubmit={handleSubmit} />
              </Box>
            </>
          ) : (
            <>
              <SaveButton handleSubmit={handlePdfGenerator} label='PDF' />
              <SaveButton handleSubmit={handleSubmit} />
            </>
          )}
        </Box>
      </Box>
      <DialogPdf open={open} handleClose={handleClose} label="O PDF já está sendo baixado!" />
      {successDialog && (
        <DialogPdf
          open={successDialog}
          handleClose={handleSuccessClose}
          label={"Plano de intervenção salvo com sucesso!"}
          buttonLabel={"Voltar para Pacientes"}
        />
      )}
    </div>
  );
}

export default CriarIntervencao;
