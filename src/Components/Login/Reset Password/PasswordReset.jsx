import { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { auth } from "../../../Database/FirebaseConfig.mjs";
import { sendPasswordResetEmail } from "firebase/auth";

import styles from "../Styles/PasswordReset.module.css";
import theme from "../Theme/theme";

import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import EmailTextField from "../TextFields/EmailTextField";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email de recuperação de senha enviado!");
    } catch (error) {
      setError("Erro ao enviar e-mail de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handlePasswordReset}
        className={styles.recuperarSenhaContainer}
      >
        <div className={styles.recuperarSenha}>Recuperar Senha</div>
        <EmailTextField email={email} setEmail={setEmail} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            "Enviar Email de Recuperação"
          )}
        </Button>

        <ErrorMessage 
          condition={error} 
          errorMessage={error} 
        />
        <SuccessMessage 
          condition={message} 
          successMessage={message} 
        />
      </form>
    </ThemeProvider>
  );
}

export default PasswordReset;
