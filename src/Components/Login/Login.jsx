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
              width: "100%",
              maxWidth: "50vw",
            }}
          >
            <Painel />
          </Box>
        </Grid>
        {/* metade direita da página*/}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
              width: "100%",
              maxWidth: "50vw",
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
