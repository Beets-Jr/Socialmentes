import STextField from '../STextField';
import PropTypes from 'prop-types';

const ContactInfo = ({ values, handleChange, error }) => (
  <>

    <STextField lg={2.9} name="cep" label="CEP" placeholder={"00000-000"} handleChange={handleChange} value={values.cep} error={error?.cep} mask="99999-999" />
    <STextField lg={1.2} name="uf" label="UF" placeholder={"XX"} handleChange={handleChange} value={values.uf} error={error?.uf} />
    <STextField lg={3.8} name="city" label="Cidade" handleChange={handleChange} value={values.city} error={error?.city} />
    <STextField lg={4.1} name="neighborhood" label="Bairro" handleChange={handleChange} value={values.neighborhood} error={error?.neighborhood} />
    <STextField lg={5.25} name="street" label="Logradouro" handleChange={handleChange} value={values.street} error={error?.street} />
    <STextField lg={1.5} name="number" label="Número" handleChange={handleChange} value={values.number} error={error?.number} />
    <STextField lg={5.25} name="complement" label="Complemento" handleChange={handleChange} value={values.complement} error={error?.complement} />
  </>
);
ContactInfo.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default ContactInfo;
