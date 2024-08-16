import React from 'react'
import StyledInputText from '../StyledInputText';
import { Grid } from '@mui/material';
import AddFieldButton from '../AddFieldButton';
import StyledTitle from '../StyledTitle';
import StyledCheckBox from '../StyledCheckBox';
import StyledDivider from '../StyledDivider';


const Cronogram = ({ values, setValues, handleMapChange, error }) => {
  const handleAddCronogram = () => {
    setValues({
      ...values,
      cronogram: [
        ...values.cronogram,
        { hour: '', professional: '', dayWeek: '' },
      ],
    });
  };

  const handleDayChange = (index, value) => {
    const updatedCronogram = [...values.cronogram];
    const dayWeekArray = updatedCronogram[index].dayWeek;
    const newDayWeekArray = dayWeekArray.includes(value)
      ? dayWeekArray.filter((day) => day !== value)
      : [...dayWeekArray, value];

    updatedCronogram[index].dayWeek = newDayWeekArray;
    setValues({ ...values, cronogram: updatedCronogram });
  };

  return (
    <>
      <StyledTitle text="Cronograma" />


      {values.cronogram.map((cronogram, index) => (
        <React.Fragment key={'cronogram' + index}>
          <Grid container columnSpacing={1}>
            <StyledInputText lg={1.5}
              name={`cronogram[${index}].hour`}
              label="Hora"
              handleChange={(e) => handleMapChange(index, 'cronogram', 'hour', e.target.value)}
              value={cronogram.hour}
              error={error?.cronogram?.[index]?.hour}
            />

            <StyledInputText lg={4.5}
              name={`cronogram[${index}].professional`}
              label="Terapeuta"
              handleChange={(e) => handleMapChange(index, 'cronogram', 'professional', e.target.value)}
              value={cronogram.professional}
              error={error?.cronogram?.[index]?.professional}
            />

            <Grid item lg={5.4} xs={9.5} md={11}>
              <StyledCheckBox item={cronogram} index={index} handleDayChange={handleDayChange} />
            </Grid>

            <AddFieldButton vin handleClick={handleAddCronogram} />
            <StyledDivider />
          </Grid>

        </React.Fragment>
      ))}

    </>
  )
}

export default Cronogram

