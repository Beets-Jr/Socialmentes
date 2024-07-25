import React from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";

export default function CompetenciaSelector({
  activeButtonIndex,
  categorias,
  selectedOption,
  handleChange
}) {
  return (
    <Box sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "3vh",
      width: { md: "50%", xs: "100%" }
    }}>
      <p className={styles.titulo1}>Competência</p>
      <BlueLine />
      <FormControl variant="outlined" sx={{ width: "80%" }}>
        <Select
          id="competencia-select"
          value={selectedOption}
          onChange={(event) => { handleChange(event) }}
          displayEmpty
          renderValue={(value) => (value ? `${value}` : "Selecione uma competência")}
          sx={{
            borderRadius: '15px',
            border: '2px solid var(--Cinza-3)',
            boxShadow: '2px 2px 2.8px 0px rgba(0, 0, 0, 0.10)',
            color: 'var(--color-gray-4)',
            fontFamily: 'var(--font-sub)',
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: 'normal',
            '& .MuiSelect-icon': {
              color: 'var(--color-gray-4)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--Cinza-3)',
            }
          }}
        >
          {selectedOption === "" && (
            <MenuItem disabled value="">
              Selecione uma categoria para este nível
            </MenuItem>
          )}
          {categorias.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              sx={{
                color: 'var(--color-gray-4)',
                fontFamily: 'var(--font-sub)',
                fontSize: '24px',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
