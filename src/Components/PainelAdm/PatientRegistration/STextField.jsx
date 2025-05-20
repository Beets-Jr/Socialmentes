import { TextField, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import SInputLabel from './SInputLabel';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-blue-3)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-blue-3)',
    },

  },
});

const STextField = ({ xs = 12, md = 6, lg, name, label, error = null, handleChange, value, mask, ...props }) => {


  return (
    <Grid item xs={xs} lg={lg} md={md}>
      <SInputLabel label={label} name={name} />
      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={handleChange}
        >
          {(inputProps) => (
            <StyledTextField
              {...inputProps}
              id={name}
              name={name}
              type={props.type || "text"}
              error={!!error}
              fullWidth
              {...props}
              InputProps={{
                ...props.InputProps,
                style: {
                  fontFamily: 'var(--font-sub)',
                  fontSize: '16px',
                  borderRadius: '20px',
                  padding: '5px 0',
                  marginBottom: '10px',
                },
              }}
            />
          )}
        </InputMask>
      ) : (
        <StyledTextField
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          error={!!error}
          {...props}
          fullWidth
          InputProps={{
            ...props.InputProps,
            style: {
              fontFamily: 'var(--font-sub)',
              fontSize: '16px',
              borderRadius: '20px',
              padding: '5px 0',
              marginBottom: '10px',
            },
          }}
        />
      )}
      {error && <Typography sx={{ color: 'red', fontSize: '12px' }}>{error}</Typography>}
    </Grid>
  )
}
STextField.propTypes = {
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleChange: PropTypes.func,
  value: PropTypes.any,
  mask: PropTypes.string,
  type: PropTypes.string,
  InputProps: PropTypes.object,
};

export default STextField;