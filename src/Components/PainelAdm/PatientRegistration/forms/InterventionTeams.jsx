import React, { useEffect, useState } from 'react';
import SSelectBox from '../SSelectBox';
import AddButton from '../AddButton';
import SDividerInt from '../SDividerInt';
import { UserService } from '../../../../Services/userService';
import { CircularProgress } from '@mui/material';

const InterventionTeams = ({ values, setValues, handleArrayChange, error }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getAllUsers()
      .then((value) => {
        setUserProfiles(value);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const updatedOptions = userProfiles.map(user => `${user.fullName} (${user.specialization})`);
      setOptions(updatedOptions);
    }
  }, [isLoading, userProfiles]);

  const handleAddInterventionTeam = () => {
    setValues({
      ...values,
      interventionTeams: [
        ...values.interventionTeams,
        { name: '' },
      ],
    });
  };

  const renderSelectBox = (team, index) => {
    const isValidValue = options.includes(team.name);
    return (
      <SSelectBox
        xs={11.4}
        name={`interventionTeams[${index}].name`}
        label="Equipe intervenção"
        handleChange={(e) => handleArrayChange(index, 'interventionTeams', 'name', e.target.value)}
        value={isValidValue ? team.name : ''}
        options={options}
        error={error?.interventionTeams?.[index]?.name}
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        values.interventionTeams.map((team, index) => (
          <React.Fragment key={'team' + index}>
            {renderSelectBox(team, index)}
            <AddButton handleClick={handleAddInterventionTeam} />
          </React.Fragment>
        ))
      )}
      <SDividerInt />
    </>
  );
};

export default InterventionTeams;
