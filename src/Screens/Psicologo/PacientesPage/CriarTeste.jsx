import React, { useState } from "react";
import styles from "./Psicologo.module.css";
import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
import BlueLine from "../../../Assets/Icons/BlueLine";

const options = [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Adipiscing elit sed",
  "Do eiusmod tempor",
  "Incididunt ut labore",
];

export default function CriarTeste() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Grid
      container
      spacing={3}
      columnSpacing={10}
      sx={{ paddingLeft: "3.75em", paddingTop: "3em" }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
          }}
        >
          <p>Nível</p>
          <BlueLine />
          <div className={styles.nivel}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
          <p>Questões</p>
          <BlueLine />
          <p>Nenhuma checklist adicionada</p>
        </Box>
      </Grid>

      <Grid item xs={12} md={8} lg={6} sx={{ display: "flex", flexDirection: "column", gap: "3vh"}} >
        <p>Competência</p>
        <BlueLine />
        <FormControl variant="outlined" >
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
  );
}
