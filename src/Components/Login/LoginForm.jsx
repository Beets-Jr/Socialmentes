import React, { useState } from "react";
import { Button, CircularProgress, Alert, ThemeProvider } from "@mui/material";
import { auth } from "../../Database/FirebaseConfig.mjs";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";
import ErrorMessage from "./TextFields/ErrorMessage";

import styles from "./Styles/Login.module.css";
import theme from "./Theme/theme";
import SuccessMessage from "./TextFields/SuccessMessage";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
    setHasSubmitted(true);
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
          className={styles.botaoEntrar}
        >
          {loading ? <CircularProgress size={24} /> : "ENTRAR"}
        </Button>
        <ErrorMessage error={error} />
        <SuccessMessage user={user} />
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
