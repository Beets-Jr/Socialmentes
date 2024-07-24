import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import Botao from "./Botao";
import styles from "./GridCriarTeste.module.css";
import iconAddToList from "../../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../../Assets/Icons/check-icon.png";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { getCategoriaNomesPorNivel, getPerguntasPorNivelECategoria } from "../../../../Database/Utils/functions";

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
];

const perguntasNivel1CategoriaComunicação = getPerguntasPorNivelECategoria(1, 'comunicação receptiva');
console.log('Perguntas da categoria "comunicação receptiva" do nível 1:', perguntasNivel1CategoriaComunicação);

export default function GridCriarTeste() {
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([getCategoriaNomesPorNivel(1)]);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        const realNivel = index + 1;
        setCategorias(getCategoriaNomesPorNivel(realNivel));
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box className={styles.container} sx={{ position: "sticky" }}>
            <Box sx={{
                display: { xs: "block", md: "flex" },
                gap: "25px", paddingBottom: "10vh"
            }}>
                {/* Parte das Competências */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "3vh",
                    order: { xs: 1, md: 2 },
                    marginBottom: { xs: "3vh", md: 0 }
                }}>
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
                            {activeButtonIndex !== null &&
                                categorias.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Parte dos Níveis */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "3vh",
                    order: { xs: 2, md: 1 }
                }}>
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
            </Box>

            {/* Botoes fixos na parte inferior */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    width: { xs: "80%", md: "100%" },
                    zIndex: 10,
                    display: "flex",
                    backgroundColor: "white",
                    padding: "0.5em",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Botao icon={iconAddToList} text="Adicionar Questão" />
                </Box>
                <Box sx={{
                    flex: { xs: 1, md: 0.8 }
                }}>
                    <Botao icon={iconEncerrar} text="Encerrar" bgcolor="bg-blue" />
                </Box>
            </Box>
        </Box>
    );
}
