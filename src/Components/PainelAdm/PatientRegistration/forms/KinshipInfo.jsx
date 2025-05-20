import PropTypes from 'prop-types';
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
        lg={2.75}
        name={fields.kinship}
        label="Parentesco"
        handleChange={handleChange}
        value={values[fields.kinship]}
        options={kinshipOptions}
        error={error?.[fields.kinship]}
      />

      <STextField
        lg={5.25}
        name={fields.name}
        label={`Nome ${num}`}
        handleChange={handleChange}
        value={values[fields.name]}
        error={error?.[fields.name]}
      />

      <STextField
        lg={2.15}
        name={fields.cpf}
        label="CPF"
        placeholder={"000.000.000-00"}
        handleChange={handleChange}
        value={values[fields.cpf]}
        error={error?.[fields.cpf]}
        mask="999.999.999-99"
      />

      <STextField
        lg={1.85}
        name={fields.rg}
        label="RG"
        placeholder={"00.000.000-0"}
        handleChange={handleChange}
        value={values[fields.rg]}
        error={error?.[fields.rg]}
        mask="99.999.999-9"
      />

      <STextField
        lg={2.3}
        name={fields.cell}
        label="Celular"
        handleChange={handleChange}
        value={values[fields.cell]}
        error={error?.[fields.cell]}
        placeholder={"(00) 00000-0000"}
        mask="(99) 99999-9999"
      />

      <STextField
        lg={7}
        name={fields.email}
        label="E-mail"
        handleChange={handleChange}
        value={values[fields.email]}
        error={error?.[fields.email]}
      />

      <STextField
        lg={2.7}
        name={fields.birth}
        label="Nascimento"
        placeholder={"DD/MM/AAAA"}
        handleChange={handleChange}
        value={values[fields.birth]}
        error={error?.[fields.birth]}
        mask="99/99/9999"
      />
    </>
  );
};
KinshipInfo.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default KinshipInfo;
