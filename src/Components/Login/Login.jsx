import styles from "./Styles/Login.module.css";
import { Box, Grid } from "@mui/material";

import Painel from "./Painel";

import Logo from "./Images/LogoSociaMentes1.png";
import Jigsaw from "./Images/jigsaw.png";

function Login() {
  return (
    <div className={styles.viewport}>
      <Grid container>
        {/* metade esquerda da página */}
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
        <Grid item xs={12} md={6} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Box
            height="95vh"
            margin="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            
            sx={{
              width: '100%',
              maxWidth: '50vw',
              backgroundImage: `url(${Jigsaw})`,
              backgroundSize: '90% 100%',
              backgroundRepeat: 'no-repeat',
              borderRadius: '10px',
              margin: "15px"
            }}
          >
            <img src={Logo} alt="Logo" style={{ maxWidth: "100%"}} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
