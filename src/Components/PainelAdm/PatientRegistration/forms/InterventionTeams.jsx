import React from 'react'
import SSelectBox from '../SSelectBox';
import AddButton from '../AddButton';
import SDividerInt from '../SDividerInt';

const teamAccompanimentOptions = ['Fonoaudiologia', 'Psicologia', 'Psicopedagogia', 'Terapia Ocupacional', 'Fisioterapia', 'Nutrição'];

const InterventionTeams = ({ values, setValues, handleArrayChange, error }) => {
  const handleAddInterventionTeam = () => {
    setValues({
      ...values,
      interventionTeams: [
        ...values.interventionTeams,
        { name: '' },
      ],
    });
  };

  return (
    <>
      {
        values.interventionTeams.map((team, index) => (
          <React.Fragment key={'team' + index}>
            <SSelectBox xs={11.4}
              name={`interventionTeams[${index}].name`}
              label="Equipe intervenção"
              handleChange={(e) => handleArrayChange(index, 'interventionTeams', 'name', e.target.value)}
              value={team.name}
              options={teamAccompanimentOptions}
              error={error?.interventionTeams?.[index]?.name}
            />
            <AddButton handleClick={handleAddInterventionTeam} />
          </React.Fragment>
        ))
      }
      <SDividerInt />

    </>);
}

export default InterventionTeams