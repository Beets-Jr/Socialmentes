import STextField from '../STextField';
import PropTypes from 'prop-types';

const SchoolInfo = ({ values, handleChange, error }) => (
  <>
    <STextField lg={3.2} name="school" label="Escola" handleChange={handleChange} value={values.school} error={error?.school} />

    <STextField lg={0.8} name="seriesSchool" label="Série" handleChange={handleChange} value={values.seriesSchool} error={error?.seriesSchool} placeholder="X" />

    <STextField lg={2} name="phoneSchool" label="Telefone" handleChange={handleChange} value={values.phoneSchool} error={error?.phoneSchool} placeholder="(00) 00000-0000" mask="(99) 99999-9999" />

    <STextField lg={3} name="mailSchool" label="E-mail" handleChange={handleChange} value={values.mailSchool} error={error?.mailSchool} />

    <STextField lg={3} name="responsibleSchool" label="Profissional responsável" handleChange={handleChange} value={values.responsibleSchool} error={error?.responsibleSchool} />

  </>
);

SchoolInfo.propTypes = {
  values: PropTypes.shape({
    school: PropTypes.string,
    seriesSchool: PropTypes.string,
    phoneSchool: PropTypes.string,
    mailSchool: PropTypes.string,
    responsibleSchool: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default SchoolInfo;