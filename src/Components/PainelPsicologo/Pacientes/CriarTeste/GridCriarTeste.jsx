import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./Styles.module.css";
import { getCategoriaNomesPorNivel } from "../../../../Database/Utils/functions";
import NivelSelector from "./NivelSelector";
import QuestoesList from "./QuestoesList";
import CompetenciaSelector from "./CompetenciaSelector";
import FixedButtons from "./FixedButtons";

export default function GridCriarTeste() {
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [nivel, setNivel] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
    const [mostrarQuestoes, setMostrarQuestoes] = useState(false);

    useEffect(() => {
        if (nivel > 0) {
            const categorias = getCategoriaNomesPorNivel(nivel);
            setCategorias(categorias);
        }
    }, [nivel]);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        setNivel(index + 1);
        setSelectedOption("");
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAdicionarQuestao = () => {
        if (selectedOption) {

            if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                {/** substituir pelo alerta devido */}
                alert("Essa categoria já foi selecionada para este nível.");
                return;
            }
    
            const updatedCategoriasSelecionadas = {
                ...categoriasSelecionadas,
                [nivel]: [...(categoriasSelecionadas[nivel] || []), selectedOption]
            };
            setCategoriasSelecionadas(updatedCategoriasSelecionadas);
            setMostrarQuestoes(true);
        }
    };
    

    return (
        <Box className={styles.container} sx={{ position: "sticky" }}>
            <Box>
                <Box sx={{ display: "flex", gap: "20vw" }} >
                    <NivelSelector
                    activeButtonIndex={activeButtonIndex}
                    handleButtonClick={handleButtonClick}
                    />
                    <CompetenciaSelector
                        activeButtonIndex={activeButtonIndex}
                        categorias={categorias}
                        selectedOption={selectedOption}
                        handleChange={handleChange}
                    />
                </Box>
                
                <Box sx={{ marginTop: "5vh" }} >
                    <QuestoesList
                    nivel={nivel}
                    categoriasSelecionadas={categoriasSelecionadas}
                    mostrarQuestoes={mostrarQuestoes}
                    />
                </Box>
                <FixedButtons handleAdicionarQuestao={handleAdicionarQuestao} />
            </Box>
            
        </Box>
    );
}
