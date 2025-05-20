import { Grid, InputLabel, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddFieldButton from '../AddFieldButton';
import StyledTitle from '../StyledTitle';
import GoalsInput from '../GoalsInput';
import StyledInputLabel from '../StyledInputLabel';

const Goals = ({ goalsList, setGoalsList, checkedQuestions, error }) => {

  const handleAddSubGoal = (index) => {
    const updatedGoals = [...goalsList];
    updatedGoals[index].subGoals = [...updatedGoals[index].subGoals, '']; // Adiciona uma nova submeta vazia
    setGoalsList(updatedGoals);
  };

  const handleSubGoalChange = (questionIndex, subGoalIndex, newValue) => {
    const updatedGoals = [...goalsList];
    updatedGoals[questionIndex].subGoals[subGoalIndex] = newValue; // Atualiza a submeta específica
    setGoalsList(updatedGoals);
  };

  // Inicializa a lista de metas com as questões e submetas vazias
  useEffect(() => {
    const initialGoals = checkedQuestions.map((question) => ({
      title: question.split('#')[0],
      description: question.split('#')[1],
      subGoals: [''], // Cada questão começa com uma submeta vazia
    }));
    setGoalsList(initialGoals);
  }, [checkedQuestions, setGoalsList]);


  if (!checkedQuestions.length) return null; // TODO: Vazio caso não tenha questões selecionadas
  return (
    <>
      <StyledTitle text="Metas" />
      {goalsList.map((goal, questionIndex) => (
        <React.Fragment key={`question${questionIndex}`}>
          {/* Exibe a pergunta */}
          <StyledInputLabel label={goal.title} />
          <Typography
            variant="body1"
            sx={{
              marginBottom: '0.5rem',
              color: 'var(--color-gray-4)',
              fontFamily: 'var(--font-text)',
              fontSize: {
                xs: '0.875rem',
                sm: '1rem',
              }
            }}>
            {goal.description}
          </Typography>

          {/* Exibe as submetas para cada questão */}
          <StyledInputLabel label="Submetas" />
          {goal.subGoals.map((subGoal, subGoalIndex) => (
            <Grid container columnSpacing={1} marginBottom={1.5} key={`subGoal${subGoalIndex}`}>
              <GoalsInput
                lg={11.4}
                xs={9.5}
                md={11}
                name={`goals[${questionIndex}].subGoals[${subGoalIndex}]`}
                value={subGoal}
                error={error?.[`goals[${questionIndex}].subGoals[${subGoalIndex}]`] ?? false}
                handleChange={(e) => handleSubGoalChange(questionIndex, subGoalIndex, e.target.value)}
              />
              <AddFieldButton handleClick={() => handleAddSubGoal(questionIndex)} />
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
Goals.propTypes = {
  goalsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      subGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  setGoalsList: PropTypes.func.isRequired,
  checkedQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.object,
};

export default Goals;