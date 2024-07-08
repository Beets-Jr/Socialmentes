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
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: "25%" }}>
            <p className={styles.titulo1}>Competência</p>
            <BlueLine />
            <FormControl variant="outlined">
                <Select
                    id="competencia-select"
                    value={selectedOption}
                    onChange={handleChange}
                    sx={{ width: "80%" }}
                >
                    {activeButtonIndex !== null &&
                        categorias.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
}
