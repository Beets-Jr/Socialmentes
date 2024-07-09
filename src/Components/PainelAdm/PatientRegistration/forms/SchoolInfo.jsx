import React from 'react'
import STextField from '../STextField';

const SchoolInfo = ({ values, handleChange, error }) => (
  <>
    <STextField lg={3.2} name="school" label="Escola" handleChange={handleChange} value={values.school} error={error?.school} />

    <STextField lg={0.8} name="seriesSchool" label="Série" handleChange={handleChange} value={values.seriesSchool} error={error?.seriesSchool} placeholder="X" />

    <STextField lg={2} name="phoneSchool" label="Telefone" handleChange={handleChange} value={values.phoneSchool} error={error?.phoneSchool} placeholder="(00) 00000-0000" />

    <STextField lg={3} name="mailSchool" label="E-mail" handleChange={handleChange} value={values.mailSchool} error={error?.mailSchool} />

    <STextField lg={3} name="responsibleSchool" label="Profissional responsável" handleChange={handleChange} value={values.responsibleSchool} error={error?.responsibleSchool} />

  </>
);


export default SchoolInfo