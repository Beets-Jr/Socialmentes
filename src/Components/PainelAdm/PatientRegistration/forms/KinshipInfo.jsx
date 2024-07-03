import React from 'react';
import SSelectBox from '../SSelectBox';
import STextField from '../STextField';

const kinshipOptions = ['Mãe', 'Pai', 'Avós', 'Responsável'];

const KinshipInfo = ({ values, handleChange, error, num }) => {
  const fieldPrefix = `kinship${num}`;
  const fields = {
    kinship: `${fieldPrefix}`,
    name: `name${num}`,
    cpf: `cpf${num}`,
    rg: `rg${num}`,
    cell: `cell${num}`,
    email: `email${num}`,
    birth: `birth${num}`
  };

  return (
    <>
      <SSelectBox
        xs={2.75}
        name={fields.kinship}
        label="Parentesco"
        handleChange={handleChange}
        value={values[fields.kinship]}
        options={kinshipOptions}
        error={error?.[fields.kinship]}
      />

      <STextField
        xs={5.25}
        name={fields.name}
        label={`Nome ${num}`}
        handleChange={handleChange}
        value={values[fields.name]}
        error={error?.[fields.name]}
      />

      <STextField
        xs={2.15}
        name={fields.cpf}
        label="CPF"
        placeholder={"000.000.000-00"}
        handleChange={handleChange}
        value={values[fields.cpf]}
        error={error?.[fields.cpf]}
      />

      <STextField
        xs={1.85}
        name={fields.rg}
        label="RG"
        placeholder={"00.000.000-0"}
        handleChange={handleChange}
        value={values[fields.rg]}
        error={error?.[fields.rg]}
      />

      <STextField
        xs={2.3}
        name={fields.cell}
        label="Celular"
        handleChange={handleChange}
        value={values[fields.cell]}
        error={error?.[fields.cell]}
        placeholder={"(00) 00000-0000"}
      />

      <STextField
        xs={7}
        name={fields.email}
        label="E-mail"
        handleChange={handleChange}
        value={values[fields.email]}
        error={error?.[fields.email]}
      />

      <STextField
        xs={2.7}
        name={fields.birth}
        label="Nascimento"
        placeholder={"DD/MM/AAAA"}
        handleChange={handleChange}
        value={values[fields.birth]}
        error={error?.[fields.birth]}
      />
    </>
  );
};

export default KinshipInfo;
