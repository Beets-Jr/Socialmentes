import React, { useState } from "react";
import styles from "../Styles/Login.module.css"
import { Grid } from "@mui/material";

import RightSide from "../Sides/RightSide";
import LeftSideResetPassword from "../Sides/LeftSideResetPassword";

function PasswordResetPainel() {
  return (
    <div className={styles.viewport}>
      <Grid container>
        <LeftSideResetPassword />
        <RightSide />
      </Grid>
    </div>
  );
}

export default PasswordResetPainel;
