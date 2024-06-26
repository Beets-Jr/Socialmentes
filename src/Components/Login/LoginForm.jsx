import { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";
import ArrowIcon from "../../Assets/Icons/ArrowIcon";

import styles from "./Styles/LoginForm.module.css";
import theme from "./Theme/theme";
import FeedbackMessage from "../ElementsInterface/FeedbackMessage";

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
    return <Navigate to="/painel-adm" />;
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
        {error && <FeedbackMessage condition="error" message="E-mail ou senha incorretos!"/>}
        {user && <FeedbackMessage condition="success" message="Login bem-sucedido!"/>}
      </form>

      <div className={styles.campoEsqueceuSenha}>
        Esqueceu sua senha?
        <Link className={styles.cliqueAqui} to="/login/recuperar-senha">
          &nbsp;Clique aqui!
        </Link>
      </div>
    </ThemeProvider>
  );
}

export default LoginForm;
