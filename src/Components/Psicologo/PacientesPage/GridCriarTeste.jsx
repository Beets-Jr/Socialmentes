import React, { useState } from "react";
import { Box, FormControl, Grid, MenuItem, Select, Paper } from "@mui/material";
import BlueLine from "../../../Assets/Icons/BlueLine";
import Botao from "./Botao";
import styles from "./GridCriarTeste.module.css";
import iconAddToList from "../../../Assets/Icons/add-list-icon.jpg";

const options = [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Adipiscing elit sed",
  "Do eiusmod tempor",
  "Incididunt ut labore",
];

export default function GridCriarTeste() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={3} columnSpacing={10} sx={{ paddingBottom: "10vh" }}>
        <Grid item xs={12} md={8} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3vh",
            }}
          >
            <p className={styles.titulo}>Nível</p>
            <BlueLine />
            <div className={styles.nivel}>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
            <p className={styles.titulo}>Questões</p>
            <BlueLine />
            <p className={styles.mensagem}>Nenhuma checklist adicionada</p>
          </Box>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>

          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>

          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>

          <p>teste</p>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}
        >
          <p className={styles.titulo}>Competência</p>
          <BlueLine />
          <FormControl variant="outlined">
            <Select
              id="demo-simple-select-outlined"
              value={selectedOption}
              onChange={handleChange}
              sx={{ width: "25vw" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "90%",
          zIndex: 10,
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Botao icon={iconAddToList} text="Adicionar Questão" />
        <Botao icon={iconAddToList} text="Encerrar" />
      </Paper>
    </div>
  );
}
