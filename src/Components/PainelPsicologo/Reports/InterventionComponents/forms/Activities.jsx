import React from 'react'
import StyledInputText from '../StyledInputText';
import { Grid } from '@mui/material';
import AddFieldButton from '../AddFieldButton';
import StyledTitle from '../StyledTitle';

const Activities = ({ values, setValues, handleMapChange, error }) => {
  const handleAddActivitie = () => {
    setValues({
      ...values,
      activities: [
        ...values.activities,
        { typePlay: '', place: '', goals: '' },
      ],
    });
  };

  return (
    <>
      <StyledTitle text="Rotina de atividades" />

      {values.activities.map((activitie, index) => (
        <React.Fragment key={'activitie' + index}>
          <Grid container columnSpacing={1}> {/* Rotina de atividades */}
            <StyledInputText lg={6}
              name={`activities[${index}].typePlay`}
              label="Tipo de brincadeira"
              handleChange={(e) => handleMapChange(index, 'activities', 'typePlay', e.target.value)}
              value={activitie.typePlay}
              error={error?.activities?.[index]?.typePlay}
            />

            <StyledInputText lg={6} name={`activities[${index}].place`} label="Local" handleChange={(e) => handleMapChange(index, 'activities', 'place', e.target.value)} value={activitie.place} error={error?.activities?.[index]?.place} />

            <StyledInputText lg={11.4} xs={9.5} md={11} name={`activities[${index}].goals`} label="Metas" handleChange={(e) => handleMapChange(index, 'activities', 'goals', e.target.value)} value={activitie.goals} error={error?.activities?.[index]?.goals} />

            <AddFieldButton vin handleClick={handleAddActivitie} />
          </Grid>
        </React.Fragment>
      ))}
    </>
  )
}

export default Activities

