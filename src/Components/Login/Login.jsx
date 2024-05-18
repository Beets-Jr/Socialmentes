import styles from "./Login.module.css";
import { Box, Grid } from "@mui/material";

import Painel from "./Painel";

import Logo from "./Icons/LogoSociaMentes1.png";
import Jigsaw from "./Icons/jigsaw.png";

function Login() {
  return (
    <div className={styles.backgroundColor}>
      <Grid container>
        {/* Metade esquerda da página */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ width: "50vw" }}
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
            sx={{ width: "50vw" }}
          >
            <img src={Logo} alt="Logo" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
