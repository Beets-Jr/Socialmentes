import React from "react";

import Google from "../Images/google.png"
import Facebook from "../Images/facebook.png"

import styles from "../Styles/Login.module.css"

const SocialLoginButton = ({ onClick, provider }) => {
  return (
    <button
      className={styles.buttons}
      onClick={onClick}
    >
      {provider === "Google" ? (
        <img src= {Google} />
      ) : (
        <img src={Facebook} />
      )}
    </button>
  );
};

export default SocialLoginButton;
