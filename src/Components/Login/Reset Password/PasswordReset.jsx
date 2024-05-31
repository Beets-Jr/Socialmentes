import { useState } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { auth } from "../../../Database/FirebaseConfig.mjs";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "../Styles/PasswordReset.module.css";
import theme from "../Theme/theme";
import EmailTextField from "../TextFields/EmailTextField";
import { useNavigate } from "react-router-dom";
import FeedbackMessage from "../../ElementsInterface/FeedbackMessage";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate("/login");
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

        {error && <FeedbackMessage condition="error" message={error} />}
        {message && <FeedbackMessage condition="success" message={message} />}

        <div className={styles.iconContainer} onClick={handleClick}>
          Voltar
          <ArrowBackIcon />
        </div>
      </form>
    </ThemeProvider>
  );
}

export default PasswordReset;
