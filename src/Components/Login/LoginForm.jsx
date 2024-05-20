import React, { useState } from "react";
import { Button, CircularProgress, Alert, ThemeProvider } from "@mui/material";
import { auth } from "../../Database/FirebaseConfig.mjs";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";

import styles from "./Styles/Login.module.css";
import theme from "./Theme/theme";

function LoginForm() {
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
          className={styles.botaoEntrar}
        >
          {loading ? <CircularProgress size={24} /> : "ENTRAR"}
        </Button>
        {error && <Alert severity="error">{error.message}</Alert>}
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
