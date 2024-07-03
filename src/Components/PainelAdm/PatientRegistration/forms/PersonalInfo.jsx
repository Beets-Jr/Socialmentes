import React from 'react';
import STextField from '../STextField';

const PersonalInfo = ({ values, handleChange, error }) => (
  <>
    <STextField xs={4.2} name="name" label="Nome da criança" handleChange={handleChange} value={values.name} error={error?.name} />
    <STextField xs={2.9} name="cpf" label="CPF" placeholder={"000.000.000-00"} handleChange={handleChange} value={values.cpf} error={error?.cpf} />
    <STextField xs={2.6} name="rg" label="RG" placeholder={"00.000.000-0"} handleChange={handleChange} value={values.rg} error={error?.rg} />
    <STextField xs={2.3} name="birth" label="Nascimento" placeholder={"DD/MM/AAAA"} handleChange={handleChange} value={values.birth} error={error?.birth} />
  </>
);

export default PersonalInfo;
