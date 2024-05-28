/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./Styles/Login.module.css";
import { Grid } from "@mui/material";

import DesignRightSide from "./Sides/DesignRightSide";
import RightSide from "./Sides/RightSide";
import LeftSideLogin from "./Sides/LeftSideLogin";

function Login() {
  return (
    <div className={styles.viewport}>
      <Grid container>
        <LeftSideLogin />
        <RightSide />
      </Grid>
    </div>
  );
}

export default Login;
