import { Box, Grid } from "@mui/material";
import DesignRightSide from "./DesignRightSide";
import Jigsaw from "../../../Assets/jigsaw.png";
import Logo from "../../../Assets/LogoSocialMentes1.png";

function RightSide() {
    return (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 20px 20px 20px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Jigsaw})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "20px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              '@media (max-width: 900px)': {
                height: "100vh", // Height for screens below 800px
              },
            }}
          >
            <DesignRightSide />
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
    )
}

export default RightSide