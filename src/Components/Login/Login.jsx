/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./Styles/Login.module.css";
import { Box, Grid } from "@mui/material";

import RightSide from "./RightSide/RightSide";
import Painel from "./Painel";
import { Route, Routes } from "react-router-dom";

import PasswordReset from "./Reset Password/PasswordReset";

function Login() {
  return (
    <div className={styles.viewport}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
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
            <Routes>
              <Route path="/" element={<Painel />} />
              <Route path="/recuperar-senha" element={<PasswordReset />} />
            </Routes>
          </Box>
        </Grid>
        <RightSide />
      </Grid>
    </div>
  );
}

export default Login;
