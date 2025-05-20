import React, { useEffect, useState } from 'react';
import { Box, Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { getPatientById, getTestsByIds, getTestByIdTest, getTestsByPatientId } from '../../Services/testsPatientsService';
import { accumulateQuestions, transformIndividualData } from './ChartUtil';
import styles from './ChartComponent.module.css';

import RadioG from './RadioG';
import Chart from './Chart';
import { useParams } from 'react-router-dom';
import PatientData from '../PainelPsicologo/Reports/ChecklistComponents/PatientData';

const ChartComponent = () => {
  const { testId } = useParams();
  const [showPrevious, setShowPrevious] = useState(false);
  const [radio, setRadio] = useState('nao-mostrar');
  const [firstTest, setFirstTest] = useState(null);
  const [data, setData] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [previousTest, setPreviousTest] = useState(null);
  const [patient, setPatient] = useState(null);
  const [accumulatedQuestions, setAccumulatedQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('defaultProps')) {
      return;
    }
    originalError.apply(console, args);
  };

  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  useEffect(() => {
    const fetchTestAndRelatedData = async () => {
      try {
        const testData = await getTestByIdTest(testId);
        setCurrentTest(testData);
        const patientId = testData.patientId;
        const patientData = await getPatientById(patientId);
        setPatient(patientData);
        const testIds = patientData.tests || [];
        let fetchedTests = await getTestsByIds(testIds);
        fetchedTests.length === 0 ? fetchedTests = await getTestsByPatientId(patientId) : fetchedTests;
        const accumulatedQuestions = accumulateQuestions(fetchedTests);
        setAccumulatedQuestions(accumulatedQuestions);
        const currentIndex = fetchedTests.findIndex(test => test.id === testData.id);
        if (currentIndex > 0) {
          setPreviousTest(fetchedTests[currentIndex - 1]);
        } else {
          setFirstTest(true);
        }
      } catch (error) {
        console.error('Erro ao puxar dados do teste e relacionados:', error);
      }
    };

    fetchTestAndRelatedData();
  }, [testId]);

  useEffect(() => {
    if (currentTest) {
      const transformedData = transformIndividualData(currentTest, accumulatedQuestions, showPrevious && !firstTest ? previousTest : null);
      setData(transformedData);
      setIsLoaded(true);
    }
  }, [currentTest, previousTest, showPrevious, firstTest]);

  const handleCheckboxChange = () => {
    setShowPrevious(!showPrevious);
    setIsLoaded(false);
  };



  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box className={styles.infoContainer}>
        {patient && <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />}
        <FormControlLabel className={styles.checkboxContainer}
          control={<Checkbox checked={showPrevious} onChange={handleCheckboxChange}
          />}
          label="Mostrar teste anterior"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: 'var(--color-gray-4)',
              fontSize: '15px',
              fontFamily: 'var(--font-sub)',
            },
          }}
        />
        <Box>
          <RadioG value={radio} onChange={handleRadioChange} />
        </Box>
      </Box>


      <Chart data={data} radio={radio} showPrevious={showPrevious} />
    </>
  );
};

export default ChartComponent;
