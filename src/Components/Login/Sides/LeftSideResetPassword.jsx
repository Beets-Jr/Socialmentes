import { Box, Grid } from "@mui/material";
import PasswordReset from "../Reset Password/PasswordReset";

function LeftSideResetPassword() {
  return (
    <Grid item xs={12} md={6}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          width: "100%",
          maxWidth: "50vw",
          position: "relative",
        }}
      >
        <PasswordReset />
      </Box>
    </Grid>
  );
}

export default LeftSideResetPassword;
