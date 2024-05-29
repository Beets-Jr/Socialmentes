import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../Styles/PasswordReset.module.css'

function CustomArrowBackIcon({ onClick }) {

  return (
    <div className={styles.iconContainer} onClick={onClick}>
      Voltar
      <ArrowBackIcon />
    </div>
  );
}

export default CustomArrowBackIcon;
