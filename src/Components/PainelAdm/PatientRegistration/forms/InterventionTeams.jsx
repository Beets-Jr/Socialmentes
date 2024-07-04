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
      const updatedOptions = userProfiles.map(user => [`${user.fullName} (${user.specialization})`, user.uid]);
      setOptions(updatedOptions);
    }
  }, [isLoading, userProfiles]);

  const handleAddInterventionTeam = () => {
    setValues({
      ...values,
      interventionTeams: [
        ...values.interventionTeams,
        { id: '' },
      ],
    });
  };

  const renderSelectBox = (team, index) => {
    return (
      <SSelectBox
        xs={11.4}
        name={`interventionTeams[${index}].id`}
        label="Equipe intervenção"
        handleChange={(e) => handleArrayChange(index, 'interventionTeams', 'id', e.target.value)}
        value={team.id}
        options={options}
        useCustomOptions
        error={error?.interventionTeams?.[index]?.id}
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
