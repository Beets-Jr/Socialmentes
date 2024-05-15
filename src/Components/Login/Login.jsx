import styles from "./Login.module.css";
import { Box, Grid } from "@mui/material";

import Painel from "./Painel";

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
            sx={{ width: "100%" }}
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
            sx={{ width: "100%" }} // Faz a altura ocupar toda a viewport
          >
            <h1>Imagens e logo</h1>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
