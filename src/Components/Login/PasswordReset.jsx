import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { auth } from "../../Database/FirebaseConfig.mjs"; // Certifique-se de que o caminho está correto
import { sendPasswordResetEmail } from "firebase/auth";

import styles from "../Login/Styles/Login.module.css";
import theme from "./Theme/theme";

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
      setMessage(
        "Email de recuperação de senha enviado!"
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handlePasswordReset}>
        <div className={styles.subtitulo}>Recuperar Senha</div>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </ThemeProvider>
  );
}

export default PasswordReset;
