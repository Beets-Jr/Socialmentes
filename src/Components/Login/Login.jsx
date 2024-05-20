import styles from "./Styles/Login.module.css";
import { Box, Grid } from "@mui/material";

import Painel from "./Painel";

import Logo from "./Images/LogoSociaMentes1.png";
import Jigsaw from "./Images/jigsaw.png";

function Login() {
  return (
    <div className={styles.viewport}>
      <Grid container>
        {/* Metade esquerda da página */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
              width: "100%", // Alterado para 100% em telas pequenas
              maxWidth: "50vw", // Limita a largura em telas grandes
            }}
          >
            <Painel />
          </Box>
        </Grid>
        {/* Metade direita da página */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
              width: "100%", // Alterado para 100% em telas pequenas
              maxWidth: "50vw", // Limita a largura em telas grandes
            }}
          >
            <img src={Logo} alt="Logo" style={{ maxWidth: "100%" }} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
