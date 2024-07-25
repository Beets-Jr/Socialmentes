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
            flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: { md: "50%", xs: "100%" }
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
                >
                    {selectedOption === "" && (
                        <MenuItem disabled value="">
                            Selecione uma categoria para este nível
                        </MenuItem>
                    )}
                    {categorias.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
