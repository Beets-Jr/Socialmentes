import PropTypes from 'prop-types';
import STextField from '../STextField';

const PersonalInfo = ({ values, handleChange, error }) => (
  <>
    <STextField lg={4.2} name="name" label="Nome da criança" handleChange={handleChange} value={values.name} error={error?.name} />
    <STextField lg={2.9} name="cpf" label="CPF" placeholder={"000.000.000-00"} handleChange={handleChange} value={values.cpf} error={error?.cpf} mask="999.999.999-99" />
    <STextField lg={2.6} name="rg" label="RG" placeholder={"00.000.000-0"} handleChange={handleChange} value={values.rg} error={error?.rg} mask="99.999.999-9" />
    <STextField lg={2.3} name="birth" label="Nascimento" placeholder={"DD/MM/AAAA"} handleChange={handleChange} value={values.birth} error={error?.birth} mask="99/99/9999" />
  </>
);

PersonalInfo.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    rg: PropTypes.string,
    birth: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default PersonalInfo;
