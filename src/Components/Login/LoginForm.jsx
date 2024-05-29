import React, { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";
import ErrorMessage from "./Messages/ErrorMessage";
import SuccessMessage from "./Messages/SuccessMessage";
import ArrowIcon from "./Images/Icons/ArrowIcon";

import styles from "./Styles/LoginForm.module.css";
import theme from "./Theme/theme";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmail, error, user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmail(email, password);
    setIsRedirecting(true);
  };

  if (isRedirecting && user) {
    return <Navigate to="/cargos" />;
  }

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
      </form>

      <div className={styles.campoEsqueceuSenha}>
        Esqueceu sua senha?
        <Link className={styles.cliqueAqui} to="/reset-password">
          &nbsp;Clique aqui!
        </Link>
      </div>
    </ThemeProvider>
  );
}

export default LoginForm;
