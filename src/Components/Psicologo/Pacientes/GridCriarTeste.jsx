import React, { useState } from "react";
import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
import BlueLine from "../../../Assets/Icons/BlueLine";
import Botao from "./Botao";
import styles from "./GridCriarTeste.module.css";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../Assets/Icons/check-icon.png";

import { competenciasNivel1, competenciasNivel2, competenciasNivel3, competenciasNivel4 } from "../Data/Competencias";

const questoes = [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Adipiscing elit sed",
  "Do eiusmod tempor",
  "Incididunt ut labore",
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Adipiscing elit sed",
  "Do eiusmod tempor",
  "Incididunt ut labore",
]

export default function GridCriarTeste() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    switch (index) {
      case 0:
        setCompetencias(competenciasNivel1);
        break;
      case 1:
        setCompetencias(competenciasNivel2);
        break;
      case 2:
        setCompetencias(competenciasNivel3);
        break;
      case 3:
        setCompetencias(competenciasNivel4);
        break;
      default:
        setCompetencias([]);
        break;
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box className={styles.container} sx={{ position: "sticky" }}>
      <Grid
        container
        spacing={3}
        columnSpacing={25}
        sx={{ paddingBottom: "10vh" }}
      >
        <Grid item xs={12} md={6}>
          {/* Parte dos Níveis */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
            <p className={styles.titulo}>Nível</p>
            <BlueLine />
            <div className={styles.nivel}>
              {[1, 2, 3, 4].map((level, index) => (
                <button
                  key={index}
                  className={`${styles.button} ${activeButtonIndex === index ? styles.active : ""
                    }`}
                  onClick={() => handleButtonClick(index)}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Parte das Questões */}
            <p className={styles.titulo}>Questões</p>
            <BlueLine />
            {questoes.length === 0 ? (
              <p className={styles.mensagem}>Nenhuma checklist adicionada</p>
            ) : (
              questoes.map((questao, index) => <p key={index}>{questao}</p>)
            )}
          </Box>
        </Grid>

        {/* Parte das Competências */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
            <p className={styles.titulo}>Competência</p>
            <BlueLine />
            <FormControl variant="outlined">
              <Select
                id="competencia-select"
                value={selectedOption}
                onChange={handleChange}
                sx={{ width: "80%" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {activeButtonIndex !== null && competencias.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      {/* Paper na parte inferior */}
      <Grid
        container
        spacing={3}
        columnSpacing={35}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 10,
          display: "flex",
          backgroundColor: "white",
          padding: "0.5em",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Botao icon={iconAddToList} text="Adicionar Questão" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Botao icon={iconEncerrar} text="Encerrar" bgcolor="bg-blue" />
        </Grid>
      </Grid>
    </Box>
  );
}
