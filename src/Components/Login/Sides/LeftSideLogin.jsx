import { Box, Grid } from "@mui/material";
import Painel from "../Painel";

function LeftSideLogin() {
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
            <Painel />
          </Box>
        </Grid>
    )
}

export default LeftSideLogin