import React from 'react';
import STextField from '../STextField';
import SSelectBox from '../SSelectBox';
import AddButton from '../AddButton';
import SDividerAc from '../SDividerAc';


const teamAccompanimentOptions = ['Fono', 'Neurologista', 'Pediatra', 'Psicologo', 'Psiquiatra', 'Outros'];


const ExternalAccompaniments = ({ values, setValues, handleArrayChange, error }) => {
  const handleAddExternalAccompaniment = () => {
    setValues({
      ...values,
      externalAccompaniments: [
        ...values.externalAccompaniments,
        { professional: '', name: '', phone: '', email: '' },
      ],
    });
  };
  return (
    <>
      {values.externalAccompaniments.map((accompaniment, index) => (
        <React.Fragment key={'external' + index}>
          <SSelectBox
            xs={3}
            name={`externalAccompaniments[${index}].professional`} label="Acompanhamento externo"
            handleChange={(e) =>
              handleArrayChange(index, 'externalAccompaniments', 'professional', e.target.value)}
            value={accompaniment.professional}
            options={teamAccompanimentOptions}
            error={error?.externalAccompaniments?.[index]?.professional} />

          <STextField
            xs={3.5}
            name={`externalAccompaniments[${index}].name`}
            label="Nome"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'name', e.target.value)}
            value={accompaniment.name}
            error={error?.externalAccompaniments?.[index]?.name}
          />
          <STextField
            xs={1.9}
            name={`externalAccompaniments[${index}].phone`}
            label="Telefone"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'phone', e.target.value)}
            value={accompaniment.phone}
            error={error?.externalAccompaniments?.[index]?.phone}
            placeholder="(00) 00000-0000"
          />
          <STextField
            xs={3}
            name={`externalAccompaniments[${index}].email`}
            label="E-mail"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'email', e.target.value)}
            value={accompaniment.email}
            error={error?.externalAccompaniments?.[index]?.email}
          />
          <AddButton handleClick={handleAddExternalAccompaniment} />

        </React.Fragment>
      ))}
      <SDividerAc />
    </>
  );
}

export default ExternalAccompaniments;
