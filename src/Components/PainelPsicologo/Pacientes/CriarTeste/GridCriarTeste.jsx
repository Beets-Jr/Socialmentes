import React, { useState, useEffect } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import Botao from "./Botao";
import styles from "./GridCriarTeste.module.css";
import iconAddToList from "../../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../../Assets/Icons/check-icon.png";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { getCategoriaNomesPorNivel, getPerguntasPorNivelECategoria } from "../../../../Database/Utils/functions";
import Questao from "./Questao";

export default function GridCriarTeste() {
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [nivel, setNivel] = useState(0);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (nivel > 0) {
            setCategorias(getCategoriaNomesPorNivel(nivel));
        }
    }, [nivel]);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        setNivel(index + 1);
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box className={styles.container} sx={{ position: "sticky" }}>
            <Box sx={{ display: "flex", paddingBottom: "10vh" }}>
                {/* Parte dos Níveis */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: "25%" }}>
                    <p className={styles.titulo}>Nível</p>
                    <BlueLine />
                    <div className={styles.nivel}>
                        {[1, 2, 3, 4].map((level, index) => (
                            <button
                                key={index}
                                className={`${styles.button} ${activeButtonIndex === index ? styles.active : ""}`}
                                onClick={() => handleButtonClick(index)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Parte das Questões */}
                    <p className={styles.titulo}>Questões</p>
                    <BlueLine />
                    <Questao categorias={categorias} nivel={nivel} categoriaSelecionada={selectedOption} />
                </Box>

                {/* Parte das Competências */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", height: "20vh", marginLeft: "20vw" }}>
                    <p className={styles.titulo}>Competência</p>
                    <BlueLine />
                    <FormControl variant="outlined">
                        <Select
                            id="competencia-select"
                            value={selectedOption}
                            onChange={handleChange}
                            sx={{ width: "81%" }}
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
            </Box>

            {/* Botoes fixos na parte inferior */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    zIndex: 10,
                    display: "flex",
                    backgroundColor: "white",
                    padding: "0.5em",
                    alignItems: "center",
                    minWidth: "75%",
                    maxWidth: "90%",
                }}
            >
                <Box>
                    <Botao icon={iconAddToList} text="Adicionar Questão" />
                </Box>
                <Box sx={{ width: "52.5%" }}></Box>
                <Box sx={{ right: "1em" }}>
                    <Botao icon={iconEncerrar} text="Encerrar" bgcolor="bg-blue" />
                </Box>
            </Box>
        </Box>
    );
}
