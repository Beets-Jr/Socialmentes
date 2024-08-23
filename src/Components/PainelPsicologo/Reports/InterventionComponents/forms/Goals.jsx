import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledInputText from '../StyledInputText';
import AddFieldButton from '../AddFieldButton';
import StyledTitle from '../StyledTitle';


const Goals = ({ values, setValues, handleChange, error }) => {
  const handleAddInterventionTeam = () => {
    setValues({ ...values, goals: [...values.goals, ''] });
  };


  return (
    <>
      <StyledTitle text="Metas" />

      {values.goals.map((team, index) => (
        <React.Fragment key={`team${index}`}>
          <Grid container columnSpacing={1} marginBottom={1.5}>
            <StyledInputText lg={11.4} xs={9.5} md={11} name={`goals[${index}]`} value={team} handleChange={(e) => handleChange(index, e.target.value)} error={error?.[`goals[${index}]`]} />
            <AddFieldButton handleClick={handleAddInterventionTeam} />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}

export default Goals;
