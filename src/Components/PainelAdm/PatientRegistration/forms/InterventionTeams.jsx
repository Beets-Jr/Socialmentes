import React, { useEffect, useState } from 'react';
import SSelectBox from '../SSelectBox';
import AddButton from '../AddButton';
import SDividerInt from '../SDividerInt';
import { UserService } from '../../../../Services/userService';
import { CircularProgress } from '@mui/material';

const InterventionTeams = ({ values, setValues, handleChange, error }) => {
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
    setValues({ ...values, interventionTeams: [...values.interventionTeams, ''] });
  };

  const renderSelectBox = (team, index) => {
    const fieldName = `interventionTeams[${index}]`; // Nome do campo formatado corretamente
    return (
      <SSelectBox
        lg={11.4} xs={9} md={11}
        name={fieldName} // Passando o nome do campo formatado
        label="Equipe intervenção"
        handleChange={(e) => handleChange(index, e.target.value)}
        value={team}
        options={options}
        useCustomOptions
        error={error?.[fieldName]} // Passando o erro correspondente
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        values.interventionTeams.map((team, index) => (
          <React.Fragment key={`team${index}`}>
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
