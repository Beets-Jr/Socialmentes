import { Box, Grid } from "@mui/material";
import styles from "./GridTestes.module.css";
import React from "react";
import BlueLine from "../../../../Assets/Icons/BlueLine";

export default function GridTestes() {
  return (
    <div>
      <Box className={styles.containerTestes} sx={{ flexGrow: "1" }}>
        <p className={styles.titulo}>Testes</p>
        <BlueLine />
        <Grid
          container
          rowGap={2}
          columnGap={3}
          className={styles.gridContainer}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3.75}
            sx={{ display: "flex" }}
            className={styles.gridItem}
          >
            <div className={styles.cardHalf}>
              <span>0045</span>
            </div>

            <div className={styles.cardHalf}>
              <p>05/09/2024</p>
              <p>Denver</p>
              <p noWrap className={styles.statusTeste}>
                Não finalizado
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3.75}
            sx={{ display: "flex" }}
            className={styles.gridItem}
          >
            <div className={styles.cardHalf}>
              <span>0026</span>
            </div>

            <div className={styles.cardHalf}>
              <p>05/09/2024</p>
              <p>Denver</p>
              <p noWrap className={styles.statusTeste}>
                Não finalizado
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3.75}
            sx={{ display: "flex" }}
            className={styles.gridItem}
          >
            <div className={styles.cardHalf}>
              <span>0010</span>
            </div>

            <div className={styles.cardHalf}>
              <p>05/09/2024</p>
              <p>Denver</p>
              <p noWrap className={styles.statusTeste}>
                Não finalizado
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3.75}
            sx={{ display: "flex" }}
            className={styles.gridItem}
          >
            <div className={styles.cardHalf}>
              <span>0002</span>
            </div>

            <div className={styles.cardHalf}>
              <p>05/09/2024</p>
              <p>Denver</p>
              <p noWrap className={styles.statusTeste}>
                Não finalizado
              </p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
