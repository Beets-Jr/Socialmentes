import React, { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../Database/FirebaseConfig.mjs";
import { Link } from "react-router-dom";
import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";
import ErrorMessage from "./Messages/ErrorMessage";
import SuccessMessage from "./Messages/SuccessMessage";
import styles from "./Styles/Login.module.css";
import theme from "./Theme/theme";

import ArrowIcon from "./Images/Icons/ArrowIcon";

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
        >
          {!loading ? (
            <>
              ENTRAR <ArrowIcon />
            </>
          ) : (
            <CircularProgress size={24} />
          )}
        </Button>
        <ErrorMessage
          condition={error}
          errorMessage={"E-mail ou senha incorretos!"}
        />
        <SuccessMessage
          condition={user}
          successMessage={"Login bem-sucedido!"}
        />

        <div className={styles.campoEsqueceuSenha}>
          Esqueceu sua senha?
          <Link to="/login/reset-password">Clique aqui!</Link>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
