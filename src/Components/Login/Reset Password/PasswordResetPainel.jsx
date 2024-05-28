import React, { useState } from "react";
import { Grid } from "@mui/material";

import RightSide from "../Sides/RightSide";
import LeftSideResetPassword from "../Sides/LeftSideResetPassword";

function PasswordResetPainel() {
  return (
      <Grid container>
        <LeftSideResetPassword />
        <RightSide />
      </Grid>
  );
}

export default PasswordResetPainel;
