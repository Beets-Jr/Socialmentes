import React, { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../Database/FirebaseConfig.mjs";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";
import ErrorMessage from "./TextFields/ErrorMessage";
import SuccessMessage from "./TextFields/SuccessMessage";
import styles from "./Styles/Login.module.css";
import theme from "./Theme/theme";

function LoginForm({ onPasswordResetClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSignIn} className={styles.container}>
        <EmailTextField email={email} setEmail={setEmail} />
        <PasswordTextField password={password} setPassword={setPassword} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "ENTRAR"}
        </Button>
        <ErrorMessage error={error} />
        <SuccessMessage user={user} />

        <div className={styles.campoEsqueceuSenha}>
          Esqueceu sua senha?
          <span onClick={onPasswordResetClick}>&nbsp;Clique aqui!</span>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
